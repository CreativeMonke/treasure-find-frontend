import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModal = () => {
  return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
  const [modalState, setModalState] = useState({
    isDeleteModalOpen: false,
    isExitModalOpen: false,
    isJoinModalOpen: false,
    isEditModalOpen: false,
    modalProps: {},
  });

  const openModal = (modalName, props = {}) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: true,
      modalProps: props,
    }));
  };

  const closeModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: false,
      modalProps: {},
    }));
  };

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
