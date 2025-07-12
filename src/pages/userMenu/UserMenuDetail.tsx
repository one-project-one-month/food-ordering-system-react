import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";
import DummyImage from '../../assets/dummy.png'
import type { Menu } from "../../types/menus";
import { addToCart } from "../../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import type { CartItem } from "../../types/cart.types";

const sampleMenu: Menu = {
  id: 1,
  status: 'active',
  dish_Img: DummyImage,
  dish: "Deluxe Pizza",
  description: "Loaded with cheese, pepperoni, and fresh veggies.",
  price: 200,
  extras: [
    {
      id: "sauces",
      name: "Choose Your Sauce",
      options: [
        { id: "extra-cheese", name: "Extra Cheese", price: 50 },
        { id: "bbq-sauce", name: "BBQ Sauce", price: 80 },
      ],
    },
    {
      id: "toppings",
      name: "Extra Toppings",
      options: [
        { id: "olives", name: "Olives" },
        { id: "mushrooms", name: "Mushrooms" },
      ],
    },
  ],
};

const UserMenuDetail = () => {
    const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({});
    const [notes, ] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [customerNotes, setCustomerNotes] = useState('');
    const dispatch = useDispatch<AppDispatch>()

  const toggleOption = (optionId: string) => {
    setSelectedExtras((prev) => ({
      ...prev,
      [optionId]: !prev[optionId],
    }));
  };

  const increment = () => setQuantity(prev => prev + 1);
  const decrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    const selected = Object.entries(selectedExtras)
      .filter(([, checked]) => checked)
      .map(([id]) => id);
    const cartItem: CartItem = {
        id: sampleMenu.id,
        dish: sampleMenu.dish,
        status: sampleMenu.status,
        dish_Img: sampleMenu.dish_Img,
        price: sampleMenu.price,
        selectedExtras: selected,
        notes,
        quantity: quantity,
        totalAmount: calculateTotal(),
    };
    dispatch(addToCart(cartItem));
  console.log("Cart Item:", cartItem);
  };

  const calculateTotal = () => {
    let extrasTotal = 0;

    sampleMenu?.extras?.forEach(extra => {
      extra?.options.forEach(option => {
        if (selectedExtras[option.id]) {
          extrasTotal += option.price ?? 0;
        }
      });
    });

    return (sampleMenu.price + extrasTotal) * quantity;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <img
        src={
            typeof sampleMenu.dish_Img === 'string'
            ? sampleMenu.dish_Img
            : sampleMenu.dish_Img ? URL.createObjectURL(sampleMenu.dish_Img) : ''
        }
        alt={sampleMenu.dish}
        className="w-full h-64 object-cover rounded-xl shadow"
      />
      <div>
        <h1 className="text-2xl font-bold">{sampleMenu.dish}</h1>
        <p className="text-gray-600 mt-2">{sampleMenu.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Extras</h2>
        <Accordion type="multiple" className="w-full">
          {sampleMenu?.extras?.map((extra) => (
            <AccordionItem key={extra.id} value={extra.id}>
              <AccordionTrigger>{extra.name}</AccordionTrigger>
              <AccordionContent>
                {extra.options.map((option) => (
                    <div key={option.id} className="flex items-start space-x-2 py-1">
                    <Checkbox
                        id={option.id}
                        checked={selectedExtras[option.id] || false}
                        onCheckedChange={() => toggleOption(option.id)}
                    />
                    <div>
                        <label htmlFor={option.id} className="text-sm font-medium">
                        {option.name}
                        {option.price && (
                            <span className="text-gray-500 text-xs ml-1">
                            ({option.price}kyats)
                            </span>
                        )}
                        </label>
                    </div>
                    </div>
                ))}
                </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

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
            onChange={(e) => setCustomerNotes(e.target.value)}
        />
    </div>
      {/* Add to Cart */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <div className="flex items-center border rounded-md h-[36px] overflow-hidden">
          <button
            onClick={decrement}
            className="px-3 text-sm text-white h-full font-medium bg-primary"
          >−</button>
          <span className="px-3 text-sm w-[37px] h-full flex justify-center items-center font-medium">{quantity}</span>
          <button
            onClick={increment}
            className="px-3 text-sm text-white h-full font-medium bg-primary"
          >+</button>
        </div>
        <Button className="flex-1" onClick={handleAddToCart}>
          Add to Cart {`(${calculateTotal().toFixed(2)}kyats)`}
        </Button>
      </div>
    </div>
  );
};

export default UserMenuDetail;
