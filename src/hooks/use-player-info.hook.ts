import { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePlayerFromAPI, statusPlayerFromApi } from "@/store/game.service";
import { AppDispatch, RootState } from "@/store";
import { Position } from "@/interfaces/game.interface";

export const usePlayerInfo = (username: string, onClick?: () => void) => {
  const dispatch = useDispatch<AppDispatch>();
  const players = useSelector((state: RootState) => state.game.players);
  const player = players.find((player) => player.username === username);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    if (username) {
      dispatch(statusPlayerFromApi(username));
    }
  }, [dispatch, username]);

  const handleDeletePlayer = useCallback(() => {
    if (player?.username) {
      dispatch(deletePlayerFromAPI(player.username));
      setIsConfirmOpen(false);
      if (onClick) onClick();
    }
  }, [dispatch, player, onClick]);

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
