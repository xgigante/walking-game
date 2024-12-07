import useCreateMap from "@/hooks/use-create-map.hook";
import { ModalCreateMapProps } from "@/interfaces/modal-create-map.interface";
import Modal from "@/shared/modal/modal.component";
import React, { useCallback, useEffect, useState } from "react";

const MODAL_TITLE = (
  <span>
    Create <span className="font-extrabold">Map</span>
  </span>
);

/**
 * ModalCreateMap component allows users to create a new map by specifying the number of columns and rows.
 *
 * @component
 * @param {ModalCreateMapProps} props - The properties for the ModalCreateMap component.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {() => void} props.onClose - Function to close the modal.
 *
 * @returns {JSX.Element} The rendered ModalCreateMap component.
 */
const ModalCreateMap: React.FC<ModalCreateMapProps> = ({ isOpen, onClose }) => {
  const { width, height, setWidth, setHeight, handleSubmit } = useCreateMap({
    isOpen,
    onClose,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={MODAL_TITLE}
      onSubmit={handleSubmit}
      submitText="Create"
    >
      <div className="pt-2 pb-2 sm:gap-2 gap-0 grid grid-cols-1 sm:grid-cols-2">
        <div className="form-group">
          <label className="label-generic">Columns:</label>
          <input
            type="number"
            value={width ?? ""}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="input-generic"
            min="1"
          />
        </div>
        <div className="form-group">
          <label className="label-generic">Rows:</label>
          <input
            type="number"
            value={height ?? ""}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="input-generic"
            min="1"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCreateMap;
