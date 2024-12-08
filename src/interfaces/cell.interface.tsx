import { Player } from "./player.interface";

export interface CellProps {
  row: number;
  col: number;
  players: Player[];
  activePlayerData: Player | null;
  onSelectPlayer: (username: string) => void;
}
