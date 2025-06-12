export interface CreateOrderDTO {
  client: string;
  product: string;
  value: number;
}

export interface UpdateOrderDTO {
  client: string;
  product: string;
  value: number;
  status: UpdateOrderStatus;
}

export interface OrderResponseDTO {
  id: string;
  client: string;
  product: string;
  value: number;
  status: OrderStatus;
  createdAt: string;
  formattedValue: string;
  statusDescription: string;
}

export enum OrderStatus {
  Pendente = 'Pendente',
  Processando = 'Processando',
  Finalizado = 'Finalizado'
}

export enum  UpdateOrderStatus {
  Pendente = 0,
  Processando = 1,
  Finalizado = 2
}