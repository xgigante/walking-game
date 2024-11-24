import { Player } from "./player.interface";

export interface CellProps {
  row: number;
  col: number;
  players: Player[];
  activePlayer: string | null;
  onSelectPlayer: (username: string) => void;
}
