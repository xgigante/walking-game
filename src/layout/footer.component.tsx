import { FooterProps } from "@/interfaces/footer.interface";
import React from "react";

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="flex justify-center items-center gap-[1px]">
      {children}
    </footer>
  );
};

export default Footer;
