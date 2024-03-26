"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Modal = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalContext = createContext<Modal>({
  isOpen: false,
  setOpen: () => {},
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const { isOpen, setOpen } = useContext(ModalContext);
  return { isOpen, setOpen };
}