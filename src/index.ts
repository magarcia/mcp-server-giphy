#!/usr/bin/env node

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./server.js";

// Main function to start the server
export async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("GIPHY MCP Server running...");
}

// Handle process exits
process.on("SIGINT", () => {
  console.error("Received SIGINT, shutting down...");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.error("Received SIGTERM, shutting down...");
  process.exit(0);
});

// Start the server
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
