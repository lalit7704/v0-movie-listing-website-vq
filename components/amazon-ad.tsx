import Link from "next/link";

interface AmazonAdProps {
  title: string;
  description: string;
  imageUrl: string;
  productUrl: string;
  price?: string;
  buttonText?: string;
}

export function AmazonAd({
  title,
  description,
  imageUrl,
  productUrl,
  price,
  buttonText = "Buy on Amazon",
}: AmazonAdProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-md transition-shadow my-8 w-full max-w-[1100px] mx-auto overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-white/5 rounded-md overflow-hidden flex items-center justify-center p-2">
        <img
          src={imageUrl}
          alt={title}
          className="object-contain w-full h-full drop-shadow-md mix-blend-multiply dark:mix-blend-normal"
          loading="lazy"
        />
      </div>

      {/* Product Details */}<Link
          href={productUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#FF9900] hover:bg-[#FF9900]/90 text-black font-bold py-2.5 px-6 rounded-lg transition-colors w-full sm:w-auto text-center shadow-lg"
        >
      <div className="flex-1 flex flex-col justify-center text-center sm:text-left">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 block">
          ⭐ Recommended For You
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>
        {price && <p className="text-xl font-extrabold text-primary mb-4">{price}</p>}
        
        {/* Buy Button */}
        
          {buttonText}
        
      </div></Link>
    </div>
  );
}
