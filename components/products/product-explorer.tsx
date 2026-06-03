"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, SearchIcon, TrendingUpIcon } from "lucide-react";
import ProductCard from "@/components/products/product-card";
import { ProductType } from "@/types";
import { useMemo, useState } from "react";

export default function ProductExplorer({ products }: {products : ProductType[]}) {
    const [sortBy, setSortBy] = useState<"trending" | "recent" | "newest">("trending");
    const [searchQuery, setSearchQuery] = useState("");
    const filteredProducts = useMemo(() => {
        if (searchQuery.length > 0) {
            return products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()));
        };
        switch (sortBy) {
            case "trending":
                return products.sort((a, b) => b.voteCount - a.voteCount);
            case "recent":
                return products.sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime());  
            default:
                return products;
        };
    }, [searchQuery, products, sortBy]);
    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4"/>
                    <Input
                        className="pl-10 text-sm shadow-lg rounded-sm bg-background"
                        placeholder="Search products..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="flex gap-2">
                    <Button variant={sortBy === "trending" ? "default" : "outline"} className="text-sm px-4 shadow-lg rounded-sm" onClick={() => setSortBy("trending")}><TrendingUpIcon className="size-4"/>Trending</Button>
                    <Button variant={sortBy === "recent" ? "default" : "outline"} className="text-sm px-4 shadow-lg rounded-sm" onClick={() => setSortBy("recent")}><Clock className="size-4"/>Recent</Button>
                </div>
            </div>
            <div className="mb-6">
                <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
            </div>
            <div className="grid-wrapper">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
        </div>
    )
}