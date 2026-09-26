import os
import glob

directory = 'src/styles'
css_files = glob.glob(os.path.join(directory, '*.css'))

replacements = {
    'rgba(59, 130, 246': 'rgba(249, 115, 22',
    'rgba(139, 92, 246': 'rgba(74, 222, 128',
    'rgba(34, 211, 238': 'rgba(255, 115, 0',
    'rgba(37, 99, 235': 'rgba(234, 88, 12',
    'rgba(5, 10, 20': 'rgba(10, 5, 5',
    'rgba(8, 20, 45': 'rgba(20, 10, 5',
    'rgba(10, 25, 55': 'rgba(30, 15, 5',
}

for filepath in css_files:
    with open(filepath, 'r') as file:
        content = file.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as file:
        file.write(content)

print("Mass replacement complete!")
