import { OrderList } from "../components/OrderList";
import { useNavigate } from "react-router-dom";

export function OrdersPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Pedidos</h1>
      </div>
      <OrderList onSelectOrder={(id) => navigate(`/orders/${id}`)} />
    </div>
  );
}
