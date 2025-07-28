import { useState } from 'react';
import { orders } from '../../data/orders';
import { restaurants } from '../../data/restaurant';
import Table from '../../components/ui/table';
import type { TableConfig } from '../../components/ui/tableConfig';
import Pagination from '../../components/ui/pagination';
import type { DeliOrderStatus } from '../../types/orders.type';

const deliTableConfig: TableConfig = [
  { key: 'id', label: 'Order #', render: row => row.id.toString().padStart(8, '0') },
  { key: 'restaurant', label: 'Placed by', render: row => row.restaurant },
  { key: 'orderDateTime', label: 'Date', render: row => new Date(row.orderDateTime).toISOString().slice(0, 10) },
  { key: 'status', label: 'Status', render: row => row.deli_order_status.toUpperCase() },
];

function getRestaurantName() {
  const idx = Math.floor(Math.random() * restaurants.length);
  return restaurants[idx]?.name || 'Unknown';
}

const getOrdersWithRestaurant = () => {
  return orders.map(order => ({ ...order, restaurant: getRestaurantName() }));
};

const PAGE_SIZE = 10;

const DeliOrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(getOrdersWithRestaurant());
  const filteredOrders = data.filter(order => order.status === 'ongoing');
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = filteredOrders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleApprove = (row: any) => {
    setData(prevData =>
      prevData.map(order =>
        order.id === row.id
          ? { ...order, deli_order_status: 'approved' as DeliOrderStatus }
          : order
      )
    );
  };
  const handleReject = (row: any) => {
    setData(prevData =>
      prevData.map(order =>
        order.id === row.id
          ? { ...order, deli_order_status: 'rejected' as DeliOrderStatus }
          : order
      )
    );
  };

  return (
    <div className="w-full mx-auto px-2 md:px-0">
      <h2 className="text-3xl font-bold text-gray-700">Orders</h2>
      <p className="text-sm pt-1">Organising your foods into categories allow you to more easily manage your foods</p>           
      <div className="bg-white rounded-lg shadow mt-6 pt-6">
        {/* <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Deli Orders</h2>
        </div> */}
        <Table
          data={paginatedOrders}
          config={deliTableConfig}
          showActions={true}
          onApprove={handleApprove}
          onReject={handleReject}
        />
        <div className="flex justify-center mt-8 pb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default DeliOrderList;
