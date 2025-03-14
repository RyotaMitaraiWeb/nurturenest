import { searchProducts } from "@/actions/searchProducts";
import { Heading } from "@/components/Heading";
import { SearchResultCard } from "@/ui/search/SearchResultCard";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>}) {
    const params = await searchParams;
    const search = params.search as string;
    const results = await searchProducts(search);

    return <section>
      <Heading className="mb-8" level={1}>Резултати за &quot;{search}&quot;</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-8">
        {results.map(result => <SearchResultCard key={result.productId} result={result} />)}
      </div>
    </section>
  }