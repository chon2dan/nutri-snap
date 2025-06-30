"use client";

import React, { useRef } from "react";
import { Fab } from "@mui/material";
import Draggable from "react-draggable";

export default function DraggableFab() {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef}>
      <div
        ref={nodeRef}
        style={{
          position: "fixed",
          bottom: 50,
          right: 16,
          zIndex: 1300,
          cursor: "move",
        }}
      >
        <Fab color="primary" aria-label="add">
          {/* <AddIcon /> */}
          {"공유하기"}
        </Fab>
      </div>
    </Draggable>
  );
}
