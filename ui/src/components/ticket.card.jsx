import {
  Pencil,
  Trash2,
  MoreVertical,
  Copy,
  Check,
  Hash,
  CalendarDays,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/shadcn/ui/button";
import { Card, CardContent } from "@/components/shadcn/ui/card";
import { Badge } from "@/components/shadcn/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";

export function TicketCard({ ticket, onEdit, onDelete, isDeleting }) {
  const [copied, setCopied] = useState(false);

  const dataFormatada = new Date(ticket.criadoEm).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const priorityStyles = {
    baixa: "bg-blue-100 text-blue-800 border-blue-200",
    media: "bg-yellow-100 text-yellow-800 border-yellow-200",
    alta: "bg-orange-100 text-orange-800 border-orange-200",
    critica: "bg-red-100 text-red-800 border-red-200",
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(ticket.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar ID:", err);
    }
  };

  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-l-4 border-l-primary/20">
      <CardContent className="p-4 flex justify-between items-start gap-4">
        <div className="space-y-3 flex-1 min-w-0">
          <div className="flex items-start gap-2 flex-wrap">
            <h3 className="font-bold text-base md:text-lg text-foreground break-words leading-tight flex-1">
              {ticket.nome}
            </h3>
            <Badge
              variant="outline"
              className={`${
                priorityStyles[ticket.prioridade] || ""
              } capitalize font-medium shrink-0`}
            >
              {ticket.prioridade}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 group/id">
              <Hash className="h-3 w-3" />
              <code className="text-[11px] font-mono bg-muted px-1.5 py-0.5 rounded break-all">
                {ticket.id}
              </code>
              <button
                onClick={copyToClipboard}
                className="p-1 hover:bg-muted rounded"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-green-600" />
                ) : (
                  <Copy className="h-3 w-3 opacity-0 group-hover/id:opacity-100" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              <span>Criado em: {dataFormatada}</span>
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            {ticket.departamento}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" disabled={isDeleting}>
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(ticket)}>
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(ticket.id)}
              className="text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
