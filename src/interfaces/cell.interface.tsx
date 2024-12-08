import { Player } from "./player.interface";
import { setActivePlayer } from "@/store/game-slice";

export interface CellProps {
  row: number;
  col: number;
  players: Player[];
  activePlayer: string | null;
  activePlayerData: Player | null;
  onSelectPlayer: (username: string) => void;
}
