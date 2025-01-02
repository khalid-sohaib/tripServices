import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  billTo: Yup.string().required('Bill To is required'),
  discount: Yup.number(),
  vat: Yup.number().min(0, 'VAT cannot be negative'),
  tasks: Yup.array().of(
    Yup.object().shape({
      description: Yup.string().required('Description is required'),
      quantity: Yup.number()
        .min(1, 'Quantity must be at least 1')
        .required('Quantity is required'),
      unitPrice: Yup.number()
        .min(0, 'Unit Price cannot be negative')
        .required('Unit Price is required'),
    }),
  ),
});
