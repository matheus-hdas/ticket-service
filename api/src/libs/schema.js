import { z } from "zod";
import { Prioridade, Departamento } from "@prisma/client";

const PrioridadeSchema = z
  .string()
  .transform((v) => v.toUpperCase())
  .pipe(
    z.enum([
      Prioridade.BAIXA,
      Prioridade.MEDIA,
      Prioridade.ALTA,
      Prioridade.CRITICA,
    ])
  );

const DepartamentoSchema = z
  .string()
  .transform((v) => v.toUpperCase())
  .pipe(
    z.enum([
      Departamento.FINANCEIRO,
      Departamento.SUPORTE,
      Departamento.TI,
      Departamento.COMERCIAL,
      Departamento.RH,
    ])
  );

export const CreateTicketSchema = z.object({
  nome: z.string(),
  prioridade: PrioridadeSchema,
  departamento: DepartamentoSchema,
});

export const UpdateTicketSchema = z.object({
  id: z.cuid(),
  nome: z.string(),
  prioridade: PrioridadeSchema,
  departamento: DepartamentoSchema,
});
