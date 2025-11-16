# Tournament Stats Storybook

Component library and documentation for the [Tournament Stats App](https://github.com/ericwyman/tournament-stats-app).

## Overview

This repository hosts the Storybook component documentation separately from the main application. The main app is deployed on AWS, while Storybook remains on Vercel's free tier.

**Live Storybook:** https://storybook-databot-ui.vercel.app

## Local Development

```bash
# Install dependencies
npm install

# Run Storybook locally
npm run storybook
# Opens at http://localhost:6006

# Build Storybook
npm run build-storybook
```

## Component Syncing

Components in this repository are copied from the main [tournament-stats-app](https://github.com/ericwyman/tournament-stats-app) repository.

### When to Sync

Sync components when:
- New components are added to the main app
- Existing components are modified
- Component props or interfaces change
- Styling updates affect component appearance

### How to Sync

```bash
# From the main repository directory
cd /path/to/tournament-stats-app

# Copy components
cp -r static/js/components/* /path/to/tournament-stats-storybook/static/js/components/
cp -r static/js/pages/* /path/to/tournament-stats-storybook/static/js/pages/
cp -r static/js/lib/* /path/to/tournament-stats-storybook/static/js/lib/
cp static/css/src/styles.css /path/to/tournament-stats-storybook/static/css/src/

# Commit and push
cd /path/to/tournament-stats-storybook
git add .
git commit -m "sync: Update components from main repo"
git push
```

Vercel will automatically build and deploy the updated Storybook.

## Project Structure

```
tournament-stats-storybook/
├── .storybook/           # Storybook configuration
│   ├── main.js          # Main config (stories, addons)
│   └── preview.js       # Preview config (styles, decorators)
├── static/
│   ├── js/
│   │   ├── components/  # UI components with stories
│   │   ├── pages/       # Page components with stories
│   │   └── lib/         # Utility functions
│   └── css/
│       └── src/
│           └── styles.css  # Tailwind CSS styles
├── package.json         # Dependencies (Storybook + React)
├── vercel.json          # Vercel deployment config
└── README.md
```

## Deployment

This repository is deployed to Vercel automatically on push to `main`.

**Deployment URL:** https://storybook-databot-ui.vercel.app

## Related Repositories

- **Main App:** [tournament-stats-app](https://github.com/ericwyman/tournament-stats-app) - Production React app (deployed on AWS)
- **Backend:** Django REST API on AWS Elastic Beanstalk

## Technology Stack

- **Storybook:** ^10.0.7
- **React:** ^18.3.1
- **Vite:** ^5.2.0
- **Tailwind CSS:** ^3.4.3
- **Radix UI:** Component primitives

## Contributing

Since this is a documentation-only repository, contributions should primarily go to the main [tournament-stats-app](https://github.com/ericwyman/tournament-stats-app) repository.

This repository should be updated periodically to sync component changes.

## License

MIT
