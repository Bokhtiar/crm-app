#!/usr/bin/env python3
# This script will install the complete CRM application code

with open('src/CRM_Full_Code.txt', 'w', encoding='utf-8') as f:
    f.write("""
Please paste your complete CRM code here.

To complete the installation:
1. Open src/CRM_Full_Code.txt
2. Paste your complete React component code
3. Run: python3 finalize_install.py

This will copy the code to src/App.jsx
""")

print("Setup file created. Please paste your CRM code into src/CRM_Full_Code.txt")
print("Then the code will be moved to App.jsx")
