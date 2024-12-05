import React from "react";
import { ModalProps } from "@/interfaces/modal.interface";
import { AiOutlineClose } from "react-icons/ai";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className=" bg-white sm:rounded-lg rounded-md sm:p-4 p-2 shadow-lg relative w-2/4">
        <div className="flex justify-between items-center sm:mb-4 mb-0 ">
          <div className="xs:text-xs text-sm sm:text-2xl text-black sm:text-center text-left w-full font-semibold">
            {title}
          </div>
          <AiOutlineClose
            className="absolute sm:top-4 sm:right-4 top-2.5 right-2 text-black cursor-pointer sm:text-base text-xs"
            onClick={onClose}
          />
        </div>
        <div className="sm:mb-4 mb-0 text-black">{children}</div>
        <div className="flex sm:justify-end ">
          <button
            className="btn btn-primary transition sm:w-auto w-full"
            onClick={onSubmit}
          >
            {submitText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
