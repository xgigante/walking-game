import React from "react";
import { PlayerTableProps } from "@/interfaces/player-table.interface";
import Cell from "./cell.component";
import { usePlayerTable } from "@/hooks/use-player-table.hook";

/**
 * PlayerTable component renders a grid of player cells.
 *
 * @component
 * @param {PlayerTableProps} props - The properties for the PlayerTable component.
 * @param {Array} props.players - The list of players to be displayed in the table.
 *
 * @returns {JSX.Element} The rendered PlayerTable component.
 */
const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  const { width, height, activePlayerData, handleSelectPlayer, gridStyle } =
    usePlayerTable({ players });

  return (
    <div
      className="grid gap-0.5 w-full h-full border-transparent border-2 border-solid"
      style={gridStyle}
    >
      {/* Generate the grid cells */}
      {Array.from({ length: height }).map((_, row) =>
        Array.from({ length: width }).map((_, col) => (
          <Cell
            key={`${row}-${col}`}
            row={row}
            col={col}
            players={players}
            activePlayerData={activePlayerData}
            onSelectPlayer={handleSelectPlayer}
          />
        ))
      )}
    </div>
  );
};

export default PlayerTable;
