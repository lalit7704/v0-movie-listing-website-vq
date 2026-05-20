import Link from "next/link";

export interface AmazonProduct {
  id: string;
  title: string;
  imageUrl: string;
  productUrl: string;
  price?: string;
  buttonText?: string;
}

interface AmazonProductGridProps {
  title?: string;
  products: AmazonProduct[];
}

export function AmazonProductGrid({
  title = "⭐ Recommended For You",
  products,
}: AmazonProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <div className="py-6 w-full max-w-[1400px] mx-auto">
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6 px-1">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
        {products.map((product) => (
          <Link
            href={product.productUrl}
            target="_blank"
            rel="noopener noreferrer"
            key={product.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 group flex flex-col cursor-pointer"
          >
            <div className="relative aspect-square bg-white p-4 flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
              <div className="mt-auto">
                <span
                  className="block w-full bg-[#FF9900] group-hover:bg-[#FF9900]/90 text-black text-center text-sm font-bold py-2.5 px-4 rounded-lg transition-colors shadow-sm group-hover:shadow-md"
                >
                  {product.buttonText || "Buy on Amazon"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}