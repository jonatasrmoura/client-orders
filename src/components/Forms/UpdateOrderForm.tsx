import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../Input";
import { Select } from "../Select";
import {
  OrderStatus,
  UpdateOrderStatus,
  type OrderResponseDTO,
  type UpdateOrderDTO,
} from "../../types/Orders";
import { updateOrderSchema } from "../../validations/updateOrderSchema";
import { updateOrder, getOrderById } from "../../services/api";

interface OrderFormProps {
  onSubmitSuccess: () => void;
  id: string;
}

export function UpdateOrderForm({ id, onSubmitSuccess }: OrderFormProps) {
  const [order, setOrder] = useState<OrderResponseDTO>();
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateOrderDTO>({
    resolver: yupResolver(updateOrderSchema),
  });

  const onSubmit = async (data: UpdateOrderDTO) => {
    try {
      await updateOrder(data, id);
      onSubmitSuccess();
      reset();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getOrderById(id)
        .then((result) => {
          setOrder(result);
          // Preenche os valores do formulário
          reset({
            client: result.client,
            product: result.product,
            value: result.value,
            status: convertStatusToNumber(result.status),
          });
        })
        .finally(() => setIsLoading(false));
    }
  }, [id, reset]);

  // Função auxiliar para converter o status textual para numérico
  const convertStatusToNumber = (status: OrderStatus): number => {
    switch (status) {
      case OrderStatus.Pendente:
        return UpdateOrderStatus.Pendente;
      case OrderStatus.Processando:
        return UpdateOrderStatus.Processando;
      case OrderStatus.Finalizado:
        return UpdateOrderStatus.Finalizado;
      default:
        return UpdateOrderStatus.Pendente;
    }
  };

  if (isLoading) {
    return <div>Carregando pedido...</div>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          id="client"
          label="Cliente"
          defaultValue={order?.client}
          placeholder="Digite o nome do cliente..."
          register={register("client")}
          error={errors.client?.message}
        />
      </div>

      <div>
        <Input
          id="product"
          label="Produto"
          defaultValue={order?.product}
          placeholder="Digite o nome do produto..."
          register={register("product")}
          error={errors.product?.message}
        />
      </div>

      <div>
        <Input
          id="value"
          label="Valor (Apenas números)"
          defaultValue={order?.value}
          type="number"
          step="0.01"
          placeholder="Entre com o valor do produto..."
          register={register("value")}
          error={errors.value?.message}
        />
      </div>

      <div>
        <Select
          label="Status do Pedido"
          id="status"
          register={register("status")}
          options={[
            {
              value: UpdateOrderStatus.Pendente,
              label: OrderStatus.Pendente,
            },
            {
              value: UpdateOrderStatus.Processando,
              label: OrderStatus.Processando,
            },
            {
              value: UpdateOrderStatus.Finalizado,
              label: OrderStatus.Finalizado,
            },
          ]}
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
        {isSubmitting ? "Enviando..." : "Atualizar Pedido"}
      </button>
    </form>
  );
}
