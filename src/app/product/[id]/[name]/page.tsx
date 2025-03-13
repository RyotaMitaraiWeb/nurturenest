/* eslint-disable @next/next/no-img-element */
import { getProduct } from "@/actions/getProduct";
import { Heading } from "@/components/Heading";
import { AgeRecommendation } from "@/ui/product/AgeRecommendation";
import { ProductSections } from "@/ui/product/ProductSections";
import { Divider, Typography } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import Image from "next/image";
import { ProductDetailsForm } from "@/ui/product/ProductDetailsForm";

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
          <ProductDetailsForm id={id} />
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