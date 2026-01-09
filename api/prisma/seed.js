import "dotenv/config";

import seedrandom from "seedrandom";
import { faker } from "@faker-js/faker";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import { TITLES } from "./ticket.titles.js";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { PrismaClient } = require("@prisma/client");

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL,
});

const database = new PrismaClient({ adapter });

seedrandom("tickets-seed-2026", { global: true });

const PRIORIDADES = ["BAIXA", "MEDIA", "ALTA", "CRITICA"];
const DEPARTAMENTOS = ["FINANCEIRO", "SUPORTE", "TI", "COMERCIAL", "RH"];

const TOTAL = 30000;
const BATCH_SIZE = 1000;

async function main() {
  console.log("Limpando tickets existentes...");
  await database.ticket.deleteMany();

  console.log("Gerando tickets...");

  for (let i = 0; i < TOTAL; i += BATCH_SIZE) {
    const tickets = [];

    for (let j = 0; j < BATCH_SIZE; j++) {
      const departamento = faker.helpers.arrayElement(DEPARTAMENTOS);
      const prioridade = faker.helpers.arrayElement(PRIORIDADES);

      const titulo = faker.helpers.arrayElement(
        TITLES[departamento][prioridade]
      );

      tickets.push({
        nome: `${titulo} #${i + j + 1}`,
        prioridade,
        departamento,
        criadoEm: faker.date.past({ years: 2 }),
      });
    }

    await database.ticket.createMany({
      data: tickets,
    });

    console.log(`Ok => ${Math.min(i + BATCH_SIZE, TOTAL)} / ${TOTAL}`);
  }

  console.log("Seed finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await database.$disconnect();
  });
