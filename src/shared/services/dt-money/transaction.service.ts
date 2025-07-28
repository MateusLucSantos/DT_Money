import { dtMoneyApi } from '@/shared/api/dt-money';
import { ICreateTransaction } from '@/shared/interfaces/https/create-transaction-request';
import { ITransactionCategory } from '@/shared/interfaces/https/transaction-category-response';

export async function getTransactionCategories(): Promise<ITransactionCategory[]> {
  const { data } = await dtMoneyApi.get<ITransactionCategory[]>('/transaction/categories');

  return data;
}

export async function createTransaction(transaction: ICreateTransaction) {
  await dtMoneyApi.post('/transaction', transaction);
}
