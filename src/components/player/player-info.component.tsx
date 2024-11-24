import { PlayerInfoProps } from "@/interfaces/player.interface";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import Modal from "../shared/modal/modal.component";
import { deletePlayerFromAPI, statusPlayerFromApi } from "@/store/game.service";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Position } from "@/interfaces/game.interface";

// Helper function to convert position to move
const convertPositionToMove = (position: Position) => {
  const toColumnLetter = (num: number) => {
    let column = "";
    while (num >= 0) {
      column = String.fromCharCode((num % 26) + 65) + column;
      num = Math.floor(num / 26) - 1;
    }
    return column;
  };
  const columnLetter = toColumnLetter(position.column);
  const rowNumber = position.row + 1;
  return `${columnLetter}${rowNumber}`;
};

const PlayerInfoComponent: React.FC<PlayerInfoProps> = ({
  username,
  onClick,
}) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector((state: RootState) => state.game.players);
  const player = players.find((player) => player.username === username);

  // Local state
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Dispatch status update for player
  useEffect(() => {
    if (!username) return;
    dispatch(statusPlayerFromApi(username));
  }, [dispatch, username]);

  // Handlers
  const handleDeletePlayer = useCallback(() => {
    if (!player?.username) return;
    dispatch(deletePlayerFromAPI(player.username));
    setIsConfirmOpen(false);
    if (onClick) {
      onClick();
    }
  }, [dispatch, player, onClick]);

  // Memoize player moves to avoid re-calculation on every render
  const moves = useMemo(() => {
    return player?.positions.map(convertPositionToMove).join(", ") || "";
  }, [player]);

  // Show confirmation modal for deletion
  const confirmDelete = () => setIsConfirmOpen(true);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="w-80 sm:w-96 h-full max-h-96 shadow-card-modal bg-dark-card rounded-lg">
        <div className="relative w-full h-full max-h-96 flex flex-col items-center justify-between marker rounded-lg bg-gradient-purple-alpha">
          {/* Player image */}
          <div
            className="w-full h-full bg-center bg-no-repeat bg-contain rounded-md"
            style={{ backgroundImage: `url(${player?.image?.src})` }}
          ></div>

          <div className="w-full flex flex-col items-start bg-dark-card rounded-b-lg p-4">
            <div className="flex w-full">
              {/* Player title */}
              <span
                className="w-3/4 text-left text-xl sm:text-2xl text-white"
                dangerouslySetInnerHTML={{ __html: player?.title || "" }}
              ></span>
              <span className="w-1/4 text-right">
                {/* Delete button */}
                <button
                  className="bg-red-500 hover:bg-red-700 transition text-white px-4 py-2 rounded cursor-pointer"
                  onClick={confirmDelete}
                >
                  <AiFillDelete />
                </button>
              </span>
            </div>

            <div className="flex w-full">
              <div className="w-1/6 font-inter text-left text-sm sm:text-lg text-gray-300 mt-2">
                Steps:
              </div>
              <div className="w-5/6 font-inter text-left text-sm sm:text-lg text-gray-300 mt-2">
                {moves}
              </div>
            </div>
          </div>

          {/* Close button */}
          <AiOutlineClose
            className="absolute top-4 right-4 text-white cursor-pointer"
            onClick={onClick}
          />
        </div>
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && (
        <Modal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="Confirm Deletion"
          onSubmit={handleDeletePlayer}
          submitText="Delete"
        >
          <p className="text-gray-900 sm:pb-2 pb-4 sm:text-base text-xs">
            Are you sure you want to delete this player?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default PlayerInfoComponent;
