import os
import re
import uuid

project_path = 'ios/Footlbal.xcodeproj/project.pbxproj'
file_name = 'GoogleService-Info.plist'
file_path = 'Footlbal/GoogleService-Info.plist'

if not os.path.exists(project_path):
    print(f"Project file not found at {project_path}")
    exit(1)

with open(project_path, 'r') as f:
    content = f.read()

if file_name in content:
    print(f"{file_name} already exists in project.")
    exit(0)

# Generate unique IDs
file_ref_id = uuid.uuid4().hex[:24].upper()
build_file_id = uuid.uuid4().hex[:24].upper()

# 1. Add to PBXFileReference section
file_ref_entry = f'\t\t{file_ref_id} /* {file_name} */ = {{isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = text.plist.xml; name = "{file_name}"; path = "{file_path}"; sourceTree = "<group>"; }};'
content = re.sub(r'(/\* End PBXFileReference section \*/)', f'{file_ref_entry}\n\\1', content)

# 2. Add to PBXBuildFile section
build_file_entry = f'\t\t{build_file_id} /* {file_name} in Resources */ = {{isa = PBXBuildFile; fileRef = {file_ref_id} /* {file_name} */; }};'
content = re.sub(r'(/\* End PBXBuildFile section \*/)', f'{build_file_entry}\n\\1', content)

# 3. Add to Main Group (children)
# Find the group that contains AppDelegate.swift
group_match = re.search(r'children = \(\s+([0-9A-F]+ /\* AppDelegate\.swift \*/,?\s+)+', content)
if group_match:
    child_entry = f'\t\t\t\t{file_ref_id} /* {file_name} */,'
    content = content.replace(group_match.group(0), group_match.group(0) + f'\n{child_entry}')

# 4. Add to PBXResourcesBuildPhase
resources_match = re.search(r'/\* Begin PBXResourcesBuildPhase section \*/.*?files = \(\s+', content, re.DOTALL)
if resources_match:
    resource_entry = f'\t\t\t\t{build_file_id} /* {file_name} in Resources */,'
    content = content.replace(resources_match.group(0), resources_match.group(0) + f'\n{resource_entry}')

with open(project_path, 'w') as f:
    f.write(content)

print(f"Successfully added {file_name} to project.")
