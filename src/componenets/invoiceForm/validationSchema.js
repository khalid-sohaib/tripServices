import * as Yup from 'yup';

// export const validationSchema = Yup.object().shape({
//   billTo: Yup.string().required('Bill To is required'),
//   description: Yup.string().required('Description is required'),
//   quantity: Yup.number()
//     .min(1, 'Minimum quantity is 1')
//     .required('Quantity is required'),
//   unitPrice: Yup.number()
//     .min(0, 'Minimum price is 0')
//     .required('Unit price is required'),
//   discount: Yup.number().max(0, 'Discount must be negative'),
//   vat: Yup.number().min(0, 'VAT must be positive'),
//   other: Yup.number().min(0, 'Other charges must be positive'),
// });

export const validationSchema = Yup.object().shape({
  billTo: Yup.string().required('Bill To is required'),
  description: Yup.string().required('Description is required'),
  quantity: Yup.number()
    .min(1, 'Minimum quantity is 1')
    .required('Quantity is required'),
  unitPrice: Yup.number()
    .min(0, 'Minimum price is 0')
    .required('Unit price is required'),
  discount: Yup.number().min(0, 'Discount must be a positive number'),
  vat: Yup.number().min(0, 'VAT must be positive'),
  other: Yup.number().min(0, 'Other charges must be positive'),
});
