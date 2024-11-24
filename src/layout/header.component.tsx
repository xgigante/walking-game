import React from "react";
import { HeaderProps } from "../interfaces/header.interface";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const Header: React.FC<HeaderProps> = ({
  onCreateMap,
  onAddPlayer,
  onResetGame,
}) => {
  const { width, height } = useSelector((state: RootState) => state.game);
  const isGameCreated = Boolean(width && height);
  return (
    <header className=" p-4 flex justify-between items-center">
      <h1 className="sm:text-2xl text-lg font-bold">Walking Game</h1>
      <div className="flex gap-2">
        {isGameCreated ? (
          <button className="btn-secondary transition" onClick={onResetGame}>
            Reset Map
          </button>
        ) : (
          <button className="btn-primary transition" onClick={onCreateMap}>
            Create Map
          </button>
        )}
        <button
          className={`btn-primary transition ${
            !isGameCreated ? "btn-disabled " : ""
          }`}
          onClick={onAddPlayer}
          disabled={!isGameCreated}
        >
          Add Player
        </button>
      </div>
    </header>
  );
};

export default Header;
