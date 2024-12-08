import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import PlayerInfoComponent from "./player-info.component";
import { PlayerProps, PlayerScenario } from "@/interfaces/player.interface";
import { usePlayer } from "@/hooks/use-player.hook";

/**
 * `PlayerComponent` is a memoized React functional component that renders a player card with dynamic styles and behaviors.
 *
 * @param {PlayerProps} props - The properties passed to the component.
 * @param {Player} props.player - The player object containing player details.
 * @param {PlayerScenario} [props.scenario=PlayerScenario.Default] - The scenario in which the player is being used.
 * @param {Function} props.onClick - The function to call when the player card is clicked.
 *
 * @returns {JSX.Element} The rendered player card component.
 */
const PlayerComponent: React.FC<PlayerProps> = React.memo(
  ({ player, scenario = PlayerScenario.Default, onClick }) => {
    const { title, username, color, image, playerNumber } = player;
    const { state, actions, computed } = usePlayer(player, scenario, onClick);

    const { isModalOpen, isSelected, isFooter, isTable, isDisabled } = state;
    const { handlePlayerClick, toggleModal, closeModal } = actions;

    const [isHovered, setIsHovered] = useState(false);

    const getContainerClasses = () =>
      [
        "relative w-full h-full flex flex-col items-center justify-between",
        "bg-dark-card sm:rounded-lg rounded-md bg-gradient-orange-alpha border-5-transparent",
        "transition duration-300",
        isFooter ? "cursor-default" : "cursor-pointer",
        isSelected ? "" : "border-dark-custom",
        isHovered || isSelected ? "shadow-card-player" : "",
        isTable || isFooter
          ? "border-4"
          : isHovered || isSelected
          ? "border-5"
          : "",
        !isFooter && !isTable
          ? "transform hover:scale-105 transition duration-300"
          : "",
      ].join(" ");

    const getImageClasses = () =>
      [
        "w-full bg-center bg-no-repeat bg-contain",
        isHovered || isSelected ? "opacity-100" : "opacity-40",
        isTable ? "h-full" : "h-3/4",
      ].join(" ");

    const getFooterTextClasses = () =>
      `font-medium text-white ${isFooter ? "text-xs" : "text-xs sm:text-lg"}`;

    const getFooterContainerClasses = () =>
      "w-full sm:h-1/4 h-1/3 flex items-center justify-center bg-dark-card rounded-b-lg";

    const getPlayerNumberClasses = () =>
      "font-inter text-xl sm:text-2xl absolute top right-2 font-extrabold";

    return (
      <>
        <div
          className={getContainerClasses()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={!isDisabled ? handlePlayerClick : undefined}
          style={{
            borderColor: isHovered || isSelected ? color : "",
            cursor: isDisabled ? "not-allowed" : "pointer",
            opacity: isDisabled ? 0.7 : 1,
          }}
          role="button"
        >
          {/* Player number */}
          {isSelected && !isTable && (
            <span className={getPlayerNumberClasses()} style={{ color }}>
              {isFooter ? playerNumber : `P${computed.players.length + 1}`}
            </span>
          )}

          {/* Player image */}
          <div
            className={getImageClasses()}
            style={{ backgroundImage: `url(${image?.src})` }}
            aria-hidden="true"
          ></div>

          {/* Footer text */}
          {!isTable && (
            <div className={getFooterContainerClasses()}>
              <span
                className={getFooterTextClasses()}
                dangerouslySetInnerHTML={{ __html: title || "" }}
              ></span>
              {isFooter && (
                <FaEllipsisV
                  className="absolute sm:bottom-2 bottom-3 sm:right-2 right-1.5 text-white cursor-pointer text-sm hover:text-gray-300"
                  onClick={toggleModal}
                />
              )}
            </div>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <PlayerInfoComponent username={username} onClick={closeModal} />
        )}
      </>
    );
  }
);

export default PlayerComponent;
