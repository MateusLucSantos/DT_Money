import { useTransactionContext } from '@/context/transaction.context';
import clsx from 'clsx';
import Checkbox from 'expo-checkbox';
import { useMemo, useState } from 'react';
import {
  FlatList,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface Props {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

export function SelectorCategoryModal({ selectedCategory, onSelect }: Props) {
  const [showModal, setShowModal] = useState(false);

  const { categories } = useTransactionContext();

  function handleModal() {
    setShowModal((prevState) => !prevState);
  }

  function handleSelect(categoryId: number) {
    onSelect(categoryId);
    setShowModal(false);
  }

  const selected = useMemo(
    () => categories.find(({ id }) => id === selectedCategory),
    [categories, selectedCategory]
  );
  return (
    <>
      <TouchableOpacity
        className="my-2 h-[50] justify-center rounded-[6] bg-background-primary"
        onPress={handleModal}>
        <Text className={clsx('pl-4 text-lg', selected ? 'text-white' : 'text-gray-700')}>
          {selected?.name ?? 'Categorias'}
        </Text>
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={handleModal}>
          <View className="flex-1 items-center justify-center bg-black/50">
            <View className="w-[90%] rounded-xl bg-background-secondary p-4">
              <Text className="mb-4 text-lg text-white">Selecione uma categoria</Text>
              <FlatList
                keyExtractor={(item) => `category-${item.id}`}
                data={categories}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="mb-2 flex-row items-center rounded-lg bg-gray-800 p-3"
                    onPress={() => handleSelect(item.id)}>
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => handleSelect(item.id)}
                      className="mr-2"
                    />
                    <Text className="text-lg text-white">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
