import { TransactionTypes } from '@/shared/enums/transaction-types';
import { Text, TouchableOpacity, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { colors } from '@/shared/colors';

interface Prpos {
  setTransactionType: (type: TransactionTypes) => void;
  typeId?: number;
}

export function TransactionTypeSelector({ setTransactionType, typeId }: Prpos) {
  return (
    <View className="mt-2 flex-row justify-between gap-2">
      <TouchableOpacity
        className={clsx(
          'h-[58] flex-1 flex-row items-center justify-center rounded-lg p-2',
          typeId === TransactionTypes.REVENUE ? 'bg-accent-brand' : 'bg-background-tertiary'
        )}
        onPress={() => setTransactionType(TransactionTypes.REVENUE)}>
        <MaterialIcons
          name="arrow-circle-down"
          size={30}
          color={typeId === TransactionTypes.REVENUE ? colors.white : colors['accent-brand-light']}
          className="mr-2"
        />
        <Text className="font-bold text-white">Entrada</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={clsx(
          'h-[58] flex-1 flex-row items-center justify-center rounded-lg p-2',
          typeId === TransactionTypes.EXPENSE ? 'bg-accent-red' : 'bg-background-tertiary'
        )}
        onPress={() => setTransactionType(TransactionTypes.EXPENSE)}>
        <MaterialIcons
          name="arrow-circle-up"
          size={30}
          color={typeId === TransactionTypes.EXPENSE ? colors.white : colors['accent-red']}
          className="mr-2"
        />
        <Text className="font-bold text-white">Saída</Text>
      </TouchableOpacity>
    </View>
  );
}
