import { PlayerTableProps } from "@/interfaces/player-table.interface";
import React, { use, useCallback, useState } from "react";

import Cell from "./cell.component";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const PlayerTable: React.FC<PlayerTableProps> = ({ players }) => {
  // Redux hooks
  const width = useSelector((state: RootState) => state.game.width);
  const height = useSelector((state: RootState) => state.game.height);

  // Local state
  const [activePlayer, setActivePlayer] = useState<string | null>(null);

  // Handlers
  const handleSelectPlayer = useCallback((username: string) => {
    setActivePlayer(username);
  }, []);

  // Dynamic grid styles based on width and height
  const gridStyle = {
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
  };

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
            activePlayer={activePlayer}
            onSelectPlayer={handleSelectPlayer}
          />
        ))
      )}
    </div>
  );
};

export default PlayerTable;
