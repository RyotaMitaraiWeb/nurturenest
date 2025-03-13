import { Typography } from "@mui/material";
import Link from "next/link";

export function Footer() {
  return <footer className="bg-black text-[#FAFAFA] p-10 flex flex-col gap-8">
    <Typography className="text-center">
        Демонстративен сайт за проект по дисциплина Директен маркетинг. <Link className="underline hover:no-underline" href="https://github.com/RyotaMitaraiWeb/nurturenest" target="_blank">Сорс код в GitHub</Link>
    </Typography>
    <Typography className="text-center">
        Всички външни изображения и други обекти на авторско право са използвани единствено с учебни цели.
    </Typography>
  </footer>
}