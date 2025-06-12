import { useEffect, useState } from "react";
import { OrderStatus, type OrderResponseDTO } from "../types/Orders";
import { deleteOrder, getOrderById } from "../services/api";
import { statusColors } from "../utils/statusColors";
import { formatDate } from "../utils/formatDate ";
import { formatCurrency } from "../utils/formatCurrency";
import Swal from "sweetalert2";

interface OrderDetailProps {
  orderId: string | null;
  onBack?: () => void;
  onUpdate?: () => void;
}

export function OrderDetail({ orderId, onBack, onUpdate }: OrderDetailProps) {
  const [order, setOrder] = useState<OrderResponseDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function handleDeleteOrder() {
    const result = await Swal.fire({
      title: "Deseja excluir esse pedido?",
      text: `pedido: ${order?.product} - ${order?.id}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Sim, excluir pedido!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed && orderId) {
      try {
        await deleteOrder(orderId);

        await Swal.fire({
          title: "Excluido!",
          text: "Pedido excluido com sucesso.",
          icon: "success",
        });

        onBack && onBack();
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  }

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        const data = await getOrderById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <div>Loading...</div>;
  if (!order) return <div>Order not found</div>;

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Detalhes do Pedido
            </h1>
            <p className="text-gray-500 mt-2">ID: {order.id}</p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleDeleteOrder}
              className="hidden  md:flex px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors cursor-pointer"
            >
              Excluir
            </button>
            {onUpdate && (
              <button
                onClick={onUpdate}
                className="hidden  md:flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Atualizar
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 items-center md:flex-row md:gap-0">
          <span
            className={`px-3 py-1 text-sm font-semibold rounded-full ${
              statusColors[order.status]
            }`}
          >
            {order.status === OrderStatus.Pendente && "Pendente"}
            {order.status === OrderStatus.Processando && "Em Processamento"}
            {order.status === OrderStatus.Finalizado && "Entregue"}
          </span>
          <span className="ml-4 text-gray-500">
            Realizado em: {formatDate(order.createdAt)}
          </span>
        </div>
      </div>

      {/* Grid de informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Seção do Cliente */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Cliente</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p className="font-medium">{order.client}</p>
            </div>
          </div>
        </div>

        {/* Seção do Produto */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">Produto</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nome do Produto</p>
              <p className="font-medium">{order.product}</p>
            </div>
          </div>
        </div>

        {/* Seção de Pagamento */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Pagamento
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Valor Total</p>
              <p className="font-medium text-lg">
                {formatCurrency(order.value)}
              </p>
            </div>
          </div>
        </div>

        {onUpdate && (
          <button
            onClick={onUpdate}
            className="md:hidden md:flex px-4 py-2 bg-yellow-800 text-white rounded-lg hover:bg-yellow-900 transition-colors"
          >
            Atualizar
          </button>
        )}

        {onBack && (
          <button
            onClick={onBack}
            className="md:hidden md:flex px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar
          </button>
        )}
      </div>
    </div>
  );
}
