import { PlayerTableProps } from "@/interfaces/player-table.interface";
import { RootState } from "@/store";
import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";

/**
 * Custom hook to handle player table logic.
 *
 * @param {Object} props - The properties object.
 * @param {Array} props.players - The list of players.
 *
 * @returns {Object} - An object containing the player table logic.
 * @returns {number} width - The width of the game board.
 * @returns {number} height - The height of the game board.
 * @returns {Object | null} activePlayerData - The data of the active player.
 * @returns {Function} handleSelectPlayer - Function to handle player selection.
 * @returns {Object} gridStyle - The grid styles.
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
    activePlayerData,
    handleSelectPlayer,
    gridStyle,
  };
};
