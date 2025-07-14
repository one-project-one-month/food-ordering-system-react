import type { Cart } from '../../types/cart';
import P1 from '../../data/images/beef.png';
import { Card, CardContent } from '../ui/card';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import type { Extra } from '../../types/extra';

interface CartItemProps {
  cartItem: Cart;
  includedExtras: Extra[];
  extraPrice: number;
  handleUpdateQuantity: (q: number, item: Cart) => void;
}
export default function CartItem({
  cartItem,
  handleUpdateQuantity,
  includedExtras,
  extraPrice,
}: CartItemProps) {
  if (!cartItem) return null;
  return (
    <div className="flex items-center py-4 gap-4">
      <Card>
        <CardContent>
          <div className="flex items-center gap-6 lg:gap-8">
            <img
              src={(typeof cartItem?.dish_Img === 'string' && cartItem.dish_Img) || P1}
              alt={cartItem.dish}
              className="size-12 lg:size-20"
            />
            <div className="w-36 hidden lg:block">
              <h2 className=" text-lg font-medium">{cartItem?.dish}</h2>
              <p> 1 * {cartItem.price}</p>
            </div>
            <div className=" w-24 lg:w-56 flex flex-col">
              <h1 className=" text-gray-600 opacity-70 mb-2">Extras</h1>
              <div className={` w-full grid grid-cols-1 lg:grid-cols-3  gap-1`}>
                {includedExtras.map((e) => (
                  <div className="flex flex-col text-gray-500 " key={e.id}>
                    <h1 className="text-sm space-y-2">{e.name}</h1>
                    <p className="text-sm italic">1*{e.price}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(1, cartItem)}
              >
                <PlusIcon className="size-5" />
              </Button>
              <p className=" w-8 lg:max-w-12 text-center">{cartItem.quantity}</p>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleUpdateQuantity(-1, cartItem)}
              >
                <MinusIcon className="size-5" />
              </Button>
            </div>
            <div className="flex flex-col text-center items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mb-2 size-5"
                onClick={() => console.log(cartItem.menuId)}
              >
                <TrashIcon />
              </Button>
              <span>${cartItem.quantity * (cartItem.price + extraPrice)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
