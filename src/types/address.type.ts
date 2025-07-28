export interface Address {
  region: string;
  city: string;
  township: string;
  road: string;
  street: string;
  lat: number;
  longitude: number;
  entityType: 'RESTAURANT' | 'USER';
  entityId: number;
}
