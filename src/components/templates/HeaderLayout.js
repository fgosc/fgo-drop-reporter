import { memo } from "react";
import { Header } from "../organisms/layout/Header";

export const HeaderLayout = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
