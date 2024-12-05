import React from "react";
import PlayerComponent from "../player/player.component";
import { PlayerListProps } from "@/interfaces/player.interface";

/**
 * PlayerList component displays a list of players in a responsive grid layout.
 * Each player is rendered using the PlayerComponent and is clickable to trigger the onSelectPlayer callback.
 *
 * @component
 * @param {PlayerListProps} props - The properties for the PlayerList component.
 * @param {Array<Player>} props.players - The list of players to display.
 * @param {function} props.onSelectPlayer - Callback function to handle player selection.
 *
 * @returns {JSX.Element} The rendered PlayerList component.
 */
const PlayerList: React.FC<PlayerListProps> = React.memo(
  ({ players, onSelectPlayer }) => {
    return (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-3 sm:pt-4 pt-2 sm:pb-4 pb-2">
        {players.map((player) => (
          <div
            key={player.username}
            onClick={() => onSelectPlayer(player)}
            className="cursor-pointer h-[85px] md:h-[120px] lg:h-[155px]"
          >
            <PlayerComponent player={player} />
          </div>
        ))}
      </div>
    );
  }
);

export default PlayerList;
