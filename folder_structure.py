#!/usr/bin/env python3
import os
import sys
import shutil
from datetime import datetime

def get_tree_structure(start_path, prefix="", is_last=True, exclude_dirs=None, base_path=None):
    """
    Рекурсивно генерирует древовидную структуру папок и файлов
    с полными путями
    """
    if not os.path.exists(start_path):
        return ""
    
    if base_path is None:
        base_path = start_path
    
    if exclude_dirs is None:
        exclude_dirs = []
    
    # Получаем относительный путь от базовой директории
    rel_path = os.path.relpath(start_path, base_path)
    if rel_path == ".":
        name = os.path.basename(start_path) if os.path.basename(start_path) else start_path
    else:
        name = rel_path.replace(os.sep, '/')  # Используем / для консистентности
    
    # Пропускаем папку FolderStructure и другие исключенные папки
    if os.path.basename(start_path) in exclude_dirs:
        return ""
    
    result = ""
    
    if prefix == "":
        # Корневая папка
        result += f"{name}\n"
    else:
        branch = "└── " if is_last else "├── "
        result += f"{prefix}{branch}{name}\n"
    
    if os.path.isdir(start_path):
        items = []
        for item in os.listdir(start_path):
            item_path = os.path.join(start_path, item)
            if item not in exclude_dirs:  # Пропускаем исключенные папки
                items.append((item, item_path))
        
        # Сортируем: сначала папки, потом файлы
        items.sort(key=lambda x: (not os.path.isdir(x[1]), x[0].lower()))
        
        for i, (item_name, item_path) in enumerate(items):
            is_last_item = (i == len(items) - 1)
            extension = "    " if is_last else "│   "
            result += get_tree_structure(
                item_path, 
                prefix + extension, 
                is_last_item,
                exclude_dirs,
                base_path
            )
    
    return result

def get_file_contents(start_path, extensions=None, exclude_dirs=None, base_path=None):
    """
    Собирает содержимое всех файлов с указанными расширениями
    с полными путями
    """
    if base_path is None:
        base_path = start_path
    
    if exclude_dirs is None:
        exclude_dirs = []
    
    if extensions is None:
        extensions = ['.ts', '.tsx', '.js', '.jsx', '.json', 
                     '.scss', '.css', '.txt', '.md', '.yml', 
                     '.yaml', '.xml', '.html', '.htm', '.py', 
                     '.java', '.cpp', '.c', '.h', '.cs', '.go',
                     '.rb', '.php', '.swift', '.kt', '.rs', 
                     '.sh', '.bash', '.zsh', '.ps1', '.bat',
                     '.ini', '.cfg', '.conf', '.toml']
    
    results = []
    
    for root, dirs, files in os.walk(start_path):
        # Пропускаем скрытые папки (начинающиеся с .) и исключенные папки
        dirs[:] = [d for d in dirs if not d.startswith('.') and d not in exclude_dirs]
        
        # Сортируем для консистентного вывода
        files.sort(key=lambda x: x.lower())
        
        for file in files:
            file_path = os.path.join(root, file)
            
            # Проверяем расширение
            if any(file.endswith(ext) for ext in extensions):
                # Получаем полный абсолютный путь
                abs_path = os.path.abspath(file_path)
                # И относительный путь от базовой директории
                rel_path = os.path.relpath(file_path, os.path.dirname(base_path))
                rel_path = rel_path.replace(os.sep, '/')  # Используем / для консистентности
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except UnicodeDecodeError:
                    try:
                        with open(file_path, 'r', encoding='latin-1') as f:
                            content = f.read()
                    except:
                        content = "[Binary file or unsupported encoding]"
                except Exception as e:
                    content = f"[Error reading file: {str(e)}]"
                
                results.append({
                    'abs_path': abs_path,  # Абсолютный путь
                    'rel_path': rel_path,   # Относительный путь
                    'content': content
                })
    
    # Сортируем по пути для консистентности
    results.sort(key=lambda x: x['rel_path'].lower())
    
    return results

def main():
    # Проверяем аргументы командной строки
    if len(sys.argv) > 1:
        target_folder = sys.argv[1]
    else:
        # Если аргумент не передан, используем текущую папку
        target_folder = input("Введите путь к папке (или оставьте пустым для текущей): ").strip()
        if not target_folder:
            target_folder = "."
    
    target_folder = os.path.abspath(target_folder)
    
    if not os.path.exists(target_folder):
        print(f"Ошибка: Папка '{target_folder}' не найдена!")
        return
    
    # Создаем папку FolderStructure, если её нет
    folder_structure_dir = "FolderStructure"
    if not os.path.exists(folder_structure_dir):
        os.makedirs(folder_structure_dir)
        print(f"Создана папка: {folder_structure_dir}")
    
    # Получаем имя целевой папки для названия файла
    folder_name = os.path.basename(target_folder)
    if not folder_name:  # Если корневой диск или пустое имя
        folder_name = "root"
    
    # Формируем имя выходного файла
    output_filename = f"FolderStructure-{folder_name}.txt"
    output_path = os.path.join(folder_structure_dir, output_filename)
    
    print(f"Сканируем папку: {target_folder}")
    print(f"Результат будет сохранен в: {output_path}")
    
    # Исключаем папку FolderStructure из сканирования
    exclude_dirs = ['FolderStructure']
    
    # Получаем структуру папок с полными путями
    print("Генерируем древовидную структуру...")
    tree_structure = get_tree_structure(target_folder, exclude_dirs=exclude_dirs, base_path=target_folder)
    
    # Получаем содержимое файлов с полными путями
    print("Читаем содержимое файлов...")
    file_contents = get_file_contents(target_folder, exclude_dirs=exclude_dirs, base_path=target_folder)
    
    # Записываем всё в файл
    with open(output_path, 'w', encoding='utf-8') as f:
        # Записываем заголовок с информацией о папке
        f.write(f"АНАЛИЗ ПАПКИ: {target_folder}\n")
        f.write(f"Python версия: {sys.version_info[0]}.{sys.version_info[1]}.{sys.version_info[2]}\n")
        f.write("=" * 80 + "\n\n")
        
        # Записываем структуру
        f.write("СТРУКТУРА ПАПОК (полные пути):\n")
        f.write("-" * 80 + "\n\n")
        f.write(tree_structure)
        
        # Записываем содержимое файлов
        if file_contents:
            f.write("\n\n" + "=" * 80 + "\n")
            f.write("СОДЕРЖИМОЕ ФАЙЛОВ:\n")
            f.write("=" * 80 + "\n\n")
            
            for i, item in enumerate(file_contents):
                # Выводим абсолютный путь
                f.write(f"АБСОЛЮТНЫЙ ПУТЬ: {item['abs_path']}\n")
                # Выводим относительный путь (как в вашем примере)
                f.write(f"название файла: {item['rel_path']}\n\n")
                
                # Записываем содержимое файла
                f.write("СОДЕРЖИМОЕ ФАЙЛА:\n")
                f.write("-" * 40 + "\n")
                f.write(item['content'])
                
                if i < len(file_contents) - 1:
                    f.write("\n\n" + "_" * 80 + "\n\n")
                else:
                    f.write("\n\n" + "=" * 80 + "\n")
        
        # Добавляем статистику в конец
        f.write(f"\nСТАТИСТИКА:\n")
        f.write(f"-" * 40 + "\n")
        f.write(f"Обработано файлов: {len(file_contents)}\n")
        f.write(f"Общий размер папки: {get_folder_size(target_folder):,.0f} байт\n")
        f.write(f"Дата создания отчета: {get_current_time()}\n")
    
    print(f"\nОтчет успешно сохранен в файл: {output_path}")
    
    # Показываем список всех файлов в папке FolderStructure
    if os.path.exists(folder_structure_dir):
        folder_structure_files = [f for f in os.listdir(folder_structure_dir) if f.endswith('.txt')]
        if folder_structure_files:
            print(f"\nФайлы в папке '{folder_structure_dir}':")
            for file in sorted(folder_structure_files):
                file_path = os.path.join(folder_structure_dir, file)
                size = os.path.getsize(file_path)
                print(f"  - {file} ({size:,} байт)")

def get_folder_size(folder_path):
    """Вычисляет общий размер папки в байтах"""
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(folder_path):
        for filename in filenames:
            filepath = os.path.join(dirpath, filename)
            if os.path.isfile(filepath):
                total_size += os.path.getsize(filepath)
    return total_size

def get_current_time():
    """Возвращает текущее время в формате строки"""
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

if __name__ == "__main__":
    main()