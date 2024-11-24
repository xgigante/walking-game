import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/components/shared/modal/modal.component";
import { ModalAddPlayerProps } from "@/interfaces/modal.add-player.interface";
import PlayerComponent from "../player/player.component";
import { players } from "@/data/players.data";
import { Player } from "@/interfaces/player.interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { addPlayerFromApi } from "@/store/game.service";
import { setActivePlayer } from "@/store/game-slice";

const ModalAddPlayer: React.FC<ModalAddPlayerProps> = ({ isOpen, onClose }) => {
  //Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Local state
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined
  );

  // Reset active player when modal is closed
  useEffect(() => {
    dispatch(setActivePlayer(""));
  }, [onClose, dispatch]);

  // Handlers
  const handleSubmit = useCallback(() => {
    if (selectedPlayer) {
      dispatch(addPlayerFromApi(selectedPlayer));
      onClose();
    } else {
      alert("Please select a player");
    }
  }, [selectedPlayer, onClose, dispatch]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span>
          Choose <span className="font-extrabold">your player</span>
        </span>
      }
      onSubmit={handleSubmit}
      submitText="Save Changes"
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 sm:pt-4 pt-2 sm:pb-4 pb-2">
        {/* Loop through the list of players and display them */}
        {players.map((player) => (
          <div
            key={player.username}
            onClick={() => setSelectedPlayer(player)}
            className={`cursor-pointer h-[85px] md:h-[120px] lg:h-[155px]`}
          >
            <PlayerComponent player={player} />
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ModalAddPlayer;
