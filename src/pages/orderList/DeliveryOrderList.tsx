/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react';
import Table from '../../components/ui/table';
import type { TableConfig } from '../../components/ui/tableConfig';
import Pagination from '../../components/ui/pagination';
import type { DeliOrderStatus } from '../../types/orders.type';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../store';
import { getAssignedOrderByDelivery} from '../../features/delivery/deliverySlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const deliTableConfig: TableConfig = [
  { key: 'id', label: 'Order #', render: row => row.id.toString()},
  { key: 'amount', label: 'Amount(kyats)', render: row => row.totalAmount },
  { key: 'orderDateTime', label: 'Date', render: row => new Date(row.orderDateTime).toISOString().slice(0, 10) },
  { key: 'status', label: 'Status', render: row =>
      row.deliveryStatus === 'assigned'
        ? 'ASSIGNED'
        : row.deliveryStatus.toUpperCase(),
   },
];

const PAGE_SIZE = 10;

const DeliveryOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersData, setOrdersData]= useState<any>([])
  const totalPages = Math.ceil(ordersData?.length / PAGE_SIZE);
  const paginatedOrders = ordersData?.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const dispatch = useDispatch<AppDispatch>()
  const { data: alldeliveriesData, loading } = useSelector((state: RootState) => state.delivery.searched);
  // const [assignStatus, setAssignStatus] = useState(false)

  // const handleApprove = async(row: any,deliveryPersonId?: string) => {
  //   const updatedOrders = await ordersData.map((order:any) =>
  //     order.id === row.id
  //       ? {
  //           ...order,
  //           deli_order_status: 'assigned' as DeliOrderStatus,
  //           assigned_to: deliveryPersonId,
  //         }
  //       : order
  //   );
  //   setOrdersData(updatedOrders);
  //   const payload:any = {
  //     orderId: row.id,
  //     deliveryId: Number(deliveryPersonId)
  //   }
  //   await assignDelivery((payload))
  // };

  const handleApprove = (row: any, action: string) => {
    let payload: any;

    if (action === 'start') {
      payload = {
        orderId: row.id,
        status: 'ONGOING',
      };
    } else if (action === 'complete') {
      payload = {
        orderId: row.id,
        status: 'COMPLETED',
      };
    } else {
      // assigning delivery
      payload = {
        orderId: row.id,
        deliveryId: Number(action), // deliveryPersonId
      };
    }

    // try {
    //   const result = await dispatch(assignDeliveryByRestaurant(payload));
    //   if (result.type === 'delivery/assignDeliveryByRestaurant/fulfilled') {
    //     setAssignStatus(!assignStatus);
    //     toast.success('Updated successfully');
    //   } else {
    //     toast.error(result.payload.data);
    //   }
    // } catch (e) {
    //   console.log("error ", e);
    // }
  };

  useEffect(()=>{
    void getAllAssignedOrdersDataByDelivery()
  },[])

  useEffect(()=>{
    console.log("All data ", alldeliveriesData)
  },[alldeliveriesData])

  const getAllAssignedOrdersDataByDelivery = async()=>{
    const page = 1;
    const size = 20;
    const status = 'ACCEPTED'
    try{
      await dispatch(getAssignedOrderByDelivery({page,size,status}))
    }catch(e){
      console.log("error ", e)
    }
  }

  // useEffect(()=>{
  //   const orderData = allOrdersData as any;
  //   if(allOrdersData&&orderData?.data?.length!==0){
  //     setOrdersData(orderData?.data)
  //   }
  // },[allOrdersData])

  return (
    <div className="w-full mx-auto px-2 md:px-0">
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
              deliveryPersons={deliveryPersons}
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
    </div>
  );
};

export default DeliveryOrderList;
