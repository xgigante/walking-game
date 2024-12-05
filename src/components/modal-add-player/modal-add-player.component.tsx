import { players } from "@/data/players.data";
import { useAddPlayer } from "@/hooks/use-add-player.hook";
import { ModalAddPlayerProps } from "@/interfaces/modal.add-player.interface";
import Modal from "@/shared/modal/modal.component";
import React from "react";

import PlayerList from "../player/player-list.component";

const MODAL_TITLE = (
  <span>
    Choose <span className="font-extrabold">your player</span>
  </span>
);

/**
 * ModalAddPlayer component allows users to add a player to the game.
 *
 * @param {ModalAddPlayerProps} props - The properties for the ModalAddPlayer component.
 * @param {boolean} props.isOpen - Determines if the modal is open.
 * @param {() => void} props.onClose - Function to call when the modal is closed.
 *
 * @returns {JSX.Element} The rendered ModalAddPlayer component.
 */
const ModalAddPlayer: React.FC<ModalAddPlayerProps> = ({ isOpen, onClose }) => {
  const { setSelectedPlayer, handleSubmit } = useAddPlayer(onClose);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={MODAL_TITLE}
      onSubmit={handleSubmit}
      submitText="Save Changes"
    >
      <PlayerList players={players} onSelectPlayer={setSelectedPlayer} />
    </Modal>
  );
};

export default ModalAddPlayer;
