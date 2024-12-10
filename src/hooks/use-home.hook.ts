import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Player } from "@/interfaces/player.interface";
import { AppDispatch, RootState } from "@/store";
import { resetGame, setActivePlayer } from "@/store/game-slice";
import { deleteAllActiveUsers } from "@/store/game.service";

/**
 * Custom hook that provides functionality for managing the home state of the game.
 *
 * @returns {Object} An object containing the following properties:
 * - `players`: An array of `Player` objects representing the current players in the game.
 * - `resetGameHandler`: A function to reset the game by deleting all active users and dispatching the reset action.
 * - `selectPlayerHandler`: A function to set the active player by dispatching the appropriate action with the player's username.
 */
const useHome = () => {
  const dispatch = useDispatch<AppDispatch>();
  const players: Player[] = useSelector(
    (state: RootState) => state.game.players
  );

  const resetGameHandler = useCallback(async () => {
    await deleteAllActiveUsers(dispatch, players);
    dispatch(resetGame());
  }, [dispatch, players]);

  const selectPlayerHandler = useCallback(
    (player: Player) => dispatch(setActivePlayer(player.username)),
    [dispatch]
  );

  return {
    players,
    resetGameHandler,
    selectPlayerHandler,
  };
};

export default useHome;
