'use client';

import { addReview } from "@/actions/addReview";
import { Button, Divider, Link, Rating, TextField, Typography } from "@mui/material";
import { useState } from "react";

type CommentFormProps = {
  userId: string | null | undefined;
  productId: number;
}

export function CommentForm(props: CommentFormProps) {
  const [rating, setRating] = useState(0);
  if (!props.userId) {
    return <div className="flex flex-col">
      <Typography variant="h4">
        <Link href="/auth/login">Влез в профила си</Link> или <Link href="/auth/register">се регистрирай</Link>, за да оставиш мнение
      </Typography>
      <Divider flexItem />
    </div>
  }

  return <div className="flex flex-col gap-4">
    <Typography variant="h4">Остави мнение</Typography>
    <form action={addReview} className="flex flex-col gap-4 p-4">
      <input type="hidden" value={props.userId} name="userId" />
      <input type="hidden" value={props.productId} name="productId" />
      <Rating precision={0.5} name="rating" value={rating} onChange={(_e, v) => setRating(v || 0)} />
      <TextField name="review" multiline className="w-full" />
      <Button className="w-max" type="submit" variant="contained">Изпрати</Button>
    </form>
    <Divider flexItem />
  </div>
}