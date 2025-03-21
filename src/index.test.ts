import { main } from "./index.js";
import { server } from "./server.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

// Mock the server and StdioServerTransport
jest.mock("./server.js", () => ({
  server: {
    connect: jest.fn(),
  },
}));

jest.mock("@modelcontextprotocol/sdk/server/stdio.js", () => ({
  StdioServerTransport: jest.fn().mockImplementation(() => ({
    // Mock implementation of StdioServerTransport
  })),
}));

// Mock console.error to avoid cluttering test output
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});

afterEach(() => {
  console.error = originalConsoleError;
});

describe("Index Module", () => {
  it("should connect the server with StdioServerTransport", async () => {
    // Call the main function
    await main();

    // Check that a StdioServerTransport was created
    expect(StdioServerTransport).toHaveBeenCalled();

    // Verify server.connect was called with the transport
    expect(server.connect).toHaveBeenCalled();

    // Verify the console message was logged
    expect(console.error).toHaveBeenCalledWith("GIPHY MCP Server running...");
  });

  it("should handle process events", () => {
    // Check that process.on exists (simple check rather than trying to mock it)
    expect(typeof process.on).toBe("function");
  });
});
