import re

file_path = 'src/styles/simulator.css'

with open(file_path, 'r') as f:
    content = f.read()

content = content.replace('34, 211, 238', '255, 115, 0')
content = content.replace('59, 130, 246', '249, 115, 22')
content = content.replace('139, 92, 246', '74, 222, 128')

# There might also be bg colors hardcoded:
content = content.replace('rgba(15, 23, 42, 0.6)', 'rgba(25, 15, 5, 0.6)')

with open(file_path, 'w') as f:
    f.write(content)

print("Simulator theme updated.")
