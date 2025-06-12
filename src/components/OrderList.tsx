import { useEffect, useState } from "react";

import { getOrders } from "../services/api";
import type { OrderResponseDTO } from "../types/Orders";
import { formatCurrency } from "../utils/formatCurrency";
import { formatDate } from "../utils/formatDate ";
import { statusColors } from "../utils/statusColors";

interface OrderListProps {
  onSelectOrder: (id: string) => void;
}

export function OrderList({ onSelectOrder }: OrderListProps) {
  const [orders, setOrders] = useState<OrderResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto">
      {/* Tabela para telas médias/grandes */}
      <table className="min-w-full divide-y divide-gray-200 hidden md:table">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cliente
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr
              key={order.id}
              onClick={() => onSelectOrder(order.id)}
              className="cursor-pointer"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {order.client}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {order.product}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatCurrency(order.value)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    statusColors[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(order.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cards para telas pequenas */}
      <div className="space-y-4 md:hidden">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow overflow-hidden rounded-lg p-4 cursor-pointer"
            onClick={() => onSelectOrder(order.id)}
          >
            <div className="flex justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                {order.client}
              </h3>
              <span
                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  statusColors[order.status]
                }`}
              >
                {order.status}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Produto</p>
                <p className="text-sm font-medium">{order.product}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Valor</p>
                <p className="text-sm font-medium">
                  {formatCurrency(order.value)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Data</p>
                <p className="text-sm font-medium">
                  {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
