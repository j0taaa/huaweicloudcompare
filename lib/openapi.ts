export function getOpenApiSpec(baseUrl = "") {
  const providerExamples = [
    "/api/aws/EC2",
    "/api/azure/azure%20vm",
    "/api/gcp/GCE",
    "/api/huawei/Elastic%20Cloud%20Compute"
  ];

  return {
    openapi: "3.1.0",
    info: {
      title: "Huawei Cloud Compare API",
      version: "1.0.0",
      description: "Public API for cross-provider service lookup, row search, and community suggestions."
    },
    servers: baseUrl ? [{ url: baseUrl }] : [],
    tags: [
      { name: "lookup", description: "Provider-specific service lookup" },
      { name: "search", description: "Search service rows from the comparison table" },
      { name: "suggestions", description: "Submit community edit suggestions" },
      { name: "admin", description: "Admin moderation endpoints using an auth cookie" }
    ],
    paths: {
      "/api/aws/{service}": providerPath("aws"),
      "/api/azure/{service}": providerPath("azure"),
      "/api/gcp/{service}": providerPath("gcp"),
      "/api/huawei/{service}": providerPath("huawei"),
      "/api/search": {
        get: {
          tags: ["search"],
          summary: "Search service rows",
          parameters: [
            { name: "query", in: "query", schema: { type: "string" } },
            { name: "q", in: "query", schema: { type: "string" } }
          ],
          responses: {
            "200": {
              description: "Matching rows",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      query: { type: "string" },
                      count: { type: "integer" },
                      rows: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            category: { type: "string" },
                            generalFunction: { type: "string" },
                            providers: { type: "object" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/suggestions": {
        post: {
          tags: ["suggestions"],
          summary: "Submit a community suggestion",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["type", "submitterName", "summary", "rationale", "proposal"],
                  properties: {
                    type: { type: "string", enum: ["edit", "add"] },
                    targetServiceId: { type: "string" },
                    submitterName: { type: "string" },
                    submitterEmail: { type: "string" },
                    summary: { type: "string" },
                    rationale: { type: "string" },
                    proposal: { type: "object" }
                  }
                },
                examples: {
                  edit: {
                    value: {
                      type: "edit",
                      targetServiceId: "aws-ec2",
                      submitterName: "Alex",
                      summary: "Clarify EC2 migration notes",
                      rationale: "The current note misses placement-group differences.",
                      proposal: {
                        migrationToHuawei: [
                          "Map compute shape, placement, IAM, and networking before cutover.",
                          "Validate ECS, IMS, and AS feature parity before production migration."
                        ]
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            "201": { description: "Suggestion accepted" },
            "400": { description: "Invalid suggestion" }
          }
        }
      },
      "/api/openapi": {
        get: {
          tags: ["lookup"],
          summary: "Fetch this OpenAPI document",
          responses: {
            "200": { description: "OpenAPI spec" }
          }
        }
      },
      "/api/admin/login": adminPost("Create an admin session"),
      "/api/admin/logout": adminPost("Destroy the current admin session"),
      "/api/admin/password": adminPost("Change the admin password"),
      "/api/admin/review": adminPost("Approve or deny a pending suggestion")
    },
    components: {
      schemas: {
        PublicService: {
          type: "object",
          properties: {
            id: { type: "string" },
            provider: { type: "string" },
            providerName: { type: "string" },
            generalFunction: { type: "string" },
            name: { type: "string" },
            shortName: { type: "string" },
            icon: { type: "string" },
            description: { type: "string" },
            keywords: { type: "array", items: { type: "string" } }
          }
        }
      }
    },
    "x-providerExamples": providerExamples
  };
}

function providerPath(provider: string) {
  return {
    get: {
      tags: ["lookup"],
      summary: `Look up a ${provider} service by full name, short name, or fuzzy alias`,
      parameters: [
        {
          name: "service",
          in: "path",
          required: true,
          schema: { type: "string" }
        }
      ],
      responses: {
        "200": {
          description: "Matched service and its Huawei mapping"
        },
        "404": {
          description: "No match found"
        }
      }
    }
  };
}

function adminPost(summary: string) {
  return {
    post: {
      tags: ["admin"],
      summary,
      responses: {
        "303": { description: "Redirect back to /admin" },
        "401": { description: "Unauthorized" }
      }
    }
  };
}
