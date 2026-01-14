# COLY - Code Online, Learn Yourself

A comprehensive learning platform for Software Engineers and DevOps, created by Daniel Pomfret, a Senior Technical Lead with over 15 years of experience in Software Engineering.

## About

COLY (Code Online, Learn Yourself) provides structured courses for people starting their tech journey. Created by Daniel Pomfret, who currently works for a large organisation as a Senior Technical Lead developing services used by millions of users, these courses are based on real-world, production-proven practices.

## Courses

### Software Engineering

- **Fundamentals**: Programming basics, Java, variables, data types, loops, functions, and Maven
- **Test Driven Development**: TDD concepts, unit testing, integration testing, component testing, and BDD with Cucumber
- **APIs**: REST API design, building APIs with Spring Boot, and testing with REST Assured
- **Event Driven Architecture**: Apache Kafka, producing and consuming events with Spring Boot

### DevOps

- **Git Basics**: Version control fundamentals
- **Containerization**: Docker and container concepts
- **CI/CD Pipelines**: Continuous integration and deployment

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
├── docs/
│   └── courses/
│       ├── intro.md
│       ├── software-engineering/
│       │   ├── fundamentals/
│       │   ├── test-driven-development/
│       │   ├── apis/
│       │   └── event-driven-architecture/
│       └── devops/
│           ├── git-basics.md
│           ├── containerization.md
│           └── cicd-pipelines.md
├── src/
│   ├── components/
│   ├── css/
│   └── pages/
├── static/
├── docusaurus.config.ts
└── sidebars.ts
```

## Adding New Content

### Create a New Course

1. Create a new folder under the appropriate category (e.g., `docs/courses/software-engineering/new-topic/`)
2. Add a `_category_.json` file:

```json
{
  "label": "New Topic",
  "position": 5,
  "link": {
    "type": "generated-index",
    "slug": "/courses/software-engineering/new-topic",
    "description": "Description of this course."
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

## Support

If you find these courses helpful, consider [buying me a coffee](https://buymeacoffee.com/danomanic)!

## Author

Created by Daniel Pomfret - Senior Technical Lead with 15+ years of Software Engineering experience.

## License

Copyright © Daniel Pomfret. All course materials are for educational purposes.
