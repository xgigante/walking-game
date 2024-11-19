import ModalAddPlayer from "@/components/modal-add-player/modal-add-player.component";
import ModalCreateMap from "@/components/modal-create-map/modal-create-map.component";
import { Player } from "@/interfaces/player.interface";
import React, { useCallback, useState } from "react";

const Home: React.FC = () => {
  const [isCreateMapOpen, setCreateMapOpen] = useState<boolean>(false);
  const [isAddPlayerOpen, setAddPlayerOpen] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [map, setMap] = useState<{ width: number; height: number } | null>(
    null
  );

  const handleCreateMap = useCallback(
    (mapData: { width: number; height: number }): void => {
      setMap(mapData);
      setCreateMapOpen(false);
    },
    [setMap, setCreateMapOpen]
  );

  const handleAddPlayer = useCallback(
    (username: string): void => {
      const newPlayer: Player = {
        username,
        position: { row: 0, column: 0 },
      };
      console.log(newPlayer);
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
    },
    [setPlayers]
  );

  return (
    <div>
      <h1>Walking Game</h1>

      {/* Botones para abrir modales */}
      <button onClick={() => setCreateMapOpen(true)}>Crear Mapa</button>
      <button onClick={() => setAddPlayerOpen(true)}>Add Player</button>

      {/* Modales */}
      <ModalCreateMap
        isOpen={isCreateMapOpen}
        onClose={() => setCreateMapOpen(false)}
        onCreateMap={handleCreateMap}
      />
      <ModalAddPlayer
        isOpen={isAddPlayerOpen}
        onClose={() => setAddPlayerOpen(false)}
        onAddPlayer={handleAddPlayer}
      />
    </div>
  );
};

export default Home;
