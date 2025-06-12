import type { OrderStatus } from "../types/Orders";

export const statusColors: Record<OrderStatus, string> = {
  Pendente: "bg-yellow-100 text-yellow-800",
  Processando: "bg-blue-100 text-blue-800",
  Finalizado: "bg-green-100 text-green-800",
};
