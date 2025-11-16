# Component Syncing Guide

This document explains how to keep Storybook components in sync with the main `tournament-stats-app` repository.

## Overview

The Storybook repository is a **mirror** of the component library from the main app. Components are manually copied when updates are made to the main repository.

## When to Sync

Sync components in these scenarios:

1. **New component created** - Add new component and its story
2. **Component modified** - Update component logic or props
3. **Styling changes** - Update Tailwind classes or CSS
4. **Story updates** - Add new examples or documentation
5. **Dependency updates** - When component dependencies change

## Manual Sync Process

### Step 1: Copy Files from Main Repo

```bash
# Set paths (adjust as needed)
MAIN_REPO="/path/to/tournament-stats-app"
STORYBOOK_REPO="/path/to/tournament-stats-storybook"

# Copy components
cp -r "$MAIN_REPO/static/js/components/"* "$STORYBOOK_REPO/static/js/components/"
cp -r "$MAIN_REPO/static/js/pages/"* "$STORYBOOK_REPO/static/js/pages/"
cp -r "$MAIN_REPO/static/js/lib/"* "$STORYBOOK_REPO/static/js/lib/"

# Copy styles
cp "$MAIN_REPO/static/css/src/styles.css" "$STORYBOOK_REPO/static/css/src/"

# Copy config files (if changed)
cp "$MAIN_REPO/tailwind.config.js" "$STORYBOOK_REPO/"
cp "$MAIN_REPO/postcss.config.js" "$STORYBOOK_REPO/"
```

### Step 2: Test Locally

```bash
cd "$STORYBOOK_REPO"

# Install dependencies (if package.json changed)
npm install

# Run Storybook locally
npm run storybook

# Open http://localhost:6006
# Verify all stories load and render correctly
```

### Step 3: Commit and Push

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "sync: Update components from main repo

- Updated: ComponentName (describe changes)
- Added: NewComponent with story
- Fixed: Bug in ExistingComponent"

# Push to GitHub
git push origin main
```

### Step 4: Verify Deployment

- Vercel will automatically deploy on push
- Check Vercel dashboard for build status
- Visit deployed Storybook URL to verify changes

## Automated Sync (Future Enhancement)

### Option 1: GitHub Actions Webhook

Create a workflow in the main repo that triggers a sync:

```yaml
# In tournament-stats-app/.github/workflows/sync-storybook.yml
name: Sync Storybook

on:
  push:
    branches: [main]
    paths:
      - 'static/js/components/**'
      - 'static/js/pages/**'
      - 'static/css/src/styles.css'

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Storybook sync
        # Use repository_dispatch or workflow_call
```

### Option 2: Git Submodules

Convert components to a git submodule shared between both repos.

**Pros:** Auto-sync via git
**Cons:** Complex to maintain

### Option 3: npm Package

Publish components as an npm package, install in both repos.

**Pros:** Versioned, proper dependency management
**Cons:** Overhead for small project

## Syncing Strategy

### Recommended: Manual Sync After Merges

- Sync after merging PRs to `main` in the main repo
- Include Storybook sync in PR checklist if components changed
- Sync weekly if active development

### Quick Sync Checklist

- [ ] Copy components, pages, lib directories
- [ ] Copy styles.css
- [ ] Test locally (`npm run storybook`)
- [ ] Commit with descriptive message
- [ ] Push to trigger Vercel deployment
- [ ] Verify deployed Storybook

## Troubleshooting

### Components Not Rendering

1. Check console for import errors
2. Verify all dependencies in package.json
3. Ensure Tailwind config matches main repo
4. Check Vite alias paths in .storybook/main.js

### Styles Not Applied

1. Verify styles.css was copied
2. Check Tailwind content paths in tailwind.config.js
3. Rebuild Storybook: `npm run build-storybook`

### Build Fails on Vercel

1. Check Vercel build logs
2. Ensure package.json has all required dependencies
3. Test build locally: `npm run vercel-build`
4. Verify Node version matches (check .nvmrc if exists)

## Best Practices

1. **Sync frequently** - Don't let components drift too far
2. **Test before pushing** - Always test locally first
3. **Document changes** - Use descriptive commit messages
4. **Keep dependencies aligned** - Match versions with main repo
5. **Review stories** - Ensure examples are still relevant

## Questions?

If you encounter issues syncing components, check:
- [Main Repository](https://github.com/ericwyman/tournament-stats-app)
- [Storybook Issues](https://github.com/ericwyman/tournament-stats-storybook/issues)
