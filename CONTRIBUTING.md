# Contributing to GIPHY MCP

Thank you for your interest in contributing to this project! This document outlines the guidelines for contributing to this repository.

## Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) for our commit messages. This leads to more readable messages that are easy to follow when looking through the project history.

### Commit Message Format

Each commit message consists of a **header**, a **body**, and a **footer**. The header has a special format that includes a **type**, a **scope**, and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory, and the **scope** of the header is optional.

### Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files

### Scope

The scope should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

### Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

### Examples

```
feat(api): add new endpoint for trending gifs
fix(search): resolve issue with search results pagination
docs(readme): update installation instructions
ci(github): add workflow for automated testing
```

## Pull Request Process

1. Ensure your code adheres to the existing code style.
2. Update documentation if necessary.
3. Make sure all tests pass.
4. The PR should be reviewed by at least one maintainer before merging.

## Development Setup

### Prerequisites

- Node.js (version specified in package.json)
- npm (version specified in package.json)

### Installation

```bash
npm install
```

### Running Tests

```bash
npm test
```

### Running Linting

```bash
npm run lint
```

### Building

```bash
npm run build
```

## Environment Variables

The application requires the following environment variables:

- `GIPHY_API_KEY`: Your GIPHY API key

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Any relevant logs or screenshots
- Environment information (OS, Node.js version, etc.)

### Suggesting Features

Feature requests are welcome! Please submit an issue with:

- A clear, descriptive title
- Detailed description of the proposed feature
- Any relevant examples or mockups
- Explanation of why this feature would be useful

### Pull Requests

We welcome pull requests! To contribute code:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Add or update tests as necessary
5. Ensure all tests pass: `npm test`
6. Make sure your code follows our style guidelines (run `npm run lint`)
7. Commit your changes: `git commit -m "Add feature X"`
8. Push to your fork: `git push origin feature/your-feature-name`
9. Submit a pull request

## Code Style

- Follow TypeScript best practices
- Use ESLint for code linting (configured in the project)
- Write clear comments for functions and complex logic
- Include JSDoc comments for public APIs

## Testing

- Write tests for new features
- Make sure existing tests pass before submitting a PR

## Commit Messages

- Use clear, descriptive commit messages
- Start with a verb in the present tense
- Reference issue numbers when applicable

Example: "Add search pagination feature (#42)"

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
