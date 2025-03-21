# Contributing to Giphy MCP Server

Thank you for considering contributing to the Giphy MCP Server! This document outlines the process for contributing to this project.

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

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Giphy API key (see `.env.example`)
4. Run the development server:
   ```bash
   npm run dev
   ```

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
