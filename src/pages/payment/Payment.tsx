/* eslint-disable @typescript-eslint/no-misused-promises */
import { useEffect, useState } from "react";
import DropZoneMenuImage from "../../components/menus/DropZoneMenuImge";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { makePayment, uploadPaymentImage } from "../../features/order/orderSlice";
import { Button } from "../../components/ui/button";
import { toast } from "react-toastify";
import type { AppDispatch, RootState } from "../../store";

export default function Payment() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const orderId = useSelector((state: RootState) => state.order.orderId);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");

  useEffect(() => {
    if (!orderId) {
      toast.error("Order ID not found");
      void navigate("/cart");
    }
  }, [orderId, navigate]);

  const handleSubmit = async () => {
    if (!selectedFile || !orderId) return;

    const data = {
      orderId: Number(orderId),
      userId: Number(userId),
      restaurantId: Cookies.get("cartRestaurantId"),
      paymentMethod: "screen shot upload"
    };

    try {
      const result = await dispatch(makePayment(data));
      const payloadResult = result.payload;
      if (payloadResult.code === 201) {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadResult = await dispatch(uploadPaymentImage({ formData, paymentId: String(payloadResult.data.id) }));
        const uploadPayload = uploadResult.payload;
        if (uploadPayload.status === 200) {
          toast.success("Payment receipt uploaded successfully!");
          Cookies.remove("cartRestaurantId");
          void navigate("/");
        }
      }
    } catch (e) {
      console.error("Payment error: ", e);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white text-black">
      <h1 className="text-2xl text-primary font-bold mb-4">Please upload your payment screenshot</h1>
      <div className="lg:w-[500px] h-[400px] overflow-hidden mb-8">
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            className="h-full w-full object-cover rounded"
          />
        ) : (
          <DropZoneMenuImage setDropDrown={(files) => {
            setSelectedFile(files[0]);
          }} />
        )}
      </div>

      <Button disabled={!selectedFile} onClick={handleSubmit}>
        Submit Payment
      </Button>
    </div>
  );
}
