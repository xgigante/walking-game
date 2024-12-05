import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/shared/modal/modal.component";
import { ModalCreateMapProps } from "@/interfaces/modal-create-map.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createGameFromApi } from "@/store/game.service";
import useWindowSize from "@/hooks/use-window-size";

const ModalCreateMap: React.FC<ModalCreateMapProps> = ({ isOpen, onClose }) => {
  // Local state
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);

  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Reset the width and height when the modal is opened
  const { width: windowWidth } = useWindowSize();
  useEffect(() => {
    if (!isOpen) return;
    if (windowWidth <= 768) {
      setWidth(5);
      setHeight(10);
    } else {
      setWidth(10);
      setHeight(7);
    }
  }, [isOpen, windowWidth]);

  // Handlers
  const handleSubmit = useCallback(() => {
    if (!width || !height || width < 1 || height < 1) {
      alert("The dimensions must be greater than or equal to 1.");
      return;
    }
    dispatch(createGameFromApi(width, height));
    onClose();
  }, [width, height, dispatch, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span>
          Create <span className="font-extrabold">Map</span>
        </span>
      }
      onSubmit={handleSubmit}
      submitText="Create"
    >
      <div className="pt-2 pb-2 sm:gap-2 gap-0 grid grid-cols-1 sm:grid-cols-2">
        {/* Input fields for width and height */}
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
