// src/components/Modal/Modal.tsx
import React from "react";
import PropTypes from "prop-types";
import { ModalProps } from "@/interfaces/modal.interface";

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText,
  showCancelButton = true,
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-lg">
        <div className="text-xl font-semibold text-center mb-4">{title}</div>
        <div className="mb-4">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={onSubmit}
          >
            {submitText}
          </button>
          {showCancelButton && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
              onClick={onClose}
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  showCancelButton: PropTypes.bool,
  cancelText: PropTypes.string,
};

export default Modal;
