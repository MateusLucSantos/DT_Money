import { ITransactionCategory } from '@/shared/interfaces/https/transaction-category-response';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

import * as transactionService from '@/shared/services/dt-money/transaction.service';
import { ICreateTransaction } from '@/shared/interfaces/https/create-transaction-request';

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: ITransactionCategory[];
  createTransaction: (transaction: ICreateTransaction) => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionContextProvider({ children }: PropsWithChildren) {
  const [categories, setCategories] = useState<ITransactionCategory[]>([]);

  async function fetchCategories() {
    const categoriesResponse = await transactionService.getTransactionCategories();
    setCategories(categoriesResponse);
  }

  async function createTransaction(transaction: ICreateTransaction) {
    await transactionService.createTransaction(transaction);
  }

  return (
    <TransactionContext.Provider value={{ categories, fetchCategories, createTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}
