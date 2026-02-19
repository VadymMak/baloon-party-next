#!/usr/bin/env python3
"""Fix ALL SVG icon files — make them consistent.
Run from project root: python3 fix-icons-v2.py
"""

import re
import os
import glob

DIR = "src/assets/svg"

print("🔧 Fixing ALL SVG icon files...\n")

for filepath in sorted(glob.glob(os.path.join(DIR, "*.tsx"))):
    filename = os.path.basename(filepath)
    name_no_ext = filename.replace(".tsx", "")

    with open(filepath, "r") as f:
        content = f.read()

    original = content
    changes = []

    # 1. Remove ALL "{...props}" from JSX
    if "{...props}" in content:
        content = content.replace(" {...props}", "")
        content = content.replace("{...props}", "")
        changes.append("removed {...props}")

    # 2. Remove ", props" from function arguments (single-line)
    content = re.sub(r',\s*props\)', ')', content)
    if content != original:
        changes.append("removed props arg")

    # 3. Remove standalone "props," line (multi-line signature)
    content = re.sub(r'\n\s*props,?\s*\n', '\n', content)

    # 4. Fix hardcoded width/height in <svg> tag — use {width} {height} from props
    # Pattern: width={770} height={695} → width={width} height={height}
    content = re.sub(r'width=\{(\d+)\}', 'width={width}', content)
    content = re.sub(r'height=\{(\d+)\}', 'height={height}', content)
    if content != original and "width={width}" in content:
        changes.append("using width/height from props")

    # 5. Fix WhatsApp.tsx export
    if filename == "WhatsApp.tsx":
        if "export { SvgComponent as InstagramIcon }" in content:
            content = content.replace(
                "export { SvgComponent as InstagramIcon };",
                "export default SvgComponent;"
            )
            changes.append("fixed export → default")
        elif "export default" not in content:
            content = content.rstrip() + "\nexport default SvgComponent;\n"
            changes.append("added default export")

    # 6. Fix FacebookIcon.tsx export name
    if filename == "FacebookIcon.tsx":
        if "export { SvgComponent as InstagramIcon }" in content:
            content = content.replace(
                "export { SvgComponent as InstagramIcon };",
                "export { SvgComponent as FacebookIcon };"
            )
            changes.append("fixed export name → FacebookIcon")

    # Write
    if content != original:
        with open(filepath, "w") as f:
            f.write(content)
        print(f"✅ {filename} — {', '.join(changes)}")
    else:
        print(f"⏭️  {filename} — ok")

# Verification
print("\n--- Verification ---")
for filepath in sorted(glob.glob(os.path.join(DIR, "*.tsx"))):
    filename = os.path.basename(filepath)
    with open(filepath, "r") as f:
        content = f.read()

    issues = []
    if "props" in content and "IconProps" not in content.split("props")[0][-20:]:
        # Check if "props" appears outside of "IconProps"
        lines_with_props = [
            (i+1, line.strip())
            for i, line in enumerate(content.split("\n"))
            if "props" in line and "IconProps" not in line
        ]
        if lines_with_props:
            issues.append(
                f"'props' found on lines: {[l[0] for l in lines_with_props]}")

    if "as InstagramIcon" in content and filename != "InstagramIcon.tsx":
        issues.append("wrong export name 'InstagramIcon'")

    if "export default" not in content:
        issues.append("NO default export!")

    if issues:
        print(f"⚠️  {filename}: {', '.join(issues)}")
    else:
        print(f"✅ {filename}: clean")

print("\n🎉 Done! Run: pnpm dev")
