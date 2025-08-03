import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import type { AppDispatch } from '../../store'
import { getOrderDetailByOrderId } from '../../features/cart/cartSlice'
import { Loader2 } from 'lucide-react'
import Cookies from 'js-cookie'
import { motion } from "framer-motion"

const OrderDetail = () => {
    const {id}=useParams()
    const dispatch = useDispatch<AppDispatch>()
    const [loading, setLoading] = useState(true);
    const [detailData, setDetailData] = useState<any>([])
    const userRole = Cookies.get('role')
    const getOrderDetailData = async()=>{
          try{
            const result = await dispatch(getOrderDetailByOrderId({ orderId: id }))
            const resultPayload = result.payload;
            if(resultPayload.code===200){
              setDetailData(resultPayload.data[0])
            }
          }catch(e){
            console.log("error ", e)
          }finally {
            setLoading(false);
          }
        }
      
        useEffect(()=>{
          void getOrderDetailData()
        },[])

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen text-primary">
            <Loader2 className="animate-spin w-8 h-8" />
            <span className="ml-2">Loading order details...</span>
        </div>
        )
    }

    if (!detailData) {
        return (
        <div className="text-center mt-10 text-red-500 font-semibold">
            Order detail not found.
        </div>
        )
    }
  return (
    <motion.div className='' initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
        <h2 className="text-3xl font-bold text-gray-700">Order Detail</h2> 
        <div className="min-w-full bg-white rounded-lg shadow text-sm mt-6 p-5">         
            <div className="flex gap-4">
                <img
                src={detailData.dish?.image?.replace(/^.*?(https:\/)/, 'https:/')}
                alt={detailData.dish?.name}
                className="w-32 h-32 object-cover rounded-md"
                />
                <div>
                <h3 className="text-xl font-medium mb-3">{detailData.dish?.name}</h3>
                {userRole!=='owner' && <p className="text-sm text-gray-600 mb-1">From: {detailData.dish?.restaurant?.name}</p>}
                <p className="text-sm text-gray-600 mb-1">Quantity: {detailData.quantity}</p>
                <p className="text-sm text-gray-600 mb-1">
                    Price: {(detailData.dish?.price).toFixed(2)} MMK
                </p>
                </div>
             </div>
        </div>
    </motion.div>
  )
}

export default OrderDetail
