import re

file_path = 'src/styles/index.css'

with open(file_path, 'r') as f:
    content = f.read()

replacements = {
    '--bg-primary: #050a14;': '--bg-primary: #0a0705;',
    '--bg-secondary: #080f1f;': '--bg-secondary: #0f0a05;',
    '--bg-tertiary: #0c1628;': '--bg-tertiary: #171005;',
    '--bg-card: rgba(8, 20, 45, 0.7);': '--bg-card: rgba(20, 10, 5, 0.7);',
    '--bg-card-hover: rgba(10, 25, 55, 0.85);': '--bg-card-hover: rgba(30, 15, 5, 0.85);',

    '--accent-blue: #2563eb;': '--accent-blue: #ea580c; /* Orange */',
    '--accent-blue-light: #3b82f6;': '--accent-blue-light: #f97316; /* Neon Orange */',
    '--accent-blue-glow: rgba(59, 130, 246, 0.35);': '--accent-blue-glow: rgba(249, 115, 22, 0.35);',
    
    '--accent-violet: #7c3aed;': '--accent-violet: #16a34a; /* Green */',
    '--accent-violet-light: #8b5cf6;': '--accent-violet-light: #4ade80; /* Neon Green */',
    '--accent-violet-glow: rgba(139, 92, 246, 0.3);': '--accent-violet-glow: rgba(74, 222, 128, 0.3);',
    
    '--accent-cyan: #06b6d4;': '--accent-cyan: #ff7300; /* Vibrant Orange */',
    '--accent-cyan-light: #22d3ee;': '--accent-cyan-light: #ffa500; /* Yellow Orange */',
    '--accent-cyan-glow: rgba(34, 211, 238, 0.25);': '--accent-cyan-glow: rgba(255, 115, 0, 0.25);',

    '--text-accent: #60a5fa;': '--text-accent: #fb923c;',
    '--text-violet: #a78bfa;': '--text-violet: #4ade80;',
    '--text-cyan: #22d3ee;': '--text-cyan: #ffa500;',

    '--border-subtle: rgba(59, 130, 246, 0.12);': '--border-subtle: rgba(249, 115, 22, 0.12);',
    '--border-glow: rgba(59, 130, 246, 0.35);': '--border-glow: rgba(249, 115, 22, 0.35);',
    '--border-violet: rgba(139, 92, 246, 0.3);': '--border-violet: rgba(74, 222, 128, 0.3);',

    '--glass-bg: rgba(8, 20, 45, 0.65);': '--glass-bg: rgba(25, 10, 5, 0.65);',
    '--glass-border: rgba(59, 130, 246, 0.18);': '--glass-border: rgba(249, 115, 22, 0.18);',

    '--shadow-glow-blue: 0 0 20px rgba(59, 130, 246, 0.25);': '--shadow-glow-blue: 0 0 20px rgba(249, 115, 22, 0.25);',
    '--shadow-glow-violet: 0 0 20px rgba(139, 92, 246, 0.25);': '--shadow-glow-violet: 0 0 20px rgba(74, 222, 128, 0.25);',
}

for old, new in replacements.items():
    content = content.replace(old, new)

# Also let's find any hardcoded rgba in animations in index.css
content = content.replace('rgba(59, 130, 246, 0.5)', 'rgba(249, 115, 22, 0.5)')
content = content.replace('rgba(139, 92, 246, 0.5)', 'rgba(74, 222, 128, 0.5)')
content = content.replace('rgba(34, 211, 238, 0.5)', 'rgba(255, 115, 0, 0.5)')
content = content.replace('rgba(59, 130, 246, 0.2)', 'rgba(249, 115, 22, 0.2)')
content = content.replace('rgba(59, 130, 246, 0.3)', 'rgba(249, 115, 22, 0.3)')

with open(file_path, 'w') as f:
    f.write(content)

print("Theme updated successfully.")
