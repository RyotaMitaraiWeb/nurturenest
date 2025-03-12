'use client';
import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

type ProductTabsProps = {
  withVideo: boolean;
  onChange: (value: number) => void;
}

export function ProductTabs(props: ProductTabsProps) {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    props.onChange(newValue);
  };
  return <Tabs value={value} onChange={handleChange}>
    <Tab label="Описание" />
    <Tab label="Галерия" />
    {props.withVideo ? <Tab label="Видео" /> : null}
  </Tabs>
}
