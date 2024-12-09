import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { movePlayerFromApi } from "@/store/game.service";
import { setActivePlayer } from "@/store/game-slice";
import { Player } from "@/interfaces/player.interface";
import { AppDispatch } from "@/store";
import { CellProps } from "@/interfaces/cell.interface";

/**
 * Custom hook to handle cell logic.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.row - The row index of the cell.
 * @param {number} props.col - The column index of the cell.
 * @param {Array} props.players - The list of players.
 * @param {Object} props.activePlayerData - The data of the active player.
 * @param {Function} props.onSelectPlayer - Callback function to handle player selection.
 *
 * @returns {Object} - An object containing the cell logic.
 * @returns {Object | undefined} playerInCell - The player in the cell.
 * @returns {Object | undefined} playerInHistory - The player in the history.
 * @returns {boolean} isAdjacent - Indicates if the cell is adjacent to the active player.
 * @returns {Function} handleClick - Function to handle cell click.
 */
export const useCell = ({
  row,
  col,
  players,
  activePlayerData,
  onSelectPlayer,
}: CellProps) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // UseMemo to combine the logic for finding a player in the cell or history
  const { playerInCell, playerInHistory } = useMemo(() => {
    const playerInCell = players.find(
      (player) => player.position.row === row && player.position.column === col
    );

    const playerInHistory = players.find((player) =>
      player.positions.some((pos) => pos.row === row && pos.column === col)
    );

    return { playerInCell, playerInHistory };
  }, [players, row, col]);

  // Determine if the current cell is adjacent to the active player's position.
  const isAdjacent = useMemo(() => {
    if (!activePlayerData) return false;
    const currentRow = activePlayerData.position.row;
    const currentCol = activePlayerData.position.column;
    return (
      (row === currentRow && Math.abs(col - currentCol) === 1) ||
      (col === currentCol && Math.abs(row - currentRow) === 1)
    );
  }, [row, col, activePlayerData]);

  // Move player logic
  const movePlayer = async () => {
    if (!activePlayerData || playerInCell) return;

    const operation = {
      operationType: 0,
      path: "/Position",
      op: "replace",
      from: "string",
      value: { Row: row, Column: col },
    };

    await dispatch(movePlayerFromApi(activePlayerData.username, operation));
    dispatch(setActivePlayer(activePlayerData.username));
  };

  const handleClick = async () => {
    await movePlayer();
    if (playerInCell) {
      onSelectPlayer(playerInCell.username);
    }
  };

  return {
    playerInCell,
    playerInHistory,
    isAdjacent,
    handleClick,
  };
};
