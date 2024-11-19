import React, { useState } from "react";
import Modal from "@/components/shared/modal/modal.component";
import { ModalCreateMapProps } from "@/interfaces/modal-create-map.interface";

const ModalCreateMap: React.FC<ModalCreateMapProps> = ({
  isOpen,
  onClose,
  onCreateMap,
}) => {
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);

  const handleSubmit = () => {
    if (width >= 1 && height >= 1) {
      onCreateMap({ width, height });
      onClose();
    } else {
      alert("Las dimensiones deben ser mayores o iguales a 1");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Mapa"
      onSubmit={handleSubmit}
      submitText="Crear"
    >
      <label>
        Ancho:
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </label>
      <label>
        Alto:
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </label>
    </Modal>
  );
};

export default ModalCreateMap;
