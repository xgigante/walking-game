import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayerFromAPI, statusPlayerFromApi } from "@/store/game.service";
import { AppDispatch, RootState } from "@/store";
import { Position } from "@/interfaces/game.interface";

/**
 * Custom hook to get player information.
 *
 * @param {string} username - The username of the player.
 * @param {Function} onClick - Function to call after deleting the player.
 *
 * @returns {Object} - An object containing the player information and handlers.
 * @returns {Object | undefined} player - The player object.
 * @returns {string} moves - The moves made by the player.
 * @returns {boolean} isConfirmOpen - Indicates if the confirmation dialog is open.
 * @returns {Function} setIsConfirmOpen - Function to set the confirmation dialog state.
 * @returns {Function} handleDeletePlayer - Function to delete the player.
 */
export const usePlayerInfo = (username: string, onClick?: () => void) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Local state
  const players = useSelector((state: RootState) => state.game.players);
  const player = players.find((player) => player.username === username);
  console.log(player);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Get player status from API
  useEffect(() => {
    if (username) {
      dispatch(statusPlayerFromApi(username));
    }
  }, [dispatch, username]);

  // Handle delete player
  const handleDeletePlayer = useCallback(() => {
    if (player?.username) {
      dispatch(deletePlayerFromAPI(player.username));
      setIsConfirmOpen(false);
      if (onClick) onClick();
    }
  }, [dispatch, player, onClick]);

  // Convert position to move
  const moves = useMemo(() => {
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

    return player?.positions.map(convertPositionToMove).join(", ") || "";
  }, [player]);

  return {
    player,
    moves,
    isConfirmOpen,
    setIsConfirmOpen,
    handleDeletePlayer,
  };
};
