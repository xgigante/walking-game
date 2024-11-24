import { Player } from "./player.interface";

export interface Position {
  row: number;
  column: number;
}

export interface GameState {
  width: number;
  height: number;
  players: Player[];
  activePlayer: string | null;
  movePlayerError: string | null;
}
