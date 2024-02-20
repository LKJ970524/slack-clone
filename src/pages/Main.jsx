import { Box, Drawer, Toolbar } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import ChannelMenu from "../components/ChannelMenu";

const Main = () => {
  return (
    //TODO bg 테마 적용
    <Box sx={{ display: "flex", background: "white" }}>
      <Header />
      <Drawer variant="permanent" sx={{ width: 300 }} className="noScroll">
        <Toolbar />
        <Box sx={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
          <ChannelMenu />
        </Box>
      </Drawer>
    </Box>
  );
};

export default Main;
