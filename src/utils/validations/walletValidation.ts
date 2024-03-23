import * as yup from 'yup';

export const amountSchema = yup.object().shape({
  amount: yup.number().min(1).required(),
});
