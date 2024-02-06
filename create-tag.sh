#!/bin/bash

# Fetch tags from origin to ensure we have the latest state
git fetch --tags

# Get the latest tag based on the semantic versioning
latest_tag=$(git describe --tags $(git rev-list --tags --max-count=1))

# Split the tag into major, minor, and patch numbers
IFS='.' read -r major minor patch <<< "${latest_tag}"

# Increment the patch version
new_patch=$((patch + 1))

# Form the new tag
new_tag="${major}.${minor}.${new_patch}"

# Create a new tag
git tag $new_tag

# Push the new tag to the origin
git push origin $new_tag

echo "New tag $new_tag created and pushed to origin."
