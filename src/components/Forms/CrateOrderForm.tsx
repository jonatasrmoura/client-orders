import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../Input";
import type { CreateOrderDTO } from "../../types/Orders";
import { orderSchema } from "../../validations/orderSchema";
import { createOrder } from "../../services/api";

interface OrderFormProps {
  onSubmitSuccess: () => void;
}

export function CreateOrderForm({ onSubmitSuccess }: OrderFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateOrderDTO>({
    resolver: yupResolver(orderSchema),
    defaultValues: {
      client: "",
      product: "",
      value: 0,
    },
  });

  const onSubmit = async (data: CreateOrderDTO) => {
    try {
      await createOrder(data);
      onSubmitSuccess();
      reset();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          id="client"
          label="Cliente"
          placeholder="Digite o nome do cliente..."
          register={{ ...register("client") }}
          error={errors.client?.message}
        />
      </div>

      <div>
        <Input
          id="product"
          label="Produto"
          placeholder="Digite o nome do produto..."
          register={{ ...register("product") }}
          error={errors.product?.message}
        />
      </div>

      <div>
        <Input
          id="value"
          label="Valor (Apenas números)"
          type="number"
          step="0.01"
          placeholder="Entre com o valor do produto..."
          register={{ ...register("value") }}
          error={errors.value?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-2 rounded-md text-white ${
          isSubmitting
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting ? "Enviando..." : "Criar Pedido"}
      </button>
    </form>
  );
}
