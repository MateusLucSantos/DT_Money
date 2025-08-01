import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRef, useState } from 'react';

import clsx from 'clsx';

import { colors } from '@/shared/colors';
import { ErrorMessage } from '../ErrorMessage';

interface AppInputParams<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}
export function AppInput<T extends FieldValues>({
  control,
  name,
  label,
  leftIconName,
  secureTextEntry,
  ...rest
}: AppInputParams<T>) {
  const [isFocused, setIsFocused] = useState(false);
  const [showText, setShowText] = useState(secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(inputRef.current.isFocused());
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <View className="mt-4 w-full">
            {label && (
              <Text
                className={clsx(
                  'mb-2 mt-3 text-base',
                  isFocused ? 'text-accent-brand' : 'text-gray-600'
                )}>
                {label}
              </Text>
            )}
            <TouchableOpacity className="h-16 flex-row items-center justify-between border-b-[1px] border-gray-600 px-3 py-2">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  color={isFocused ? colors['accent-brand'] : colors.gray[600]}
                  size={24}
                  className="mr-2"
                />
              )}
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholderTextColor={colors.gray[700]}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                secureTextEntry={showText}
                className="flex-1 text-base text-gray-500"
                ref={inputRef}
                {...rest}
              />
              {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowText((value) => !value)}>
                  <MaterialIcons
                    name={showText ? 'visibility' : 'visibility-off'}
                    color={colors.gray[600]}
                    size={24}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </View>
        );
      }}
    />
  );
}
