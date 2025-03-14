import { Avatar, Card, CardContent, CardHeader, Rating, Typography } from "@mui/material";
import { Review, User } from "@prisma/client";

type CommentProps = {
  review: Review & { user: User };
}

export function Comment(props: CommentProps) {
  return <Card className="w-full">
    <CardHeader avatar={<Avatar />} title={<>
      <strong>{props.review.user.firstName} {props.review.user.lastName}</strong> (@{props.review.user.name})
    </>} subheader={<Rating precision={0.5} size="small" readOnly defaultValue={props.review.rating} />} />
    <CardContent>
      <Typography variant="body2">{props.review.text}</Typography>
    </CardContent>
  </Card>
}