import { useCallback, useState } from 'react';
import CartItem from '../../components/cart/CartItem';
import { carts as items } from '../../data/carts';
import type { Cart } from '../../types/cart.type';
import { extras } from '../../data/extras';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import type { Extra } from '../../types/extra.type';

export default function Cart() {
  const [carts, setCarts] = useState<Cart[]>(items);

  //filter extras
  const filterExtras = (array: number[]) => {
    return extras.filter((e) => array.includes(e.id));
  };
  const totalExtraPrice = (array: number[]) => {
    const filterExtras = extras.filter((e) => array.includes(e?.id));
    return filterExtras.reduce((i: number, a) => i + a.price, 0);
  };
  const handleUpdateQuantity = useCallback(
    (q: number, item: Cart) => {
      setCarts((prev: Cart[]) =>
        prev.map((c: Cart) =>
          c?.menuId === item.menuId
            ? {
                ...c,
                quantity: q === -1 && c.quantity === 1 ? c.quantity : c.quantity + q,
              }
            : c
        )
      );
      return carts;
    },
    [carts]
  );

  const subtotal = () => {
    return items.reduce((i, p) => i + (p.price + totalExtraPrice(p.extras)) * p.quantity, 0);
  };

  return (
    <div className="flex container my-8 flex-col p-8 w-full bg-white text-black ">
      <div className=" mb-8">
        <h1 className="text-xl">
          Your Carts- {carts.length} {carts.length === 1 ? 'item' : 'items'}
        </h1>
      </div>
      <div className="flex flex-wrap flex-row gap-10">
        <div className="w-full justify-between flex flex-1 flex-col">
          {carts.map((cart) => {
            const includedExtras = filterExtras(cart.extras) as Extra[];
            const extraPrice: number = includedExtras.reduce((i, p) => i + p.price, 0);
            return (
              <CartItem
                key={cart.menuId}
                cartItem={cart}
                includedExtras={includedExtras}
                extraPrice={extraPrice}
                handleUpdateQuantity={handleUpdateQuantity}
              />
            );
          })}
        </div>
        <div className="flex">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {' '}
                Review your order details and Please get your location.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8 mb-10">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>$3000</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${subtotal() + 3000}</span>
                </div>
              </div>
              <Button>Checkout</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
