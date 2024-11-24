import { MainComponentProps } from "@/interfaces/main.interface";
import React from "react";

const Main: React.FC<MainComponentProps> = ({ children }) => {
  return (
    <main className="flex-grow flex">
      <div className="flex-grow">{children}</div>
    </main>
  );
};

export default Main;
