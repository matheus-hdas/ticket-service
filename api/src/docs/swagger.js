export const swaggerDocs = {
  openapi: "3.0.0",
  info: {
    title: "Ticket Management API",
    version: "1.0.0",
    description:
      "API para gestão de chamados com paginação via Cursor e suporte a alta volumetria.",
  },
  servers: [
    {
      url: "http://localhost:" + process.env.PORT,
      description: "Servidor",
    },
  ],
  paths: {
    "/api/tickets": {
      get: {
        tags: ["Tickets"],
        summary: "Lista tickets com suporte a cursor e filtros",
        parameters: [
          {
            name: "q",
            in: "query",
            description: "Busca textual por nome",
            schema: { type: "string" },
          },
          {
            name: "prioridade",
            in: "query",
            schema: {
              type: "string",
              enum: ["BAIXA", "MEDIA", "ALTA", "CRITICA"],
            },
          },
          {
            name: "departamento",
            in: "query",
            schema: {
              type: "string",
              enum: ["FINANCEIRO", "COMERCIAL", "SUPORTE", "RH", "TI"],
            },
          },
          {
            name: "sort",
            in: "query",
            description: "Campo para ordenação",
            schema: { type: "string", default: "criadoEm" },
          },
          {
            name: "order",
            in: "query",
            schema: {
              type: "string",
              enum: ["asc", "desc"],
              default: "desc",
            },
          },
          {
            name: "limit",
            in: "query",
            schema: { type: "integer", default: 50 },
          },
          {
            name: "cursor",
            in: "query",
            description:
              "ID do último registro da página anterior para paginação infinita",
            schema: { type: "string" },
          },
        ],
        responses: {
          200: {
            description: "Lista de tickets recuperada",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Ticket" },
                    },
                    nextCursor: {
                      type: "string",
                      nullable: true,
                      example: "cmk8wqsrw0c3h4r9yppc79yum",
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Tickets"],
        summary: "Cria um novo chamado",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["nome", "prioridade", "departamento"],
                properties: {
                  nome: {
                    type: "string",
                    example: "Falha na geração de boletos #1820",
                  },
                  prioridade: {
                    type: "string",
                    enum: ["BAIXA", "MEDIA", "ALTA", "CRITICA"],
                    example: "ALTA",
                  },
                  departamento: {
                    type: "string",
                    enum: ["FINANCEIRO", "COMERCIAL", "SUPORTE", "RH", "TI"],
                    example: "FINANCEIRO",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Ticket criado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Ticket" },
              },
            },
          },
          400: { description: "Dados inválidos" },
        },
      },
    },

    "/api/tickets/{id}": {
      get: {
        tags: ["Tickets"],
        summary: "Obter detalhes de um ticket específico",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            description: "ID único do ticket (CUID)",
            schema: { type: "string" },
            example: "cmk8wqsxv0d3r4r9yqxi6ygd3",
          },
        ],
        responses: {
          200: {
            description: "Detalhes do ticket retornados com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Ticket" },
              },
            },
          },
          404: { description: "Ticket não encontrado" },
        },
      },
      put: {
        tags: ["Tickets"],
        summary: "Atualizar um ticket",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  nome: { type: "string" },
                  prioridade: {
                    type: "string",
                    enum: ["BAIXA", "MEDIA", "ALTA", "CRITICA"],
                  },
                  departamento: {
                    type: "string",
                    enum: ["FINANCEIRO", "COMERCIAL", "SUPORTE", "RH", "TI"],
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Ticket atualizado com sucesso",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Ticket" },
              },
            },
          },
          400: { description: "Dados inválidos" },
          404: { description: "Ticket não encontrado" },
        },
      },
      delete: {
        tags: ["Tickets"],
        summary: "Remover um ticket",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          204: { description: "Ticket removido com sucesso (sem conteúdo)" },
          404: { description: "Ticket não encontrado" },
        },
      },
    },
  },

  components: {
    schemas: {
      Ticket: {
        type: "object",
        properties: {
          id: { type: "string", example: "cmk8wqsxv0d3r4r9yqxi6ygd3" },
          nome: {
            type: "string",
            example: "Nota fiscal não localizada",
          },
          prioridade: {
            type: "string",
            enum: ["BAIXA", "MEDIA", "ALTA", "CRITICA"],
          },
          departamento: {
            type: "string",
            enum: ["FINANCEIRO", "COMERCIAL", "SUPORTE", "RH", "TI"],
          },
          criadoEm: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T22:50:24.564Z",
          },
          atualizadoEm: {
            type: "string",
            format: "date-time",
            example: "2026-01-10T22:59:44.509Z",
          },
        },
      },
    },
  },
};
