import { ModalEnum } from "@/interfaces/modal.interface";
import { useState } from "react";
import Modal from "../shared/modal/modal.component";

type ModalType = ModalEnum.CreateMap | ModalEnum.AddPlayer;

/**
 * Custom hook that provides functionality for managing modals in the application.
 *
 * @returns {Object} An object containing the following properties:
 * - `modals`: An object containing boolean values for each modal type.
 * - `openModal`: A function to open a modal by setting its corresponding value to `true`.
 * - `closeModal`: A function to close a modal by setting its corresponding value to `false`.
 */
export const useModal = () => {
  const [modals, setModals] = useState({
    createMap: false,
    addPlayer: false,
  });

  const openModal = (modal: ModalType) => {
    setModals((prevState) => ({ ...prevState, [modal]: true }));
  };

  const closeModal = (modal: ModalType) => {
    setModals((prevState) => ({ ...prevState, [modal]: false }));
  };

  return {
    modals,
    openModal,
    closeModal,
  };
};
