import { useSnacbarContext } from '@/context/snackbar.context';
import { AppError } from '../helpers/AppError';

export function useErrorHandler() {
  const { notify } = useSnacbarContext();

  function handlerError(error: unknown, defaultMessage?: string) {
    const isAppError = error instanceof AppError;

    const message = isAppError ? error.message : (defaultMessage ?? 'Falha na requisição');

    notify({
      message,
      messageType: 'ERROR',
    });
  }
  return {
    handlerError,
  };
}
