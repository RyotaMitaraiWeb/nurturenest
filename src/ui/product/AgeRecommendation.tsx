import { Typography } from "@mui/material";
import { Product } from "@prisma/client";


export function AgeRecommendation({ product }: {product: Product}) {
  if (product.minimumAge === 0 && product.maximumAge === 0) {
    return <Typography>Подходящ за всички деца</Typography>
  }

  if (product.minimumAge && !product.maximumAge) {
    return <Typography>Подходящ за деца на възраст {product.minimumAge}+ години</Typography>
  }

  if (!product.minimumAge && product.maximumAge) {
    return <Typography>Подходящ за деца до {product.maximumAge} години</Typography>
  }

  return <Typography>Подходящ за деца на възраст от {product.minimumAge} до {product.maximumAge} години</Typography>
}