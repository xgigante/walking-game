import backgroundImage from "@/assets/images/earth.png";
import { CellProps } from "@/interfaces/cell.interface";
import { Player, PlayerScenario } from "@/interfaces/player.interface";
import { AppDispatch, RootState } from "@/store";
import { movePlayerFromApi } from "@/store/game.service";
import { setActivePlayer } from "@/store/game-slice";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import PlayerComponent from "../player/player.component";

const Cell: React.FC<CellProps> = ({
  row,
  col,
  players,
  activePlayer,
  onSelectPlayer,
}) => {
  //Redux hooks
  const dispatch = useDispatch<AppDispatch>();

  // Get the data for the active player
  const activePlayerData = players.find(
    (player) => player.username === activePlayer
  );

  // Combine the search for both the player in the cell and player in history into one useMemo.
  const { playerInCell, playerInHistory } = useMemo(() => {
    let playerInCell: Player | undefined;
    let playerInHistory: Player | undefined;

    players.forEach((player) => {
      if (
        !playerInCell &&
        player.position.row === row &&
        player.position.column === col
      ) {
        playerInCell = player;
      }
      if (
        !playerInHistory &&
        player.positions.some((pos) => pos.row === row && pos.column === col)
      ) {
        playerInHistory = player;
      }
    });

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

  // Dynamic style based on player presence and history
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

  // Function to move the active player to the target cell
  const movePlayer = async () => {
    if (!activePlayer || playerInCell) return;

    const operation = {
      operationType: 0,
      path: "/Position",
      op: "replace",
      from: "string",
      value: { Row: row, Column: col },
    };

    await dispatch(movePlayerFromApi(activePlayer, operation));
    dispatch(setActivePlayer(activePlayer));
  };

  // Handlers
  const handleClick = async () => {
    await movePlayer();
    if (playerInCell) {
      onSelectPlayer(playerInCell.username);
    }
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
      {/* Render player component if there's a player in the cell */}
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
