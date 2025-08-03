/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import Table from '../../components/ui/table';
import type { TableConfig } from '../../components/ui/tableConfig';
import Pagination from '../../components/ui/pagination';
import type { DeliOrderStatus } from '../../types/orders.type';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { assignDeliveryByRestaurant, getDeliveryByRestaurant } from '../../features/delivery/deliverySlice';
import { getAllOrdersByRestaurant } from '../../features/order/orderSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"

const PAGE_SIZE = 10;

const DeliOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData]= useState<any>([])
  const totalPages = Math.ceil(ordersData?.length / PAGE_SIZE);
  const paginatedOrders = ordersData?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const dispatch = useDispatch<AppDispatch>()
  const { data: allData } = useSelector((state: RootState) => state.delivery.searched);
  const { data: allOrdersData, loading } = useSelector((state: RootState) => state.order.searched);
  const [assignStatus, setAssignStatus] = useState(false)
  const [deliveryList, setDeliveryList] = useState<any>([])
  const navigate = useNavigate()

  const deliTableConfig: TableConfig = [
  { key: 'id', label: 'Order #', render: (row: any) => (
      <button
        onClick={() => void navigate(`/orders/${String(row.id)}`)}
        className="text-blue-600 hover:underline"
      >
        {row.id}
      </button>
    ),},
  { key: 'amount', label: 'Amount(kyats)', render: row => row.totalAmount },
  { key: 'orderDateTime', label: 'Date', render: row => new Date(row.orderDateTime).toISOString().slice(0, 10) },
  { key: 'status', label: 'Status', render: row =>
      row.deliveryStatus === 'assigned'
        ? 'ASSIGNED'
        : row.deliveryStatus.toUpperCase(),
   },
];

  const handleApprove = async(row: any,deliveryPersonId?: string) => {
    const updatedOrders = await ordersData.map((order:any) =>
      order.id === row.id
        ? {
            ...order,
            deli_order_status: 'assigned' as DeliOrderStatus,
            assigned_to: deliveryPersonId,
          }
        : order
    );
    setOrdersData(updatedOrders);
    const payload:any = {
      orderId: row.id,
      deliveryId: Number(deliveryPersonId)
    }
    await assignDelivery((payload))
  };

  const assignDelivery = async(payload:any)=>{
    try{
      const result = await dispatch(assignDeliveryByRestaurant(payload))
      if(result.type==='delivery/assignDeliveryByRestaurant/fulfilled'){
        setAssignStatus(!assignStatus)
        toast.success('Successfully assigned delivery')
      }else if(result.type==='delivery/assignDeliveryByRestaurant/rejected'){
        toast.error(result.payload.data)
      }
    }catch(e){
      console.log("error ", e)
    }
  }

  const getDeliveryDataByRestaurant = async()=>{
    try{
      await dispatch(getDeliveryByRestaurant())
    }catch(e){
      console.log("error ", e)
    }
  }

  useEffect(()=>{
    void getDeliveryDataByRestaurant()
    void getAllOrdersData()
  },[assignStatus])

  useEffect(()=>{
    console.log("All data ", allData)
    if(allData&&allData.length!==0){
      setDeliveryList(allData)
    }
  },[allData])

  const getAllOrdersData = async()=>{
    try{
      await dispatch(getAllOrdersByRestaurant())
    }catch(e){
      console.log("error ", e)
    }
  }

  useEffect(()=>{
    const orderData = allOrdersData as any;
    if(allOrdersData&&orderData?.data?.length!==0){
      setOrdersData(orderData?.data)
    }
  },[allOrdersData])

  return (
    <motion.div className="w-full mx-auto px-2 md:px-0" initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-bold text-gray-700">Orders</h2>
      <p className="text-sm pt-1">Organising your foods into categories allow you to more easily manage your foods</p>           
      <div className="bg-white rounded-lg shadow mt-6 pt-6">
        {
          loading ? <div className='flex mt-6 h-full justify-center items-center'>
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div> : ordersData?.length > 0 ?
          <>
            <Table
              data={paginatedOrders}
              config={deliTableConfig}
              showActions={true}
              onApprove={handleApprove as any}
              deliveryPersons={deliveryList}
            />
            <div className="flex justify-center mt-8 pb-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </> : <div className="text-center text-gray-500 py-8">No orders to show.</div>
        }
      </div>
    </motion.div>
  );
};

export default DeliOrderList;
