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
    return <div>
      <Typography variant="h4">
        <Link href="/auth/login">Влез в профила си</Link> или <Link href="/auth/register">се регистрирай</Link>, за да оставиш мнение
      </Typography>
      <Divider />
    </div>
  }

  return <div>
    <Typography variant="h4">Остави мнение</Typography>
    <form action={addReview}>
      <input type="hidden" value={props.userId} name="userId" />
      <input type="hidden" value={props.productId} name="productId" />
      <Rating name="rating" value={rating} onChange={(_e, v) => setRating(v || 0)} />
      <TextField name="review" multiline className="w-full" />
      <Button type="submit" variant="contained">Изпрати</Button>
    </form>
  </div>
}