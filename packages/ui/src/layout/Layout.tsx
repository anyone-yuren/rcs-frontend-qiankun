import { ThemeProvider } from "@mui/material/styles";
import type { FC } from "react";
import React, { memo } from "react";
import { theme } from "theme";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = (props) => {
  return <ThemeProvider theme={theme}>{props?.children}</ThemeProvider>;
};
export default memo(Layout);
