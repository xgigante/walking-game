import React from "react";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import Modal from "@/shared/modal/modal.component";
import { PlayerInfoProps } from "@/interfaces/player.interface";
import { usePlayerInfo } from "@/hooks/use-player-info.hook";

/**
 * PlayerInfoComponent is a React functional component that displays player information
 * in a modal. It shows the player's image, title, and number of moves. It also provides
 * a delete button to remove the player and a close button to close the modal.
 *
 * @param {PlayerInfoProps} props - The properties passed to the component.
 * @param {string} props.username - The username of the player.
 * @param {() => void} props.onClick - The function to call when the close button is clicked.
 *
 * @returns {JSX.Element} The rendered component.
 */
const PlayerInfoComponent: React.FC<PlayerInfoProps> = ({
  username,
  onClick,
}) => {
  const { player, moves, isConfirmOpen, setIsConfirmOpen, handleDeletePlayer } =
    usePlayerInfo(username, onClick);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-80 sm:w-96 h-full max-h-96 shadow-card-modal bg-dark-card rounded-lg">
        <div className="relative w-full h-full max-h-96 flex flex-col items-center justify-between marker rounded-lg bg-gradient-purple-alpha">
          <div
            className="w-full h-full bg-center bg-no-repeat bg-contain rounded-md"
            style={{ backgroundImage: `url(${player?.image?.src})` }}
          ></div>

          <div className="w-full flex flex-col items-start bg-dark-card rounded-b-lg p-4">
            <div className="flex w-full">
              <span
                className="w-3/4 text-left text-xl sm:text-2xl text-white"
                dangerouslySetInnerHTML={{ __html: player?.title || "" }}
              ></span>
              <span className="w-1/4 text-right">
                <button
                  className="bg-red-500 hover:bg-red-700 transition text-white px-4 py-2 rounded cursor-pointer"
                  onClick={() => setIsConfirmOpen(true)}
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
          <AiOutlineClose
            className="absolute top-4 right-4 text-white cursor-pointer"
            onClick={onClick}
          />
        </div>
      </div>
      {isConfirmOpen && (
        <Modal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          title="Confirm Deletion"
          onSubmit={handleDeletePlayer}
          submitText="Delete"
        >
          <p className="text-gray-900 sm:pb-2 pb-4 pt-3 sm:text-base text-xs">
            Are you sure you want to delete this player?
          </p>
        </Modal>
      )}
    </div>
  );
};

export default PlayerInfoComponent;
