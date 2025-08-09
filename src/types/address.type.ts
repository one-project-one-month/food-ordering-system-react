export interface Address {
  addressId?: number;
  region: string;
  city: string;
  township: string;
  road: string;
  street: string;
  lat?: number;
  longitude?: number;
  entityType: 'RESTAURANT' | 'CUSTOMER';
  entityId: number;
}
export interface AddressesState {
  new: RequestState<Address[]>;
  searched: RequestState<Address[]>;
  detailed: RequestState<Address>;
  address?: RequestState<Address>;
}

export interface RequestState<T = any> {
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  data?: T;
}
