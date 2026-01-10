import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useTicketMutations, useTickets } from "@/hooks/use.tickets";
import { Input } from "@/components/shadcn/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";
import { TicketCard } from "@/components/ticket.card";
import { CreateTicketModal } from "@/components/create.ticket.modal";
import { EditTicketModal } from "@/components/edit.ticket.modal";

export function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteMutation, updateMutation } = useTicketMutations();

  const [filters, setFilters] = useState({
    q: "",
    prioridade: "all",
    departamento: "all",
    sort: "criadoEm",
    order: "desc",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useTickets({
    ...filters,
    prioridade: filters.prioridade === "all" ? "" : filters.prioridade,
    departamento: filters.departamento === "all" ? "" : filters.departamento,
  });

  const { ref, inView } = useInView();

  const handleDelete = async (id) => {
    if (confirm("Deseja realmente excluir este ticket?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const handleUpdate = async (formData) => {
    await updateMutation.mutateAsync({
      id: selectedTicket.id,
      data: formData,
    });
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8">Tickets de Suporte</h1>

      <div className="mb-6">
        <CreateTicketModal />
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3 mb-8">
        <div className="w-full md:flex-1">
          <Input
            placeholder="Buscar pelo nome..."
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            className="w-full"
          />
        </div>

        <div className="flex w-full md:w-auto gap-2">
          <Select
            onValueChange={(val) => setFilters({ ...filters, prioridade: val })}
            defaultValue="all"
          >
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Prioridades</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="critica">Crítica</SelectItem>
            </SelectContent>
          </Select>

          <Select
            onValueChange={(val) =>
              setFilters({ ...filters, departamento: val })
            }
            defaultValue="all"
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Departamentos</SelectItem>
              <SelectItem value="financeiro">Financeiro</SelectItem>
              <SelectItem value="suporte">Suporte</SelectItem>
              <SelectItem value="ti">TI</SelectItem>
              <SelectItem value="comercial">Comercial</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={`${filters.sort}-${filters.order}`}
            onValueChange={(val) => {
              const [sort, order] = val.split("-");
              setFilters({ ...filters, sort, order });
            }}
          >
            <SelectTrigger className="w-full md:w-[220px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="criadoEm-desc">
                Mais recentes (Data)
              </SelectItem>
              <SelectItem value="criadoEm-asc">Mais antigos (Data)</SelectItem>
              <SelectItem value="id-asc">ID Crescente</SelectItem>
              <SelectItem value="id-desc">ID Decrescente</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading && <p>Carregando tickets...</p>}
        {isError && <p className="text-red-500">Erro ao carregar dados.</p>}

        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.data?.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onEdit={handleEditClick}
                onDelete={handleDelete}
                isDeleting={
                  deleteMutation.isPending &&
                  deleteMutation.variables === ticket.id
                }
              />
            ))}
          </React.Fragment>
        ))}

        <div ref={ref} className="h-20 flex items-center justify-center">
          {isFetchingNextPage && (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          )}
        </div>
      </div>

      {selectedTicket && (
        <EditTicketModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          ticket={selectedTicket}
          onSubmit={handleUpdate}
          isPending={updateMutation.isPending}
        />
      )}
    </div>
  );
}
