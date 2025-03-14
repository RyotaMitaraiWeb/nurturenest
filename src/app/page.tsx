import { getBestSellers } from "@/actions/getBestSellers";
import { Heading } from "@/components/Heading";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";

export  default async function Home() {
  const products = await getBestSellers();

  return <section>
    <Heading className="text-center mb-8" level={1}>Най-продавани продукти</Heading>
    <div className="grid grid-cols-1 lg:grid-cols-3 mx-auto">
      {products.map(product => <Card key={product.id} className="w-100 mx-auto">
        <CardMedia sx={{ height: 150 }} image={product.image} />
        <CardContent>
          <Typography variant="h4">{product.name}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" href={`/product/${product.id}/${product.name.toLocaleLowerCase().replaceAll(' ', '-')}`}>Разгледай</Button>
        </CardActions>
      </Card>)}
    </div>
  </section>
}
