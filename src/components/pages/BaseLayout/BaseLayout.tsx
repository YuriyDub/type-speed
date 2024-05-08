import { ReactNode } from "react";
import { Header } from "../../Header/Header";

export const BaseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
