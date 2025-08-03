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
import { CheckCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion"

export default function Payment() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const orderId = useSelector((state: RootState) => state.order.orderId);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userId = Cookies.get("userId");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)

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
      setLoading(true)
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
          setShowSuccessMessage(true)
          setLoading(false)
        }
      }
    } catch (e) {
      console.error("Payment error: ", e);
    }
  };

  return (
    <motion.div className="flex flex-col mt-[100px] items-center bg-white text-black"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {showSuccessMessage ? <div className="text-center mt-[100px]">
          <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-6">Thank you for your payment. Your order is being processed.</p>
          <Button onClick={() => navigate("/order_list")}>Check Orders</Button>
        </div> : 
      <>
        <h1 className="text-2xl text-primary font-bold mb-6">Please upload your payment screenshot</h1>
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

        <Button disabled={!selectedFile || loading} onClick={handleSubmit}>
          {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}Submit Payment
        </Button>
      </>
      }
    </motion.div>
  );
}
