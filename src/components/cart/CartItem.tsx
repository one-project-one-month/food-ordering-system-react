import P1 from '../../data/images/beef.png';
import { Card, CardContent } from '../ui/card';
import { TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
// import type { Extra } from '../../types/extra';
import type { CartItemProps } from '../../types/cart.type';

export default function CartItem({
  cartItem,
  removeItemHandler,
}: CartItemProps) {
  return (
    <div className="flex items-center pb-4 gap-4">
      <Card className='px-6 py-2'> 
        <CardContent className='flex items-center h-full p-0'>
          <div className="flex items-center gap-6 lg:gap-8">
            <img
              src={cartItem.dish.image?.replace(/^.*?(https:\/)/, 'https:/')  ?? P1}
              alt={cartItem.dish.name}
              className="size-12 lg:size-20"
            />
            <div className="w-36">
              <h2 className="text-base font-medium">{cartItem.dish.name}</h2>
              <p className="text-sm font-medium"> 1 * {cartItem.dish.price}kyats</p>
            </div>
            {cartItem.extra?.length!==0 && cartItem.extra !== null && 
            <div className=" w-24 lg:w-56 flex flex-col">
              <h1 className=" text-gray-600 opacity-70 mb-2">Extras</h1>
              <div className={` w-full grid grid-cols-1 lg:grid-cols-3  gap-1`}>
                {cartItem.extra.map((e) => (
                  <div className="flex flex-col text-gray-500 " key={e.id}>
                    <h1 className="text-sm space-y-2">{e.name}</h1>
                    <p className="text-sm italic">1*{e.price}</p>
                  </div>
                ))}
              </div>
            </div>
            }
            <div className="flex items-center">
              <p className="text-sm text-center pr-1">Qty:</p>
              <p className="text-sm text-center">{cartItem.quantity}</p>
            </div>
            <div className="flex flex-col text-center items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mb-2 size-5"
                onClick={() => { removeItemHandler(Number(cartItem.cartId)) } }
              >
                <TrashIcon className='text-red-500'/>
              </Button>
              <span>{cartItem.quantity * (cartItem.dish.price)}kyats</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
