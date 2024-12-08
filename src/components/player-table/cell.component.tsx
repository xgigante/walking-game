import backgroundImage from "@/assets/images/earth.png";
import { useCell } from "@/hooks/use-cell.hook";
import { CellProps } from "@/interfaces/cell.interface";
import { PlayerScenario } from "@/interfaces/player.interface";
import React from "react";

import PlayerComponent from "../player/player.component";

/**
 * Component to render a cell in the player table.
 *
 * @param {Object} props - The component props.
 * @param {number} props.row - The row index of the cell.
 * @param {number} props.col - The column index of the cell.
 * @param {Array} props.players - The list of players.
 * @param {Object} props.activePlayerData - The data of the active player.
 * @param {Function} props.onSelectPlayer - Callback function to handle player selection.
 *
 * @returns {JSX.Element} - The cell component.
 */
const Cell: React.FC<CellProps> = ({
  row,
  col,
  players,
  activePlayerData,
  onSelectPlayer,
}) => {
  const { playerInCell, playerInHistory, isAdjacent, handleClick } = useCell({
    row,
    col,
    players,
    activePlayerData,
    onSelectPlayer,
  });
  const cellStyle = {
    backgroundImage: playerInCell ? undefined : `url(${backgroundImage.src})`,
    borderColor: playerInCell
      ? playerInCell.color
      : playerInHistory
      ? playerInHistory.color
      : undefined,
    borderWidth: playerInCell ? undefined : playerInHistory ? "4px" : undefined,
    borderRadius: playerInHistory ? "8px" : undefined,
  };

  return (
    <div
      key={`${row}-${col}`}
      className={`relative w-full h-full cursor-pointer bg-cover bg-center border-solid ${
        playerInCell || !isAdjacent
          ? ""
          : "hover:opacity-50 transition-opacity duration-300"
      }`}
      style={cellStyle}
      onClick={handleClick}
    >
      {playerInCell && (
        <PlayerComponent
          player={playerInCell}
          scenario={PlayerScenario.InTable}
        />
      )}
    </div>
  );
};

export default Cell;
