#!/bin/bash

# Navigate to the project directory
cd ~/WWW/Alanalarana.com

# Discard all local uncommitted changes
git clean -fd

# Pull the latest changes and store the output in a variable
output=$(git pull origin main)

# Check if there are new changes
if [[ $output == *"Already up to date."* ]]; then
        echo "No new changes. Skipping deployment."
        exit 0
fi

# If package.json changed since the last pull, update dependencies
if git diff --name-only HEAD@{1} HEAD | grep "package.json" > /dev/null 2>&1; then
        echo "Removing node_modules..."
        rm -rf node_modules

        echo "Changes detected in package.json, updating dependencies..."
        echo "y" | pnpm install

        echo "Removing the .next folder due to package.json changes..."
        rm -rf .next
fi

# Build the project (necessary for projects like Next.js)
echo "Building the project..."
if ! pnpm run build; then
    echo "Build failed. Aborting deployment."
    exit 1  # Exit with error to prevent app restart
fi

# Restart the application (using PM2, Docker, etc.)
echo "Restarting the application..."
pm2 restart Alanalarana.com
