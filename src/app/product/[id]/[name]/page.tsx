/* eslint-disable @next/next/no-img-element */
import { getProduct } from "@/actions/getProduct";
import { Heading } from "@/components/Heading";
import { AgeRecommendation } from "@/ui/product/AgeRecommendation";
import { ProductSections } from "@/ui/product/ProductSections";
import { QuantityForm } from "@/ui/product/QuantityForm";
import { LocalShipping, Loop, ShoppingCart } from "@mui/icons-material";
import { Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
  const p = await params;
  const id = Number(p.id);

  const product = await getProduct(id);
  return <section className="flex flex-col gap-8 p-4 pb-16">
    <div className="flex flex-col lg:flex-row gap-40 items-center justify-center">
      <Image src={product.image} alt="" className="max-w-full lg:max-w-150 h-auto bg-gray-500" width={600} height={600} />
        <div>
        <section className="flex flex-col gap-4">
          <Heading level={1} className="text-center">{product.name}</Heading>
          <Typography fontSize="large">{product.price.toString()} лв.</Typography>
          <Typography >{product.shortDescription}</Typography>
          <Divider className="mb-6" />
          <AgeRecommendation product={product} />
        </section>
        <section className="lg:mt-4">
          <form className="flex flex-col items-center lg:items-start gap-8">
            <input type="hidden" value={id} name="productId" />
            <div className="flex flex-col lg:flex-row gap-8">
              <QuantityForm />
              <Button size="large" variant="contained" className="w-max" startIcon={<ShoppingCart />}>
                Добави в количката
              </Button>
            </div>
            <List className="max-w-max lg:w-full lg:max-w-[initial] block ml-4" sx={{bgcolor: 'background.paper'}}>
              <ListItem sx={{borderLeft: '1px solid rgba(0, 0, 0, 0.12)', borderRight: '1px solid rgba(0, 0, 0, 0.12)', borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
                <ListItemAvatar>
                  <LocalShipping />
                </ListItemAvatar>
                <ListItemText primary="Безплатна доставка" secondary="За покупки на стойност над 100 лв." />
              </ListItem>
              <Divider component="li" />
              <ListItem sx={{borderLeft: '1px solid rgba(0, 0, 0, 0.12)', borderRight: '1px solid rgba(0, 0, 0, 0.12)', borderTop: '1px solid rgba(0, 0, 0, 0.12)'}}>
                <ListItemAvatar>
                  <Loop />
                </ListItemAvatar>
                <ListItemText primary="Връщане на продукта до 30 дни" secondary="С цялата такса възстановена" />
              </ListItem>
              <Divider component="li" />
            </List>
          </form>
        </section>
      </div>
      </div>
    <section>
      <Divider />
      <ProductSections 
        descriptionChildren={<section>
        <Heading level={2}>Описание</Heading>
        <Typography>
          {product.longDescription}
        </Typography>
      </section>}
        galleryChildren={
          <section>
            <Masonry columns={4} spacing={2}>
              {product.gallery.map(image => <img key={image} src={image} alt="" className="w-max-75 h-auto" />)}
            </Masonry>
          </section>
        }

        videoChildren={
          <section>
            <iframe className="w-full lg:w-170 mx-auto h-96" src={product.videoUrl!} title="UPPAbaby Vista V2 Stroller" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </section>
        }
      />
    </section>
  </section>
}