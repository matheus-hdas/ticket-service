-- CreateIndex
CREATE INDEX "tickets_nome_idx" ON "tickets"("nome");

-- CreateIndex
CREATE INDEX "tickets_prioridade_idx" ON "tickets"("prioridade");

-- CreateIndex
CREATE INDEX "tickets_departamento_idx" ON "tickets"("departamento");

-- CreateIndex
CREATE INDEX "tickets_criadoEm_idx" ON "tickets"("criadoEm");
