/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import DummyImage from '../../assets/dummy.png'
import { addToCart, addToCartItem, removeAllCartItem } from "../../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import type { CartItem } from "../../types/cart.types";
import { useParams } from "react-router-dom";
import { getMenuDetail } from "../../features/userMenu/userMenuSlice";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { DialogToDelete } from "../../components/DialogToDelete";

const UserMenuDetail = () => {
    const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
    const [selectedSize, setSelectedSize] = useState<number | null>(null);
    const [notes, ] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [customerNotes, setCustomerNotes] = useState('');
    const dispatch = useDispatch<AppDispatch>()
    const {id} = useParams();
    const userId = Cookies.get('userId')
    const { data: menuDetail } = useSelector((state:RootState) => state.userMenu.detailed);
    const [menuData, setMenuData ] = useState<any>({})
    const { loading } = useSelector((state:RootState) => state.cart.new);
    const [isDeleteDia, setIsDeleteDia] = useState<boolean>(false);
    const [idToDelete, ] = useState<number>(0)

  const toggleOption = (optionId: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const increment = () => {setQuantity(prev => prev + 1)};
  const decrement = () => {setQuantity(prev => (prev > 1 ? prev - 1 : 1))};

  const handleAddToCart = (menuData:any) => {
    const selected = Object.entries(selectedExtras)
      .filter(([, checked]) => checked)
      .map(([id]) => id);
    const cartItem: CartItem = {
        id: menuData.id,
        dish: menuData.dish,
        status: menuData.status,
        dish_Img: menuData.dish_Img,
        price: menuData.price,
        selectedExtras: selected,
        dishSizeId: menuData.dishSizes[0].id,
        notes,
        quantity: quantity,
        totalAmount: calculateTotal(),
    };
    dispatch(addToCart(cartItem));
    void callAddToCart(cartItem);
  };

  const callAddToCart = async(data:any)=>{
    const choosenRestaurantToAddCart = menuData?.restaurantId 
    const savedCartRestaurantId = Cookies.get('cartRestaurantId') ?? ''
    const payload = {
      quantity: data.quantity,
      customerId: Number(userId),
      dishSizeId: data.dishSizeId,
    }
    if(choosenRestaurantToAddCart !== savedCartRestaurantId && savedCartRestaurantId!=='') {
      setIsDeleteDia(true)
    }else{
      try{
      const result = await dispatch(addToCartItem(payload))
        if (addToCartItem.fulfilled.match(result)) {
          toast.success('Add to cart successfully!');
        }
      }catch(e){
        console.log("error ", e)
    }
    } 
  }

  const calculateTotal = () => {
    const basePrice =
    menuData?.dishSizes?.find((size: any) => size.id === selectedSize)?.price ??
    menuData?.price ??
    0;

    // Calculate extras
    let extrasTotal = 0;
    menuData?.extras?.forEach((extra: any) => {
      if (selectedExtras[extra.id]) {
        extrasTotal += extra?.price ?? 0;
      }
    });

    // Total = (base + extras) * quantity
    return (basePrice + extrasTotal) * quantity;
  };

  //get menu detail
  const getMenuDetailData = async()=>{
    try{
      await dispatch(getMenuDetail({id}))
    }catch(e){
      console.log("error ", e)
    }
  }

  useEffect(()=>{
    void getMenuDetailData()
  },[])

  useEffect(()=>{
    if(menuDetail){
      setMenuData(menuDetail.menu)
    }
  },[menuDetail])

  const handleDeleteDialog = () => {
    setIsDeleteDia((prev) => !prev);
  };

  const handleDeleteCart = () => {
    handleDeleteDialog();
    void deleteAllCartData()
  };

  const deleteAllCartData = async()=>{
      try{
        const result = await dispatch(removeAllCartItem(1))
        const resultPayload = result.payload as any
        if (resultPayload.code===200) {
          toast.success('successfully removed your previous cart!');
          Cookies.remove('cartRestaurantId')
        } else {
          toast.error('Errors when removing your previous cart');
        }
      }catch(e){
        console.log("error ", e)
      }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <img
        src={
            typeof menuData?.dishImg === 'string'
            ? menuData?.dishImg.replace(/^.*?(https:\/)/, 'https:/')
            : DummyImage
        }
        alt={menuData?.dish}
        className="w-full h-64 object-cover rounded-xl shadow"
      />
      <h1 className="text-2xl font-bold">{menuData?.dish}</h1>
        {menuData?.extras?.length !== 0 && 
          <div>
            <h2 className="text-xl font-semibold mb-2">Extras</h2>
            <Accordion type="multiple" className="w-full">
              {menuData?.extras?.map((extra:any) => (
                <AccordionItem key={extra.id} value={String(extra.id)}>
                  <AccordionTrigger>{extra.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex items-start space-x-2 py-1">
                      <Checkbox
                        id={extra.id}
                        checked={selectedExtras[extra.id] || false}
                        onCheckedChange={() => {
                          toggleOption(String(extra.id));
                        }}
                      />
                      <div>
                        <label htmlFor={extra.id} className="text-sm font-medium">
                          {extra.name}
                          {extra.price && (
                            <span className="text-gray-500 text-xs ml-1">
                              ({extra.price} kyats)
                            </span>
                          )}
                        </label>
                      </div>
                    </div>
                    </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        }
        {
          menuData?.dishSizes?.length !==0 && 
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Select Size</h2>
              {menuData?.dishSizes?.map((size: any) => (
                <div key={size.id} className="flex items-center space-x-2 py-1">
                  <input
                    type="radio"
                    name="dishSize"
                    id={`size-${size.id}`}
                    checked={selectedSize === size.id}
                    onChange={() => {setSelectedSize(size.id as number)}}
                  />
                  <label htmlFor={`size-${size.id}`} className="text-sm font-medium">
                    {size.name} — {size.price} kyats
                  </label>
                </div>
              ))}
          </div>
        }
    <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-medium">
            Notes
        </label>
        <textarea
            id="customerNotes"
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            rows={3}
            placeholder="Any special instructions?"
            value={customerNotes}
            onChange={(e) => { setCustomerNotes(e.target.value); }}
        />
    </div>
      {/* Add to Cart */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="flex items-center border rounded-md h-[36px] overflow-hidden">
          <Button
            onClick={decrement}
            className="px-3 text-sm text-white h-full font-medium bg-primary"
            disabled={menuData?.status !== 'ACTIVE'}
          >−</Button>
          <span className="px-3 text-sm w-[37px] h-full flex justify-center items-center font-medium">{quantity}</span>
          <Button
            onClick={increment}
            className="px-3 text-sm text-white h-full font-medium bg-primary"
            disabled={menuData?.status !== 'ACTIVE'}
          >+</Button>
        </div>
        <Button className="flex-1" onClick={()=>{ handleAddToCart(menuData); }} disabled={menuData?.status !== 'ACTIVE' || loading}>
          {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}{menuData?.status !== 'ACTIVE' ? 'Sold Out' : `Add to Cart (${calculateTotal().toFixed(2)}kyats)`}
        </Button>
      </div>
      <DialogToDelete
        open={isDeleteDia}
        onOpenChange={handleDeleteDialog}
        id={idToDelete}
        type="previous cart"
        handleDeleteMenu={handleDeleteCart}
      />
    </div>
  );
};

export default UserMenuDetail;
