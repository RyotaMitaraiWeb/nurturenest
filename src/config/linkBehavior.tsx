import NextLink from 'next/link';
import { LinkProps } from '@mui/material/Link';
import React from 'react';


const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  LinkProps
>((props, ref) => {
  const { href, target, className, id, children } = props;
  const href2 = href as string;
  return <NextLink ref={ref} href={href2} target={target} className={className} id={id}>
    {children}
  </NextLink>;
});

LinkBehavior.displayName = 'MuiLink';


export const linkBehaviorConfiguration = {
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
};