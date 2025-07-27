import { colors } from '@/shared/colors';
import { MaterialIcons } from '@expo/vector-icons';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type AppButtonMode = 'fill' | 'outline';

interface AppButtonParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}

export function AppButton({
  children,
  mode = 'fill',
  iconName,
  ...rest
}: PropsWithChildren<AppButtonParams>) {
  const isFill = mode === 'fill';

  return (
    <TouchableOpacity
      className={clsx(
        'h-button w-full flex-row items-center rounded-xl px-5',
        iconName ? 'justify-between' : 'justify-center',
        {
          'bg-accent-brand': isFill,
          'border-accent-brand border-[1px] bg-none': !isFill,
        }
      )}
      {...rest}>
      <Text
        className={clsx('text-base', {
          'text-white': isFill,
          'text-accent-brand': !isFill,
        })}>
        {children}
      </Text>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isFill ? colors.white : colors['accent-brand']}
        />
      )}
    </TouchableOpacity>
  );
}
