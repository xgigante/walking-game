import React, { useCallback, useState } from "react";
import Modal from "@/components/shared/modal/modal.component";
import { ModalAddPlayerProps } from "@/interfaces/modal.add-player.interface";

const ModalAddPlayer: React.FC<ModalAddPlayerProps> = ({
  isOpen,
  onClose,
  onAddPlayer,
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState<string>("");

  const players = [
    {
      username: "Player1",
      position: { row: -1, column: -1 },
      path: [{ row: -1, column: -1 }],
    },
    {
      username: "Player2",
      position: { row: -1, column: -1 },
      path: [{ row: -1, column: -1 }],
    },
    {
      username: "Player3",
      position: { row: -1, column: -1 },
      path: [{ row: -1, column: -1 }],
    },
    {
      username: "Player4",
      position: { row: -1, column: -1 },
      path: [{ row: -1, column: -1 }],
    },
    {
      username: "Player5",
      position: { row: -1, column: -1 },
      path: [{ row: -1, column: -1 }],
    },
    {
      username: "Player6",
      position: { row: -1, column: -1 },
      path: [{ row: -1, column: -1 }],
    },
  ];

  const handleSubmit = useCallback(() => {
    if (selectedPlayer) {
      onAddPlayer(selectedPlayer);
      onClose();
    } else {
      alert("Please select a player");
    }
  }, [selectedPlayer, onAddPlayer, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Player"
      onSubmit={handleSubmit}
      submitText="Add"
    >
      <div>
        <label>
          Select Player:
          <select
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <option value="">Select a player</option>
            {players.map((player, index) => (
              <option key={index} value={player.username}>
                {player.username}
              </option>
            ))}
          </select>
        </label>
      </div>
    </Modal>
  );
};

export default ModalAddPlayer;
