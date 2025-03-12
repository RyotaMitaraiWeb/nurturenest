'use client';
import { toBase64 } from "@/lib/toBase64";
import { CloudUpload } from "@mui/icons-material";
import { Button, styled } from "@mui/material";
import React, { useState } from "react";

export function GalleryForm() {
  const [images, setImages] = useState([''] as string[]);

  async function onFileUpload(event: React.ChangeEvent<HTMLInputElement>, index: number) {
    event.preventDefault();
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const image = await toBase64(file);
      const strings = [...images];
      strings[index] = image;
      setImages(strings);
    }
  }

  function addImageField(event: React.MouseEvent) {
    event.preventDefault();
    setImages([...images, '']);
  }

  return <>
    {images.map((image, i) => (
      <div key={image}>
      <Button component="label"
        role={undefined}
        className="w-max"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUpload />}>
          Качи снимка
          <VisuallyHiddenInput
          type="file"
          onChange={(e) => onFileUpload(e, i)}
          accept="image/*"
        />
        <VisuallyHiddenInput name={`image-${i + 1}`} value={image} readOnly />
        </Button>
      </div>
    ))}

    <Button onClick={addImageField}>Добави нова снимка</Button>
  </>
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