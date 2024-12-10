import React from "react";
import ModalAddPlayer from "@/components/modal-add-player/modal-add-player.component";
import ModalCreateMap from "@/components/modal-create-map/modal-create-map.component";
import PlayerTable from "@/components/player-table/player-table.component";
import PlayerComponent from "@/components/player/player.component";
import Footer from "@/layout/footer.component";
import Header from "@/layout/header.component";
import Main from "@/layout/main.component";
import useHome from "@/hooks/use-home.hook";
import { PlayerScenario } from "@/interfaces/player.interface";
import { useModal } from "@/hooks/use-modal.hook";
import { ModalEnum } from "@/interfaces/modal.interface";

/**
 * Home component representing the main page of the application.
 *
 * This component utilizes custom hooks `useHome` and `useModal` to manage state and actions.
 * It renders a header with action buttons, a main content area displaying a player table,
 * and a footer with player components. Additionally, it includes modals for creating a map
 * and adding a player.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home: React.FC = () => {
  const { players, resetGameHandler, selectPlayerHandler } = useHome();
  const { modals, openModal, closeModal } = useModal();

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* Header with actions */}
      <Header
        onCreateMap={() => openModal(ModalEnum.CreateMap)}
        onAddPlayer={() => openModal(ModalEnum.AddPlayer)}
        onResetGame={resetGameHandler}
      />

      {/* Main content displaying the player table */}
      <Main className="flex-grow">
        <PlayerTable players={players} />
      </Main>

      {/* Footer with player components */}
      <Footer>
        {players.map((player, index) => (
          <div className="sm:w-1/6 w-full h-32" key={index}>
            <PlayerComponent
              player={player}
              scenario={PlayerScenario.InFooter}
              onClick={() => selectPlayerHandler(player)}
            />
          </div>
        ))}
      </Footer>

      {/* Modal for creating a map */}
      <ModalCreateMap
        isOpen={modals.createMap}
        onClose={() => closeModal(ModalEnum.CreateMap)}
      />

      {/* Modal for adding a player */}
      <ModalAddPlayer
        isOpen={modals.addPlayer}
        onClose={() => closeModal(ModalEnum.AddPlayer)}
      />
    </div>
  );
};

export default Home;
