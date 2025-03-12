'use client';

import { toBase64 } from "@/lib/toBase64";
import { CloudUpload } from "@mui/icons-material";
import { styled, TextField, Button } from "@mui/material";
import React, { useState } from "react";

type ProductFormProps = {
  action: (form: FormData) => void;
}
export function ProductForm(props: ProductFormProps): React.JSX.Element {
  const [image, setImage] = useState('');

  async function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const image = await toBase64(file);
      setImage(image);
    }
  }
  return <form action={props.action}>
    <div>
      <TextField label="Име на продукта" name="name" />

      <Button component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUpload />}>
        Качи снимка
        <VisuallyHiddenInput
        type="file"
        onChange={onFileUpload}
        accept="image/*"
      />
      <VisuallyHiddenInput name="image" value={image} readOnly />
      </Button>
    </div>
    <div>
      <TextField type="number" label="Цена" name="price" />
    </div>
    <div>
      <TextField label="Кратко описание" name="shortDescription" />
      <TextField multiline label="Пълно описание" name="description" />
    </div>
    <div>
      <h2>Подходяща за деца от:</h2>
      <TextField name="minimumAge" type="number" />
      <p>до</p>
      <TextField name="maximumAge" type="number" />
    </div>
    <div>
      <TextField label="Линк към видео" name="video" />
    </div>
    <Button type="submit" color="primary" variant="contained" size="large">Пращане</Button>
  </form>
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});