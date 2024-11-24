import axios from "axios";
import {
  createGame,
  addPlayer,
  deletePlayer,
  statusGame,
  statusPlayer,
  movePlayer,
  setMovePlayerError,
  removeAllActiveUsers,
} from "./game-slice";
import { Player } from "@/interfaces/player.interface";
import { Dispatch } from "@reduxjs/toolkit";
import store from "./index";
import { AppDispatch } from "./index";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const playerNumber = (): string => {
  const state = store.getState();
  const players = state.game.players;
  return "P" + (players.length + 1);
};

/**
 * Creates a new game by making an API call with the specified width and height.
 * Dispatches the createGame action with the provided dimensions upon successful response.
 * @param {number} width - The width of the game.
 * @param {number} height - The height of the game.
 */
export const createGameFromApi =
  (width: number, height: number) => async (dispatch: AppDispatch) => {
    try {
      console.log("API Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
      const response = await api.post("/game", { width, height });
      dispatch(createGame({ width, height }));
      console.log("Game started:", response.data);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

/**
 * Adds a player to the game by making an API call and dispatching the result.
 *
 * @param {Player} selectedPlayer - The player to be added.
 */
export const addPlayerFromApi =
  (selectedPlayer: Player) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.post("/player", {
        username: selectedPlayer.username,
      });
      dispatch(
        addPlayer({
          username: selectedPlayer.username,
          position: response.data.position,
          positions: [response.data.position],
          color: selectedPlayer.color,
          image: selectedPlayer.image,
          title: selectedPlayer.title,
          playerNumber: playerNumber(),
        })
      );
      console.log("Player added:", response.data);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

/**
 * Deletes a player from the API and dispatches the deletePlayer action
 * @param {string} username - The username of the player to delete.
 */
export const deletePlayerFromAPI =
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.delete("/player", {
        data: { username },
      });
      dispatch(deletePlayer({ username }));
      console.log("Player deleted:", response.data);
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

/**
 * Fetches the game status from the API and dispatches the status to the store.
 */
export const statusGameFromApi = () => async (dispatch: AppDispatch) => {
  try {
    const response = await api.get("/game");
    dispatch(statusGame(response.data));
    console.log("Game status loaded:", response.data);
  } catch (error) {
    console.error("Error loading game status:", error);
  }
};

/**
 * Fetches the status of a player from the API and dispatches the status to the store.
 * @param {string} username - The username of the player whose status is to be fetched.
 */
export const statusPlayerFromApi =
  (username: string) => async (dispatch: AppDispatch) => {
    try {
      const response = await api.get(`/player`, {
        params: { username },
      });
      dispatch(statusPlayer(response.data));
      console.log("Player status loaded:", response.data);
    } catch (error) {
      console.error("Error loading player status:", error);
    }
  };

/**
 * Moves the player by sending a patch request to the API with the specified operation.
 * @param username - The username of the player to move.
 * @param operation - The operation details to move the player.
 * @param operation.operationType - The type of operation to perform.
 * @param operation.path - The path of the operation.
 * @param operation.op - The operation to perform.
 * @param operation.from - The source of the operation.
 * @param operation.value - The new position of the player.
 * @param operation.value.Row - The new row position of the player.
 * @param operation.value.Column - The new column position of the player.
 * @returns A thunk action that dispatches the movePlayer action with the updated player position or sets an error message if the operation fails.
 */
export const movePlayerFromApi =
  (
    username: string,
    operation: {
      operationType: number;
      path: string;
      op: string;
      from: string;
      value: { Row: number; Column: number };
    }
  ) =>
  async (dispatch: AppDispatch) => {
    try {
      const response = await api.patch(`/player/${username}`, [operation]);
      dispatch(movePlayer({ username, operation: response.data.position }));
      console.log("Player moved:", response.data);
    } catch (error) {
      // Dispatch an action to set an error message when there is an error moving the player
      dispatch(setMovePlayerError("Error moving player"));
    }
  };

/**
 * Deletes all active users by calling the API for each player and then dispatching an action to remove all active users.
 * @param {Dispatch} dispatch - The dispatch function to trigger actions in the store.
 * @param {Player[]} players - An array of Player objects representing the active users to be deleted.
 */
export const deleteAllActiveUsers = async (
  dispatch: AppDispatch,
  players: Player[]
) => {
  if (!players || players.length === 0) {
    console.log("No active players to delete.");
    return;
  }
  for (const player of players) {
    await dispatch(deletePlayerFromAPI(player.username));
  }
  dispatch(removeAllActiveUsers());
};
