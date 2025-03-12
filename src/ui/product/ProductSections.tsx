'use client';
import React, { useState } from "react";
import { ProductTabs } from "./ProductTabs";

type ProductSectionsProps = {
  descriptionChildren: React.ReactNode;
  galleryChildren: React.ReactNode;
  videoChildren?: React.ReactNode;
}

export function ProductSections(props: ProductSectionsProps) {
  const [value, setValue] = useState(0);

  return <>
    <ProductTabs onChange={setValue} withVideo={!!props.videoChildren} />
    <div className={value !== 0 ? 'hidden' : 'block'}>
      {props.descriptionChildren}
    </div>
    <div className={value !== 1 ? 'hidden' : 'block'}>{props.galleryChildren}</div>
    <div className={value !== 2 ? 'hidden' : 'block'}>{props.videoChildren}</div>
  </>
}