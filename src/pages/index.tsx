import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalAddPlayer from "@/components/modal-add-player/modal-add-player.component";
import ModalCreateMap from "@/components/modal-create-map/modal-create-map.component";
import PlayerTable from "@/components/player-table/player-table.component";
import PlayerComponent from "@/components/player/player.component";
import { Player, PlayerScenario } from "@/interfaces/player.interface";
import Footer from "@/layout/footer.component";
import Header from "@/layout/header.component";
import Main from "@/layout/main.component";
import { AppDispatch, RootState } from "@/store";
import { resetGame, setActivePlayer } from "@/store/game-slice";
import { deleteAllActiveUsers } from "@/store/game.service";

const Home: React.FC = () => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const players: Player[] = useSelector(
    (state: RootState) => state.game.players
  );

  // Component state
  const [isCreateMapOpen, setCreateMapOpen] = useState(false);
  const [isAddPlayerOpen, setAddPlayerOpen] = useState(false);

  // Handlers
  const openCreateMapModal = useCallback(() => setCreateMapOpen(true), []);
  const openAddPlayerModal = useCallback(() => setAddPlayerOpen(true), []);
  const resetGameHandler = useCallback(async () => {
    await deleteAllActiveUsers(dispatch, players);
    dispatch(resetGame());
  }, [dispatch, players]);
  const selectPlayerHandler = useCallback(
    (player: Player) => dispatch(setActivePlayer(player.username)),
    [dispatch]
  );

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-dark-bg text-black dark:text-white">
      {/* Header with actions */}
      <Header
        onCreateMap={openCreateMapModal}
        onAddPlayer={openAddPlayerModal}
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
        isOpen={isCreateMapOpen}
        onClose={() => setCreateMapOpen(false)}
      />

      {/* Modal for adding a player */}
      <ModalAddPlayer
        isOpen={isAddPlayerOpen}
        onClose={() => setAddPlayerOpen(false)}
      />
    </div>
  );
};

export default Home;
