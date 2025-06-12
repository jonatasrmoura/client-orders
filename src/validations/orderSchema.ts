import * as yup from 'yup';

export const orderSchema = yup.object().shape({
  client: yup.string().required('Cliente é obrigatório').min(3, 'Mínimo 3 caracteres'),
  product: yup.string().required('Produto é obrigatório').min(3, 'Mínimo 3 caracteres'),
  value: yup
    .number()
    .typeError('Deve ser um número')
    .required('Valor é obrigatório')
    .positive('Valor deve ser positivo')
    .min(0.01, 'Valor mínimo é 0.01')
});
