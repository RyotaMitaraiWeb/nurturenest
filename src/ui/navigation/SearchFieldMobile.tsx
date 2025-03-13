'use client';

import { Search } from "@mui/icons-material";
import { ClickAwayListener, Dialog, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

export function SearchFieldMobile() {
  const [open, setOpen] = useState(false);

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    setOpen(true);
  }

  return <>
    <IconButton onClick={handleClick} className="lg:hidden">
      <Search />
      <Dialog sx={{bottom: 'auto'}} open={open} onClose={() => setOpen(false)}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <form className="flex items-center">
            <TextField placeholder="Търси" />
            <IconButton>
              <Search />
            </IconButton>
          </form>
        </ClickAwayListener>
      </Dialog>
    </IconButton>
  </>
}