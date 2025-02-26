"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  closeModal: () => void;
  handleShowModalLogin: () => void;
  statusModal: string;
}

// Create ModalContext
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Define type for ModalProvider props
interface ModalProviderProps {
  children: ReactNode;
}

// Create provider component
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [statusModal, setStatusModal] = useState("");

  const closeModal = () => {
    setStatusModal("");
  };

  const handleShowModalLogin = () => {
    setStatusModal("login");
  };

  return (
    <ModalContext.Provider
      value={{
        closeModal,
        handleShowModalLogin,
        statusModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within an ModalProvider");
  }
  return context;
};
