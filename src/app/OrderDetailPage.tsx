import { useNavigate, useParams } from "react-router-dom";
import { OrderDetail } from "../components/OrderDetail";

export function OrderDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <div>Pedido não encontrado</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Detalhes do Pedido</h1>
      <OrderDetail
        orderId={id}
        onBack={() => navigate("/orders")}
        onUpdate={() => navigate(`/orders/update/${id}`)}
      />
    </div>
  );
}
