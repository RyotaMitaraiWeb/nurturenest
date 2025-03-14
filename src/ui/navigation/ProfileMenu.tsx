'use client';

import { ExitToApp, FormatListBulleted, Login, Logout, Paid, Person } from "@mui/icons-material";
import { IconButton, ListItem, ListItemAvatar, ListItemButton, ListItemText, Menu, Typography } from "@mui/material";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type ProfileMenuProps = {
  session: Session | null;
};

export function ProfileMenu(props: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    setOpen(true);
  }

  function redirectToPage(page: string) {
    setOpen(false);
    router.push(page);
  }

  const el = useRef<HTMLButtonElement>(null);

  function submit() {
    signOut({ redirectTo: '/auth/login' });
  }

  return <>
    <IconButton size="large" ref={el} onClick={handleClick}>
      <Person />
    </IconButton>
    <Menu anchorEl={el.current} open={open} onClose={() => setOpen(false)}>
      <ListItem>
        <Typography color="text.secondary">Профил</Typography>
      </ListItem>
      {props.session ? <>
        <ListItemButton onClick={() => redirectToPage('/profile/orders')}>
          <ListItemAvatar>
            <Paid />
          </ListItemAvatar>
          <ListItemText>Моите поръчки</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => redirectToPage('/profile/data')}>
          <ListItemAvatar>
            <FormatListBulleted />
          </ListItemAvatar>
          <ListItemText>Данни по подразбиране</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={submit}>
          <ListItemAvatar>
            <Logout />
          </ListItemAvatar>
          <ListItemText>Излез от профил</ListItemText>
        </ListItemButton>
        
      </> : <>
        <ListItemButton onClick={() => redirectToPage('/auth/login')}>
          <ListItemAvatar>
            <Login />
          </ListItemAvatar>
          <ListItemText>Влез в профила си</ListItemText>
        </ListItemButton>
        <ListItemButton onClick={() => redirectToPage('/auth/register')}>
          <ListItemAvatar>
              <ExitToApp />
            </ListItemAvatar>
          <ListItemText>Регистрация</ListItemText>
        </ListItemButton>
      </>}
    </Menu>
  </>
}