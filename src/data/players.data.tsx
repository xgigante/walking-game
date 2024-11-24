import { Player } from "@/interfaces/player.interface";
import player1Image from "@/assets/images/player1.png";
import player2Image from "@/assets/images/player2.png";
import player3Image from "@/assets/images/player3.png";
import player4Image from "@/assets/images/player4.png";
import player5Image from "@/assets/images/player5.png";
import player6Image from "@/assets/images/player6.png";

export const players: Player[] = [
  {
    title: "K. <span class='font-extrabold'>Blaze</span>",
    username: "Player1",
    position: { row: 0, column: 0 },
    positions: [{ row: -1, column: -1 }],
    color: "#FF0000",
    image: player1Image,
    playerNumber: "P1",
  },
  {
    title: "S. <span class='font-extrabold'>Frost</span>",
    username: "Player2",
    position: { row: -1, column: -1 },
    positions: [{ row: -1, column: -1 }],
    color: "#00FF00",
    image: player2Image,
    playerNumber: "P2",
  },
  {
    title: "N. <span class='font-extrabold'>Viper</span>",
    username: "Player3",
    position: { row: -1, column: -1 },
    positions: [{ row: -1, column: -1 }],
    color: "#0000FF",
    image: player3Image,
    playerNumber: "P3",
  },
  {
    title: "A. <span class='font-extrabold'>Shadow</span>",
    username: "Player4",
    position: { row: -1, column: -1 },
    positions: [{ row: -1, column: -1 }],
    color: "#FFFF00",
    image: player4Image,
    playerNumber: "P4",
  },
  {
    title: "H. <span class='font-extrabold'>Raven</span>",
    username: "Player5",
    position: { row: -1, column: -1 },
    positions: [{ row: -1, column: -1 }],
    color: "#FF00FF",
    image: player5Image,
    playerNumber: "P5",
  },
  {
    title: "G. <span class='font-extrabold'>Bolt</span>",
    username: "Player6",
    position: { row: -1, column: -1 },
    positions: [{ row: -1, column: -1 }],
    color: "#00FFFF",
    image: player6Image,
    playerNumber: "P6",
  },
];
