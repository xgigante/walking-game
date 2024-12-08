// hooks/usePlayerTableLogic.ts
import { useCallback, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Player } from "@/interfaces/player.interface";
import { RootState } from "@/store";
import { PlayerTableProps } from "@/interfaces/player-table.interface";

/**
 * Custom hook to manage the player table state and interactions.
 *
 * @param {PlayerTableProps} props - The properties for the player table.
 * @param {Array<Player>} props.players - The list of players.
 * @returns {Object} The state and handlers for the player table.
 * @returns {number} width - The width of the game grid.
 * @returns {number} height - The height of the game grid.
 * @returns {string | null} activePlayer - The username of the currently active player.
 * @returns {Player | null} activePlayerData - The data of the currently active player.
 * @returns {Function} handleSelectPlayer - Handler to set the active player.
 * @returns {Object} gridStyle - The dynamic styles for the game grid.
 * @returns {string} gridStyle.gridTemplateColumns - The CSS grid template columns.
 * @returns {string} gridStyle.gridTemplateRows - The CSS grid template rows.
 */
export const usePlayerTable = ({ players }: PlayerTableProps) => {
  // Redux hooks
  const width = useSelector((state: RootState) => state.game.width);
  const height = useSelector((state: RootState) => state.game.height);

  // Local state
  const [activePlayer, setActivePlayer] = useState<string | null>(null);

  // Get the active player's data
  const activePlayerData = useMemo(
    () => players.find((player) => player.username === activePlayer) || null,
    [players, activePlayer]
  );

  // Handlers
  const handleSelectPlayer = useCallback((username: string) => {
    setActivePlayer(username);
  }, []);

  // Dynamic grid styles
  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${width}, 1fr)`,
      gridTemplateRows: `repeat(${height}, 1fr)`,
    }),
    [width, height]
  );

  return {
    width,
    height,
    activePlayer,
    activePlayerData,
    handleSelectPlayer,
    gridStyle,
  };
};
