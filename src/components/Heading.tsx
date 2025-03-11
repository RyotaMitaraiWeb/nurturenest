import React from "react";

type HeadingProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export function Heading(props: HeadingProps): React.JSX.Element {
  const Tag = `h${props.level}`;
  

  return React.createElement(Tag, {
    className: `text-4xl ${props.className || ''}`
  }, props.children)
}