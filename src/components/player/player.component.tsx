import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEllipsisV } from "react-icons/fa";
import PlayerInfoComponent from "./player-info.component";
import { setActivePlayer } from "@/store/game-slice";
import { AppDispatch, RootState } from "@/store";
import { PlayerProps, PlayerScenario } from "@/interfaces/player.interface";

const PlayerComponent: React.FC<PlayerProps> = React.memo(
  ({ player, scenario = PlayerScenario.Default, onClick }) => {
    const { title, username, color, image, playerNumber } = player;

    // Redux hooks
    const dispatch = useDispatch<AppDispatch>();
    const activePlayer = useSelector(
      (state: RootState) => state.game.activePlayer
    );
    const players = useSelector((state: RootState) => state.game.players);

    // Local state
    const [isHovered, setIsHovered] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Computed properties
    const isSelected = activePlayer === username;
    const isFooter = scenario === PlayerScenario.InFooter;
    const isTable = scenario === PlayerScenario.InTable;
    const playerExist = players.some((p) => p.username === username);
    const isDisabled = !isTable && !isFooter && playerExist;

    // Handlers
    const handlePlayerClick = useCallback(() => {
      if (!isFooter) {
        dispatch(setActivePlayer(username));
        onClick?.();
      }
    }, [isFooter, username, dispatch, onClick]);

    const toggleModal = useCallback(() => setIsModalOpen((prev) => !prev), []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    // Dynamic class generation (Tailwind CSS)
    const baseClasses = `
      relative w-full h-full flex flex-col items-center justify-between 
      marker bg-dark-card sm:rounded-lg rounded-md bg-gradient-orange-alpha border-5-transparent transition duration-300
    `;

    const cursorClass = isFooter ? "cursor-default" : "cursor-pointer";
    const borderClass = isSelected ? "" : "border-dark-custom";

    const shadowClass =
      (!isFooter && isHovered) || (!isFooter && isSelected)
        ? "shadow-card-player"
        : "";

    const tableBorderClass = isTable
      ? "border-4"
      : (!isFooter && isHovered) || isSelected
      ? "border-5"
      : "";

    const hoverTransformClass =
      !isFooter && !isTable
        ? "transform hover:scale-105 transition duration-300"
        : "";

    // Combina todas las clases
    const containerClasses = `
      ${baseClasses}
      ${cursorClass}
      ${borderClass}
      ${shadowClass}
      ${tableBorderClass}
      ${hoverTransformClass}
    `;

    const imageClasses = `
      w-full bg-center bg-no-repeat bg-contain
      ${isHovered || isSelected ? "opacity-100" : "opacity-40"}
      ${isTable ? "h-full" : "h-3/4"}
    `;

    const footerTextClasses = `
      font-medium text-white ${isFooter ? "text-xs" : "text-xs sm:text-lg"}
    `;

    const footerContainerClasses = `
      w-full sm:h-1/4 h-1/3 flex items-center justify-center  
      bg-dark-card rounded-b-lg
    `;

    const iconClasses = `absolute sm:bottom-2 botom-3 sm:right-2 right-1.5 text-white cursor-pointer text-sm hover:text-gray-300`;

    const playerNumberClasses = `font-inter text-xl sm:text-2xl absolute top right-2 font-extrabold`;

    return (
      <div
        className={containerClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={!isDisabled ? handlePlayerClick : undefined}
        style={{
          borderColor: isHovered && !isFooter ? color : isSelected ? color : "",
          cursor: isDisabled ? "not-allowed" : "",
          opacity: isDisabled ? 0.7 : 1,
        }}
        role="button"
      >
        {/* Player number */}
        {isSelected && !isTable && (
          <span className={playerNumberClasses} style={{ color: color }}>
            {isFooter ? playerNumber : `P${players.length + 1}`}
          </span>
        )}

        {/* Player image */}
        <div
          className={imageClasses}
          style={{ backgroundImage: `url(${image?.src})` }}
          aria-hidden="true"
        ></div>

        {/* Footer text */}
        {!isTable && (
          <div className={footerContainerClasses}>
            <span
              className={footerTextClasses}
              dangerouslySetInnerHTML={{ __html: title || "" }}
            ></span>
            {isFooter && (
              <FaEllipsisV className={iconClasses} onClick={toggleModal} />
            )}
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <PlayerInfoComponent username={username} onClick={closeModal} />
        )}
      </div>
    );
  }
);

PlayerComponent.displayName = "PlayerComponent";

export default PlayerComponent;
