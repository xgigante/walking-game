import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPlayerFromApi } from "@/store/game.service";
import { setActivePlayer } from "@/store/game-slice";
import { AppDispatch } from "@/store";
import { Player } from "@/interfaces/player.interface";

/**
 * Custom hook to add a player to the game.
 *
 * @param {Function} onClose - Function to call when the modal is closed.
 *
 * @returns {Object} - An object containing the selected player and a submit handler.
 * @returns {Object | undefined} selectedPlayer - The selected player object.
 * @returns {Function} setSelectedPlayer - Function to set the selected player.
 * @returns {Function} handleSubmit - Function to handle the submission of the player.
 */
export const useAddPlayer = (onClose: () => void) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Local state
  const [selectedPlayer, setSelectedPlayer] = useState<Player | undefined>(
    undefined
  );

  // Reset the active player when the modal is closed
  useEffect(() => {
    dispatch(setActivePlayer(""));
  }, [onClose, dispatch]);

  // Handle submission
  const handleSubmit = useCallback(() => {
    if (selectedPlayer) {
      dispatch(addPlayerFromApi(selectedPlayer));
      onClose();
    } else {
      alert("Please select a player");
    }
  }, [selectedPlayer, onClose, dispatch]);

  return {
    selectedPlayer,
    setSelectedPlayer,
    handleSubmit,
  };
};
