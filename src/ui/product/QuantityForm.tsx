'use client';
import { Add, Remove } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";


export function QuantityForm() {
  const [quantity, setQuantity] = useState(1);
  function increment(event: React.MouseEvent) {
    event.preventDefault();
    setQuantity(q => q + 1);
  }

  function decrement(event: React.MouseEvent) {
    event.preventDefault();
    setQuantity(q => q - 1);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = Number(event.target.value);
    console.log(value);
    if (value >= 1) {
      setQuantity(value);
    }
  }

  return <section className="flex">
    <Button color="primary" variant="contained" disabled={quantity <= 1} onClick={decrement}>
      <Remove />
    </Button>
    <TextField size="small" type="number" value={quantity} onChange={handleChange} />
    <Button color="primary" variant="contained" onClick={increment}>
      <Add />
    </Button>
  </section>
}