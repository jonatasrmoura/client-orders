import { useNavigate } from "react-router-dom";

import { CreateOrderForm } from "../components/Forms/CrateOrderForm";

export function NewOrderPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Novo Pedido</h1>
      <CreateOrderForm onSubmitSuccess={() => navigate("/orders")} />
    </div>
  );
}
