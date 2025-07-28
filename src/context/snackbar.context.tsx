import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type SnackbarMessageType = 'ERROR' | 'SUCCESS';

interface NotifyMessageParams {
  message: string;
  messageType: SnackbarMessageType;
}

export type SnackbarContextType = {
  message: string | null;
  type: SnackbarMessageType | null;
  notify: (params: NotifyMessageParams) => void;
};

const SnackbarContext = createContext({} as SnackbarContextType);

export function SnackbarContextProvider({ children }: PropsWithChildren) {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackbarMessageType | null>(null);

  function notify({ message, messageType }: NotifyMessageParams) {
    setMessage(message);
    setType(messageType);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  }

  return (
    <SnackbarContext.Provider value={{ message, type, notify }}>
      {children}
    </SnackbarContext.Provider>
  );
}

export function useSnacbarContext() {
  const context = useContext(SnackbarContext);
  return context;
}
