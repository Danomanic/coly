---
sidebar_position: 1
---

# Git and Version Control

Learn how to track changes to your code and collaborate with others using Git.

## What is Version Control?

Version control is a system that records changes to files over time. It allows you to:

- Track every change you make
- Revert to previous versions
- Collaborate with other developers
- Keep a history of your project

## What is Git?

Git is the most popular version control system. It's free, open-source, and used by millions of developers worldwide.

## Installing Git

### Windows
Download from [git-scm.com](https://git-scm.com/)

### Mac
```bash
brew install git
```

### Linux
```bash
sudo apt-get install git
```

## Basic Git Commands

### Configure Git

Set up your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Create a Repository

```bash
git init
```

This creates a new Git repository in your current directory.

### Check Status

```bash
git status
```

See what files have changed.

### Stage Changes

```bash
git add HelloColy.java
# Or add all files:
git add .
```

### Commit Changes

```bash
git commit -m "Add hello world program"
```

Always write clear commit messages describing what you changed!

### View History

```bash
git log
```

## Practice Exercise

1. Create a new directory for a project
2. Initialise a Git repository
3. Create a Java file with a simple program
4. Stage and commit your changes
5. Make a change to the file
6. Commit the new changes
7. View your commit history

## Next Steps

In the next section, we'll learn about GitHub and how to share your code with others.

:::tip
Make commits frequently! It's better to have many small commits than one large one.
:::
