"use cache";
import SectionHeader from "@/components/common/section-header";
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ProductCard from "@/components/products/product-card";
import { getFeaturedProducts } from "@/lib/products/product-select";

export default async function FeaturedProducts() {
    const featuredProducts = await getFeaturedProducts();
    return (
        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center justify-between gap-4">
                    <SectionHeader title="Featured Today" icon={StarIcon} description="Top picks from our community this week."/>
                    <Link href="/explore" className={buttonVariants({variant:"outline", size:"lg", className:"text-base rounded-sm hidden sm:flex"})}>
                        View All
                        <ArrowUpRightIcon className="size-4" />
                    </Link>
                </div>
                <div className="grid-wrapper">
                    {featuredProducts.map((product) =>
                        <ProductCard key={product.id} product={product}/>
                    )}
                </div>
            </div>
        </section>
    );
};