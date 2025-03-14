'use client';

import { Search } from "@mui/icons-material";
import { ClickAwayListener, Dialog, IconButton, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export function SearchFieldMobile() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    setOpen(true);
  }

  const field = useRef<HTMLInputElement>(null);

  function redirectToSearch(event: React.MouseEvent) {
    event.preventDefault();
    router.push(`/search&search=${field.current?.value}`);
    setOpen(false);
  }

  return <>
    <IconButton size="large" onClick={handleClick} className="lg:hidden">
      <Search />
      <Dialog fullWidth sx={{bottom: 'auto'}} open={open} onClose={() => setOpen(false)}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <form className="flex items-center">
            <TextField ref={field} name="search" className="w-full" placeholder="Търси" slotProps={{ input: { endAdornment: <IconButton onClick={redirectToSearch}><Search /></IconButton>}}} />
          </form>
        </ClickAwayListener>
      </Dialog>
    </IconButton>
  </>
}