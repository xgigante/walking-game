import { Player } from "./player.interface";

export interface ModalAddPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlayer: (username: string) => void;
}
