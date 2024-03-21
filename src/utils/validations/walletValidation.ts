import * as yup from 'yup';

export const createWalletSchema = yup.object().shape({
  amount: yup.number().min(1).required(),
});
