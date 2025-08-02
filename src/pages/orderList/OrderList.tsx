/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { useEffect, useState } from 'react';
import type { OrderStatus } from '../../types/orders.type';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { motion } from "framer-motion"
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../store';
import { getAllOrdersByCustomer } from '../../features/order/orderSlice';

const TABS: { key: OrderStatus; label: string }[] = [
  { key: 'completed', label: 'Completed' },
  { key: 'pending', label: 'Ongoing' },
  { key: 'canceled', label: 'Canceled' },
];

const OrderList = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('pending');
  const dispatch = useDispatch<AppDispatch>()
  const [ordersData, setOrdersData] = useState<any>([])

    const getCustomerOrdersData = async()=>{
      const page=0
      const size=20
      const status = activeTab.toUpperCase();
      try{
        const result = await dispatch(getAllOrdersByCustomer({page,size,status}))
        if(result.type==='order/getAllOrdersByCustomer/fulfilled'){
         setOrdersData(result.payload.data)
        }else {
          setOrdersData([]);
        }
      }catch(e){
        console.log("error ", e)
        setOrdersData([]);
      }
    }
  
    useEffect(()=>{
      void getCustomerOrdersData()
    },[activeTab])

  return (
    <motion.div className="container mx-auto px-2 md:px-0 py-8" initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <div className='max-w-5xl mx-auto'>
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 justify-center">
        {TABS.map(tab => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'outline'}
            className={`rounded-full px-6 py-2 text-base font-semibold transition-colors duration-200 ${activeTab === tab.key ? '' : 'bg-white'}`}
            onClick={() => { setActiveTab(tab.key); }}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 min-h-[600px]">
        {ordersData.length === 0 && (
          <Card>
            <CardContent className="text-center h-full flex items-center justify-center py-8 text-muted-foreground">
              You don't have any orders yet.
            </CardContent>
          </Card>
        )}
        {ordersData?.map((order:any) => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-lg md:text-xl flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-bold">
                  Order #{order.id}
                </span>
                <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {order?.deliveryStatus?.charAt(0).toUpperCase() + order?.deliveryStatus?.slice(1)}
                </span>
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {new Date(order?.orderDateTime).toLocaleString()}
              </span>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Total Amount
                </div>
                <div className="font-medium">
                  {order.totalAmount.toFixed(2)} kyats
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  Delivery Status
                </div>
                <div className={`font-medium ${order.deliveryStatus === 'delivered' ? 'text-green-600' : order.deliveryStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {order.deliveryStatus.charAt(0).toUpperCase() + order.deliveryStatus.slice(1)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </motion.div>
  );
};

export default OrderList;
