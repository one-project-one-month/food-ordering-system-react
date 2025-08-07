 
import { useEffect, useState } from 'react';
import Table from '../../components/ui/table';
import type { TableConfig } from '../../components/ui/tableConfig';
import Pagination from '../../components/ui/pagination';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { changeDeliveryStatusByDelivery, getAssignedOrderByDelivery} from '../../features/delivery/deliverySlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';

const PAGE_SIZE = 10;

const DeliveryOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData]= useState<any>([])
  const totalPages = Math.ceil(ordersData?.length / PAGE_SIZE);
  const paginatedOrders = ordersData?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const dispatch = useDispatch<AppDispatch>()
  const { data: alldeliveriesData, loading } = useSelector((state: RootState) => state.delivery.searched);
  const [changeStatus, setChangeStatus] = useState(false)
  const navigate = useNavigate()

  const deliTableConfig: TableConfig = [
    { key: 'id', label: 'Order #', render: (row: any) => (
        <button
          onClick={() => void navigate(`/orders/${String(row.orderId)}`)}
          className="text-blue-600 hover:underline"
        >
          {row.orderId}
        </button>
      ),},
    { key: 'restaurant', label: 'Amount(kyats)', render: row => row.restaurantName },
    { key: 'customerAddress', label: 'Customer Address', render: row => row.customerAddress },
  ];

  const handleApprove = async (row: any, action: string) => {
    let payload: any;

    if (action === 'start') {
      payload = {
        orderId: row.orderId,
        status: 'ONGOING',
      };
    } else if (action === 'delivered') {
      payload = {
        orderId: row.orderId,
        deliveryStatus: 'DELIVERED',
      };
    }

    try {
      const result = await dispatch(changeDeliveryStatusByDelivery(payload));
      if (result.type === 'delivery/changeDeliveryStatus/fulfilled') {
        toast.success(result.payload.message as string);
        setChangeStatus(!changeStatus)
      } else {
        toast.error(result.payload.message as string);
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  useEffect(()=>{
    void getAllAssignedOrdersDataByDelivery()
  },[changeStatus])

  useEffect(() => {
  if (alldeliveriesData && Array.isArray(alldeliveriesData)) {
    setOrdersData(alldeliveriesData);
  } else {
    setOrdersData([]);
  }
  }, [alldeliveriesData]);

  const getAllAssignedOrdersDataByDelivery = async()=>{
    const page = 0;
    const size = 20;
    const status = 'ACCEPTED'
    try{
      await dispatch(getAssignedOrderByDelivery({page,size,status}))
    }catch(e){
      console.log("error ", e)
    }
  }

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
              actionMode='delivery'
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

export default DeliveryOrderList;
