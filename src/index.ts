#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// Schémas (même contenu que précédemment)
const CreateItinerarySchema = z.object({
  origin: z.string().describe("Starting location"),
  destination: z.string().describe("Destination location"),
  startDate: z.string().describe("Start date (YYYY-MM-DD)"),
  endDate: z.string().describe("End date (YYYY-MM-DD)"),
  budget: z.number().optional().describe("Budget in USD"),
  preferences: z.array(z.string()).optional().describe("Travel preferences"),
});

const server = new Server(
  {
    name: "travel-planner",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "create_itinerary",
      description: "Creates a personalized travel itinerary",
      inputSchema: zodToJsonSchema(CreateItinerarySchema),
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "create_itinerary") {
      const validated = CreateItinerarySchema.parse(args);
      return {
        content: [
          {
            type: "text",
            text: `Itinéraire : ${validated.origin} ➡ ${validated.destination} du ${validated.startDate} au ${validated.endDate}`,
          },
        ],
      };
    }
    throw new Error("Unknown tool: " + name);
  } catch (error) {
    return {
      content: [{ type: "text", text: `Erreur: ${error}` }],
      isError: true,
    };
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Travel Planner MCP Server running on stdio");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});
