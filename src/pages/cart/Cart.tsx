 
/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from 'react';
import CartItem from '../../components/cart/CartItem';
import type { Cart } from '../../types/cart.type';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { clearCart, getCartItems, removeCartItem } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import type { AppDispatch } from '../../store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { allowPaymentAccess, createOrder,setOrderId } from '../../features/order/orderSlice';
import type { OrderRequestProps } from '../../types/orders.type';

export default function Cart() {
  const [carts, setCarts] = useState<any>([]);
  const dispatch = useDispatch<AppDispatch>()
  const [cartStatus, setCartStatus] = useState(false)
  const navigate = useNavigate()
  const userId = Cookies.get('userId')
  const addressId = Cookies.get('addressId') ?? 1

  const subtotal = carts.reduce((sum:number, item:any) => {
    return sum + item.quantity * item.dish.price;
  }, 0);

  const totalAmount = +subtotal + 500
  const removeItemHandler = (itemId:number)=>{
    void removeCartItemData(itemId)
  }
  const getCartItemsData = async()=>{
    try{
      const result = await dispatch(getCartItems())
      if(result.payload.code===200){
       if(result.payload.data.length!==0){
        setCarts(result.payload.data)
        Cookies.set("cartRestaurantId",result.payload.data[0].dish.restaurant.id as string)
       }
      }
    }catch(e){
      console.log("error ", e)
    }
  }

  const removeCartItemData = async(itemId:number)=>{
    try{
      const result = await dispatch(removeCartItem({itemId}))
      const payload = result.payload as any;
      if(payload.code===200){
       toast.success(payload.message as string)
       setCartStatus(!cartStatus)
      }
    }catch(e){
      console.log("error ", e)
      setCartStatus(!cartStatus)
    }
  }

  useEffect(()=>{
    void getCartItemsData()
  },[cartStatus])

  const createOrderHandler = async()=>{
    const data: OrderRequestProps = {
      orderDateTime: "",
      addressId: Number(addressId),
      totalAmount: totalAmount,
      customerId: Number(userId),
    }
    try{
      const result = await dispatch(createOrder(data))
      const payload = result.payload as any;
      if(payload.code===200){
       toast.success(payload.message as string)
       setCartStatus(!cartStatus)
       dispatch(setOrderId(payload.data.id));
        dispatch(allowPaymentAccess(true));
        dispatch(clearCart());
       await navigate('/payment')
      }
    }catch(e){
      console.log("error ", e)
    }
  }

  return (
    <div className="flex container my-6 flex-col justify-center items-center w-full bg-white text-black ">
      <div className="mb-8">
        <h1 className="text-2xl text-primary">
          Your Carts- {carts.length} {carts.length === 1 ? 'item' : 'items'}
        </h1>
      </div>
      {
        carts.length !== 0 ?
        <div className="flex flex-wrap flex-row gap-10">
          <div className="w-full justify-start flex flex-1 flex-col">
            {carts.map((cart:any) => {
              return (
                <CartItem
                  key={cart.cartId}
                  cartItem={cart}
                  includedExtras={[]}
                  handleUpdateQuantity={()=>{{}}}
                  removeItemHandler={removeItemHandler}
                />
              );
            })}
          </div>
          <div className="flex h-full">
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Order Summary</CardTitle>
                <CardDescription>
                  {' '}
                  Review your order details and Please check your location.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 mb-10">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{subtotal}kyats</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>500kyats</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{totalAmount}kyats</span>
                  </div>
                </div>
                <Button type='button' onClick={createOrderHandler}>Checkout</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        : <Button type='button' onClick={()=>navigate('/restaurants')}>Browse Shop</Button>
      }
    </div>
  );
}
