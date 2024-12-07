import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addPlayerFromApi } from "@/store/game.service";
import { setActivePlayer } from "@/store/game-slice";
import { AppDispatch } from "@/store";
import { Player } from "@/interfaces/player.interface";

/**
 * Custom hook to handle adding a player.
 *
 * This hook provides functionality to select a player, handle the submission
 * of the selected player, and manage the state related to adding a player.
 *
 * @param {() => void} onClose - A callback function to be called when the modal is closed.
 * @returns {{
 *   selectedPlayer: Player | undefined,
 *   setSelectedPlayer: React.Dispatch<React.SetStateAction<Player | undefined>>,
 *   handleSubmit: () => void
 * }} - An object containing the selected player, a function to set the selected player,
 * and a function to handle the submission of the selected player.
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
