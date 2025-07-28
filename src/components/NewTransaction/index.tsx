import { ICreateTransaction } from '@/shared/interfaces/https/create-transaction-request';
import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '@/shared/colors';
import { useBottomSheetContext } from '@/context/bottomsheet.context';
import CurrencyInput from 'react-native-currency-input';
import { TransactionTypeSelector } from '../SelectType';
import { SelectorCategoryModal } from '../SelectorCategoryModal';
import { transactionSchema } from './schema';

import * as yup from 'yup';
import { AppButton } from '../AppButton';
import { ErrorMessage } from '../ErrorMessage';
import { useTransactionContext } from '@/context/transaction.context';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

type ValidationErrorsTypes = Record<keyof ICreateTransaction, string>;

export function NewTransaction() {
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();
  const { handlerError } = useErrorHandler();

  const [loading, setLoading] = useState(false);

  const [transaction, setTransaction] = useState<ICreateTransaction>({
    categoryId: 0,
    description: '',
    typeId: 0,
    value: 0,
  });

  const [validationErrors, setValidationErrors] = useState<ValidationErrorsTypes>();

  async function handleCreateTransaction() {
    try {
      setLoading(true);
      await transactionSchema.validate(transaction, { abortEarly: false });
      await createTransaction(transaction);
      closeBottomSheet();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errors = {} as ValidationErrorsTypes;

        error.inner.forEach((err) => {
          if (err.path) {
            errors[err.path as keyof ICreateTransaction] = err.message;
          } else {
            handlerError(error, 'Falha ao criar transação');
          }
        });

        setValidationErrors(errors);
      }
    } finally {
      setLoading(false);
    }
  }

  function setTransactionData(key: keyof ICreateTransaction, value: string | number) {
    setTransaction((prevData) => ({ ...prevData, [key]: value }));
  }

  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="w-full flex-row items-center justify-between"
        onPress={closeBottomSheet}>
        <Text className="text-xl font-bold text-white">Nova transação</Text>
        <MaterialIcons name="close" color={colors.gray[700]} size={20} />
      </TouchableOpacity>
      <View className="mb-8 mt-8 flex-1">
        <TextInput
          className="my-2 h-[50px] rounded-[6] bg-background-primary pl-4 text-lg text-white"
          placeholder="Descrição"
          placeholderTextColor={colors.gray[700]}
          value={transaction.description}
          onChangeText={(text) => setTransactionData('description', text)}
        />
        {validationErrors?.description && (
          <ErrorMessage>{validationErrors.description}</ErrorMessage>
        )}
        <CurrencyInput
          value={transaction.value}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          minValue={0}
          onChangeValue={(value) => setTransactionData('value', value ?? 0)}
          className="my-2 h-[50px] rounded-[6] bg-background-primary pl-4 text-lg text-white"
        />
        {validationErrors?.value && <ErrorMessage>{validationErrors.value}</ErrorMessage>}
        <SelectorCategoryModal
          selectedCategory={transaction.categoryId}
          onSelect={(categoryId) => setTransactionData('categoryId', categoryId)}
        />
        {validationErrors?.categoryId && <ErrorMessage>{validationErrors.categoryId}</ErrorMessage>}

        <TransactionTypeSelector
          typeId={transaction.typeId}
          setTransactionType={(typeId) => setTransactionData('typeId', typeId)}
        />
        {validationErrors?.typeId && <ErrorMessage>{validationErrors.typeId}</ErrorMessage>}
        <View className="my-4">
          <AppButton onPress={handleCreateTransaction}>
            {loading ? <ActivityIndicator color={colors.white} /> : 'Registar'}
          </AppButton>
        </View>
      </View>
    </View>
  );
}
