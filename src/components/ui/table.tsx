/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import React, { useState } from 'react';
import { Button } from './button';
import type { TableConfig } from './tableConfig';

interface DeliveryPerson {
  id: number | string;
  name: string;
}
interface TableProps {
  data: any[];
  config: TableConfig;
  onApprove: (row: any, deliveryPersonId: string | number) => void;
  onReject?: (row: any) => void;
  showActions?: boolean;
  deliveryPersons?: DeliveryPerson[];
}

const Table: React.FC<TableProps> = ({ data, config, onApprove, showActions, deliveryPersons = [] }) => {
  const [selectedPerson, setSelectedPerson] = useState<Record<string, string | number>>({});

  const handleSelectChange = (orderId: string | number, personId: string) => {
    setSelectedPerson((prev:any) => ({ ...prev, [orderId]: personId }));
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white rounded-lg shadow text-sm">
        <thead>
          <tr>
            {config.map(field => (
              <th
                key={field.key}
                className={`px-4 py-2 font-semibold text-gray-700 text-${field.align ?? 'left'}`}
                style={field.width ? { width: field.width } : {}}
              >
                {field.label}
              </th>
            ))}
            {showActions && <th className="px-4 py-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.map(row => (
            <tr key={row.id} className="border-b last:border-none">
              {config.map(field => (
                <td
                  key={field.key}
                  className={`px-4 py-2 text-${field.align ?? 'left'}`}
                >
                  {field.render ? field.render(row) : row[field.key]}
                </td>
              ))}
              {/* {showActions && (
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  {row.deliveryStatus === 'PENDING' ? (
                    <>
                      <div className="relative w-40 h-full">
                        <select
                          className="appearance-none border pt-[8px] pb-[6px] pl-[10px] rounded-md text-sm w-full"
                          value={selectedPerson[row.id] || ''}
                          onChange={e => {handleSelectChange(String(row.id), e.target.value)}}
                        >
                          <option value="">Select Delivery</option>
                          {deliveryPersons?.map((person:any) => (
                            <option key={person.id} value={person.id}>
                              {person.name}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        className="bg-primary hover:bg-green-600 text-white px-4 py-1 rounded-md"
                        onClick={() => {
                          const deliveryId = selectedPerson[row.id];
                            if (deliveryId) {
                              onApprove(row, deliveryId);
                            }
                        }}
                        disabled={!selectedPerson[row.id]}
                      >
                        Assign
                      </Button>
                    </>
                  ) : null}
                </td>
              )} */}
              {showActions && (
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  {row.deliveryStatus === 'PENDING' && (
                    <>
                      <div className="relative w-40 h-full">
                        <select
                          className="appearance-none border pt-[8px] pb-[6px] pl-[10px] rounded-md text-sm w-full"
                          value={selectedPerson[row.id] || ''}
                          onChange={e => { handleSelectChange(String(row.id), e.target.value); }}
                        >
                          <option value="">Select Delivery</option>
                          {deliveryPersons?.map((person: any) => (
                            <option key={person.deliveryStaffId} value={person.deliveryStaffId}>
                              {person.deliveryName}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                          <svg
                            className="w-4 h-4 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 011.414-1.414L10 9.586l2.293-2.293a1 1 0 011.414 1.414l-3 3A1 1 0 0110 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                      <Button
                        variant="default"
                        className="bg-primary hover:bg-green-600 text-white px-4 py-1 rounded-md"
                        onClick={() => {
                          const deliveryId = selectedPerson[row.id];
                          if (deliveryId) {
                            onApprove(row, deliveryId);
                          }
                        }}
                        disabled={!selectedPerson[row.id]}
                      >
                        Assign
                      </Button>
                    </>
                  )}

                  {row.deliveryStatus === 'ASSIGNED' && (
                    <Button
                      variant="outline"
                      className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => { onApprove(row, 'start'); }}
                    >
                      Start Delivery
                    </Button>
                  )}

                  {row.deliveryStatus === 'ONGOING' && (
                    <Button
                      variant="outline"
                      className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                      onClick={() => { onApprove(row, 'complete'); }}
                    >
                      Complete
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
