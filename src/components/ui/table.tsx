import React from 'react';
import { Button } from './button';
import type { TableConfig } from './tableConfig';

interface TableProps {
  data: any[];
  config: TableConfig;
  onApprove?: (row: any) => void;
  onReject?: (row: any) => void;
  showActions?: boolean;
}

const Table: React.FC<TableProps> = ({ data, config, onApprove, onReject, showActions }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white rounded shadow text-sm">
        <thead>
          <tr>
            {config.map(field => (
              <th
                key={field.key}
                className={`px-4 py-2 font-semibold text-gray-700 text-${field.align || 'left'}`}
                style={field.width ? { width: field.width } : {}}
              >
                {field.label}
              </th>
            ))}
            {showActions && <th className="px-4 py-2 text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id} className="border-b last:border-none">
              {config.map(field => (
                <td
                  key={field.key}
                  className={`px-4 py-2 text-${field.align || 'left'}`}
                >
                  {field.render ? field.render(row) : row[field.key]}
                </td>
              ))}
              {showActions && (
                <td className="px-4 py-2 text-center flex gap-2 justify-center">
                  {row.deli_order_status === 'pending_approval' ? (
                    <>
                      <Button
                        variant="default"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                        onClick={() => onApprove && onApprove(row)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        onClick={() => onReject && onReject(row)}
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}
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
