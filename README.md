# MCP Server Giphy

MCP Server for the Giphy API, enabling AI models to search, retrieve, and utilize GIFs from Giphy.

### Features

- **Content Filtering**: Filter results by rating (G, PG, PG-13, R) to ensure appropriate content
- **Optimized Response Format**: Response data optimized for AI model consumption
- **Multiple Search Methods**: Support for query-based, random, and trending GIF retrieval
- **Comprehensive Metadata**: Each GIF comes with full metadata including dimensions, formats, and attribution
- **Pagination Support**: Control result size and pagination for efficient API use

## Tools

1. `search_gifs`

   - Search for GIFs on Giphy with a query string
   - Inputs:
     - `query` (string): Search query term or phrase
     - `limit` (optional number): Maximum number of objects to return (default: 10, max: 50)
     - `offset` (optional number): Results offset (default: 0)
     - `rating` (optional string): Content rating (g, pg, pg-13, r)
     - `lang` (optional string): Language code (default: en)
   - Returns: Array of GIF objects with metadata

2. `get_random_gif`

   - Get a random GIF from Giphy, optionally filtered by tag
   - Inputs:
     - `tag` (optional string): Tag to limit random results
     - `rating` (optional string): Content rating (g, pg, pg-13, r)
   - Returns: Random GIF object with metadata

3. `get_trending_gifs`
   - Get currently trending GIFs on Giphy
   - Inputs:
     - `limit` (optional number): Maximum number of objects to return (default: 10, max: 50)
     - `offset` (optional number): Results offset (default: 0)
     - `rating` (optional string): Content rating (g, pg, pg-13, r)
   - Returns: Array of trending GIF objects with metadata

## Response Format

Each GIF in the response includes:

- `id`: Unique Giphy identifier
- `title`: GIF title
- `url`: URL to the GIF on Giphy website
- `images`: Object containing various image formats, each with:
  - `url`: Direct URL to the image file
  - `width`: Image width
  - `height`: Image height
- Additional metadata when available

## Setup

### Giphy API Key

[Create a Giphy API Key](https://developers.giphy.com/dashboard/?create=true):

- Sign up for a Giphy Developer account
- Create an app to get an API key
- Choose between the free tier or paid options based on your needs

### Environment Configuration

Create a `.env` file with your API key:

```
GIPHY_API_KEY=your_api_key_here
```

### Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "giphy": {
      "command": "npx",
      "args": ["-y", "mcp-server-giphy"],
      "env": {
        "GIPHY_API_KEY": "<YOUR_API_KEY>"
      }
    }
  }
}
```

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start

# Run in development mode with hot reloading
npm run dev

# Run tests
npm test

# Use with MCP Inspector
npm run inspector
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.
