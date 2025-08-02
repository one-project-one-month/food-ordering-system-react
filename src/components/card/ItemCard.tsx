// components/ItemCard.tsx
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Star } from 'lucide-react';

interface ItemCardProps {
  image: string;
  title: string;
  subtitle?: string; // cuisine or description
  price?: string; // for menu
  rating?: number;
  ratingCount?: number;
  deliveryTime?: string;
  deliveryFee?: string;
  isPromotion?: boolean;
  type: 'menu' | 'restaurant';
  linkTo: string;
}

export default function ItemCard({
  image,
  title,
  subtitle,
  price,
  rating,
  ratingCount,
  deliveryTime,
  deliveryFee,
  isPromotion = false,
  type,
  linkTo,
}: ItemCardProps) {
  return (
    <Link to={linkTo} className="block">
        <Card className="hover:shadow-md overflow-hidden border border-purple-200 transition-all duration-200 relative">
        {isPromotion && (
            <span className="absolute top-2 left-2 bg-purple-200 text-purple-700 px-2 py-1 text-xs rounded-md z-10">
            🎉 Promotion
            </span>
        )}
        <CardHeader className="p-0">
            <img
            src={image}
            alt={title}
            className="rounded-t-md w-full h-48 object-cover"
            />
        </CardHeader>
        <CardContent className="p-4 space-y-2">
            <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex items-center gap-1 text-sm text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                {rating} <span className="text-gray-400">({ratingCount}+)</span>
            </div>
            </div>

            {subtitle && (
            <div className="text-sm text-gray-500">{subtitle}</div>
            )}

            {type === 'menu' && price && (
            <div className="text-sm text-gray-600">Price: {price} Ks</div>
            )}

            {(deliveryTime ?? deliveryFee) && (
            <div className="flex justify-between text-xs text-gray-600 mt-2">
                {deliveryTime && <span>🕒 {deliveryTime}</span>}
                {deliveryFee && <span>🚴 {deliveryFee}</span>}
            </div>
            )}
        </CardContent>
        </Card>
    </Link>
  );
}
