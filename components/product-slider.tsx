"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { track } from "@vercel/analytics";
import { Button } from "@/components/ui/button";
import { productSection, trendingProducts, type Product } from "@/data/products";

function ProductCard({ product, rank }: { product: Product; rank: number }) {
  const Icon = product.icon;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="sponsored noopener noreferrer"
      onClick={() => track("Product Click", { productId: product.id, title: product.title })}
      className="group flex w-[160px] flex-shrink-0 flex-col sm:w-[180px] md:w-[200px]"
    >
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-border bg-gradient-to-br from-primary/25 via-secondary to-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full bg-white object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <Icon
            aria-hidden="true"
            className="h-14 w-14 text-primary transition-transform duration-300 group-hover:scale-110"
          />
        )}
        <span className="absolute left-2 top-2 rounded bg-black/70 px-1.5 py-0.5 text-xs font-semibold text-white">
          #{rank}
        </span>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">{product.category}</p>
      <h3 className="mt-0.5 line-clamp-2 min-h-[2.5rem] text-sm font-medium text-foreground transition-colors group-hover:text-primary">
        {product.title}
      </h3>
      <span className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-md bg-[#FF9900] px-2 py-1.5 text-xs font-bold text-black transition-colors group-hover:bg-[#FF9900]/90">
        {product.buttonText || productSection.buttonText}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
      </span>
    </a>
  );
}

/** Homepage row of trending products; the list and links live in data/products.ts. */
export function ProductSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollContainerRef.current?.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    });
  };

  if (trendingProducts.length === 0) return null;

  return (
    <section id="trending-products" className="py-6 md:py-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-4 md:mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {productSection.title}
            </h2>
            <p className="text-sm text-muted-foreground">{productSection.subtitle}</p>
          </div>
          <div className="flex flex-shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              aria-label="Scroll products left"
              className="h-8 w-8 rounded-full border-border hover:bg-secondary"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label="Scroll products right"
              className="h-8 w-8 rounded-full border-border hover:bg-secondary"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          {trendingProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>

        <p className="text-xs text-muted-foreground">{productSection.disclosure}</p>
      </div>
    </section>
  );
}
