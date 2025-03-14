'use client';

import { Link, Typography } from "@mui/material";
import { usePathname } from "next/navigation";

type Section = {
  heading: React.ReactNode;
  links: {
    url: string;
    text: string;
  }[];
}

type SidebarSectionProps = {
  section: Section;
}

export function SidebarSection(props: SidebarSectionProps) {
  const pathname = usePathname();

  return <div>
    <Typography variant="h6" fontWeight="bold">{props.section.heading}</Typography>
    <ul className="flex flex-col gap-2">
      {props.section.links.map(link => <li className="ml-4" key={link.url}>
        <Link href={link.url} color="textPrimary" underline={pathname === link.url ? 'always' : 'hover'}>{link.text}</Link>
      </li>)}
    </ul>
  </div>
}