import React, { useState } from 'react';
import { orders } from '../../data/orders';
import type { OrderStatus } from '../../types/orders.type';
import { Button } from '../../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';

const TABS: { key: OrderStatus; label: string }[] = [
  { key: 'completed', label: 'Completed' },
  { key: 'ongoing', label: 'Ongoing' },
  { key: 'canceled', label: 'Canceled' },
];

const OrderList = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('completed');
  const filteredOrders = orders.filter(order => order.status === activeTab);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-0 py-8">
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 justify-center">
        {TABS.map(tab => (
          <Button
            key={tab.key}
            variant={activeTab === tab.key ? 'default' : 'outline'}
            className={`rounded-full px-6 py-2 text-base font-semibold transition-colors duration-200 ${activeTab === tab.key ? '' : 'bg-white'}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6">
        {filteredOrders.length === 0 && (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              No orders found for this status.
            </CardContent>
          </Card>
        )}
        {filteredOrders.map(order => (
          <Card key={order.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <CardTitle className="text-lg md:text-xl flex flex-col md:flex-row md:items-center gap-2">
                <span className="font-bold">
                  Order #{order.id}
                </span>
                <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-700' : order.status === 'ongoing' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </CardTitle>
              <span className="text-sm text-muted-foreground">
                {new Date(order.orderDateTime).toLocaleString()}
              </span>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">
                  User Address
                </div>
                <div className="font-medium break-words">
                  {order.user_Address}
                </div>
              </div>
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
                <div className={`font-medium ${order.delivery_status === 'delivered' ? 'text-green-600' : order.delivery_status === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {order.delivery_status.charAt(0).toUpperCase() + order.delivery_status.slice(1)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
