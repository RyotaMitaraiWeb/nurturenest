import type { SearchResult } from "@/types/search"
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type SearchResultProps = {
  result:  SearchResult
}

export function SearchResultCard(props: SearchResultProps) {
  return <Card className="w-100 mx-auto flex flex-col justify-between">
    <CardMedia sx={{ height: 300 }} image={props.result.image} title={props.result.name} />

    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
          {props.result.name}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {props.result.price.toFixed(2)} лв.
      </Typography>
    </CardContent>
    <CardActions>
      <Button variant="contained" href={`/product/${props.result.productId}/${props.result.name.replaceAll(' ', '-').toLocaleLowerCase()}`} size="small">Разгледай</Button>
    </CardActions>
  </Card>
}