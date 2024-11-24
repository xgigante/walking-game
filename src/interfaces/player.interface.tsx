import { StaticImageData } from "next/image";
import { Position } from "./game.interface";

export interface Player {
  username: string;
  position: Position & { row: number; column: number };
  positions: (Position & { row: number; column: number })[];
  color: string;
  image?: StaticImageData;
  title?: string;
  playerNumber?: string;
}

export interface PlayerProps {
  player: Player;
  scenario?: PlayerScenario;
  onClick?: () => void;
}

export interface PlayerInfoProps {
  username: string;
  onClick?: () => void;
}

export interface MovePlayer {
  username: string;
  operation: {
    operationType: number;
    path: string;
    op: string;
    from: string;
    value: Position;
  };
}

export interface MovePosition {
  username: string;
  operation: Position;
}

export enum PlayerScenario {
  Default = "default",
  InFooter = "inFooter",
  InTable = "inTable",
}
