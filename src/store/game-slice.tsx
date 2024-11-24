import { GameState, Position } from "@/interfaces/game.interface";
import { MovePosition, Player } from "@/interfaces/player.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: GameState = {
  width: 0,
  height: 0,
  players: [],
  activePlayer: null,
  movePlayerError: null,
};

/**
 * A slice for managing the state of the game.
 *
 * @remarks
 * This slice includes actions for creating a game, adding and deleting players,
 * resetting the game, updating the status of the game and players, moving players,
 * setting the active player, and handling move player errors.
 *
 * @example
 * // Example usage:
 * dispatch(createGame({ width: 10, height: 10 }));
 * dispatch(addPlayer({ username: 'player1', position: { row: 0, column: 0 }, positions: [] }));
 * dispatch(deletePlayer({ username: 'player1' }));
 * dispatch(resetGame());
 * dispatch(statusGame({ currentPlayers: 1, players: [{ username: 'player1', position: { row: 0, column: 0 }, positions: [] }] }));
 * dispatch(statusPlayer({ username: 'player1', position: { row: 0, column: 0 }, positions: [] }));
 * dispatch(movePlayer({ username: 'player1', operation: { row: 1, column: 1 } }));
 * dispatch(setActivePlayer('player1'));
 * dispatch(setMovePlayerError("Error moving player"));
 */

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    createGame: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    addPlayer: (state, action: PayloadAction<Player>) => {
      state.players.push(action.payload);
    },
    deletePlayer: (state, action: PayloadAction<{ username: string }>) => {
      state.players = state.players.filter(
        (p) => p.username !== action.payload.username
      );
    },
    resetGame: (state) => {
      state.width = 0;
      state.height = 0;
      state.players = [];
    },
    statusGame: (
      state,
      action: PayloadAction<{ currentPlayers: number; players: Player[] }>
    ) => {
      state.players = action.payload.players;
    },
    statusPlayer: (state, action: PayloadAction<Player>) => {
      const playerIndex = state.players.findIndex(
        (p) => p.username === action.payload.username
      );
      if (playerIndex !== -1) {
        state.players[playerIndex] = action.payload;
      }
    },
    movePlayer: (state, action: PayloadAction<MovePosition>) => {
      const playerIndex = state.players.findIndex(
        (p) => p.username === action.payload.username
      );
      if (playerIndex !== -1) {
        state.players.forEach((player, index) => {
          if (index !== playerIndex) {
            player.positions = player.positions.filter(
              (pos) =>
                !(
                  pos.row === action.payload.operation.row &&
                  pos.column === action.payload.operation.column
                )
            );
          }
        });
        state.players[playerIndex].position = action.payload.operation;
        state.players[playerIndex].positions.push(action.payload.operation);
      }
    },
    setActivePlayer: (state, action: PayloadAction<string | null>) => {
      state.activePlayer = action.payload;
    },
    setMovePlayerError: (state, action: PayloadAction<string | null>) => {
      state.movePlayerError = action.payload;
    },
    removeAllActiveUsers(state) {
      state.players = [];
    },
  },
});

export const {
  createGame,
  addPlayer,
  movePlayer,
  deletePlayer,
  resetGame,
  statusGame,
  statusPlayer,
  setActivePlayer,
  setMovePlayerError,
  removeAllActiveUsers,
} = gameSlice.actions;
export default gameSlice.reducer;
