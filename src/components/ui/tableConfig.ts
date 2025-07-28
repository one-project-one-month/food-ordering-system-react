export interface TableFieldConfig {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export type TableConfig = TableFieldConfig[];
