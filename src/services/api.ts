import axios from "axios";
import type {
  CreateOrderDTO,
  OrderResponseDTO,
  UpdateOrderDTO,
} from "../types/Orders";

const api = axios.create({
  baseURL: "http://localhost:5042/api/v1",
});

export const getOrders = async (): Promise<OrderResponseDTO[]> => {
  const response = await api.get("/orders");
  return response.data;
};

export const createOrder = async (
  order: CreateOrderDTO
): Promise<OrderResponseDTO> => {
  const response = await api.post("/orders", order);
  return response.data;
};

export const getOrderById = async (id: string): Promise<OrderResponseDTO> => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrder = async (
  order: UpdateOrderDTO,
  id: string
): Promise<OrderResponseDTO> => {
  const response = await api.put(`/orders/${id}`, order);
  return response.data;
};

export const deleteOrder = async (id: string): Promise<Boolean> => {
  const response = await api.delete(`/orders/${id}`);
  return response.data;
};
