import { useNavigate, useParams } from "react-router-dom";

import { UpdateOrderForm } from "../components/Forms/UpdateOrderForm";

export function UpdateOrderPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <div>Pedido não encontrado</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Atualizar Pedido</h1>
      <UpdateOrderForm id={id} onSubmitSuccess={() => navigate("/orders")} />
    </div>
  );
}
