# COLY - Code Online, Learn Yourself

A comprehensive learning platform for Software Engineers and DevOps, created by Daniel Pomfret, a Senior Technical Lead with over 15 years of experience in Software Engineering.

## About

COLY (Code Online, Learn Yourself) provides structured courses for people starting their tech journey. Created by Daniel Pomfret, who currently works for a large organisation as a Senior Technical Lead developing services used by millions of users, these courses are based on real-world, production-proven practices.

## Courses

The platform includes:

- **Fundamentals**: Programming basics, Java, Git, and development environment setup
- **Software Engineering**: TDD, REST APIs, code quality, and professional practices
- **DevOps**: Docker, CI/CD with GitLab, Kafka, and infrastructure automation

## Getting Started

### Prerequisites

- Node.js 20.0 or higher
- npm (comes with Node.js)

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

The site will open at `http://localhost:3000/`

### Build

Build the site for production:

```bash
npm run build
```

### Serve Production Build

Test the production build locally:

```bash
npm run serve
```

## Project Structure

```
coly/
├── docs/                      # Course content (Markdown files)
│   ├── intro.md              # Welcome page
│   ├── fundamentals/         # Basics of programming
│   │   ├── _category_.json
│   │   ├── intro-to-programming.md
│   │   ├── setup-environment.md
│   │   └── git-basics.md
│   ├── software-engineering/ # Professional practices
│   │   ├── _category_.json
│   │   ├── test-driven-development.md
│   │   └── rest-apis.md
│   └── devops/              # DevOps practices
│       ├── _category_.json
│       ├── containerization.md
│       └── cicd-pipelines.md
├── src/
│   ├── components/          # React components
│   │   └── HomepageFeatures/
│   ├── css/                 # Custom styling
│   └── pages/              # Custom pages
│       └── index.tsx       # Homepage
├── static/                  # Static assets (images, etc.)
├── docusaurus.config.ts    # Site configuration
└── sidebars.ts             # Sidebar navigation
```

## Adding New Content

### Create a New Course

1. Create a new folder in `docs/` (e.g., `docs/advanced-topics/`)
2. Add a `_category_.json` file:

```json
{
  "label": "Advanced Topics",
  "position": 5,
  "link": {
    "type": "generated-index",
    "description": "Advanced topics for experienced developers."
  }
}
```

3. Add Markdown files for lessons

### Add a New Lesson

Create a Markdown file in the appropriate folder:

```markdown
---
sidebar_position: 1
---

# Your Lesson Title

Content goes here...
```

## Configuration

- **Site metadata**: Edit `docusaurus.config.ts`
- **Navigation**: Edit `sidebars.ts`
- **Homepage**: Edit `src/pages/index.tsx`
- **Styling**: Edit `src/css/custom.css`

## Deployment

### GitHub Pages

```bash
npm run deploy
```

### Other Platforms

Build the site and deploy the `build/` directory to your hosting provider:

```bash
npm run build
```

## Learn More

- [Docusaurus Documentation](https://docusaurus.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [React Documentation](https://react.dev/)

## Author

Created by Daniel Pomfret - Senior Technical Lead with 15+ years of Software Engineering experience.

## License

Copyright © Daniel Pomfret. All course materials are for educational purposes.
