import os
import glob

files = glob.glob('src/components/*.jsx')

replacements = {
    'rgba(34, 211, 238, 0.1)': 'rgba(255, 115, 0, 0.1)',
    'rgba(59, 130, 246, 0.1)': 'rgba(249, 115, 22, 0.1)',
    'rgba(34, 211, 238, 0.4)': 'rgba(255, 115, 0, 0.4)'
}

for filepath in files:
    with open(filepath, 'r') as file:
        content = file.read()
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    with open(filepath, 'w') as file:
        file.write(content)

print("React replacement complete!")
