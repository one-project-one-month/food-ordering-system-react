export interface restaurantProps {
    id?: string;
    restaurantName: string,
    contactNumber: string,
    nrc: string,
    kpayNumber:string,
    resOwnerId?: number,
    restaurantImage?: string | undefined,
    onImageUploaded?: () => void;
}
   
  export interface RequestState<T = any> {
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    contents?: T;
    data?: T;
  }

export interface RestaurantState {
  new: RequestState<Restaurant[]>;
  searched: RequestState<Restaurant[]>;
  detailed: RequestState<Restaurant>;
  imageData: RequestState<Restaurant>;
}

export interface RestaurantFormProps {
  type: string;
  defaultValues?: restaurantProps | null;
}
export type RestaurantFormPropsWithImage = RestaurantFormProps & {
  onDataUpdated?: () => void;
};

export interface restaurantPicProps {
  restaurantImage: File | undefined | string;
}

export interface restaurantPicSliceProps {
  formData: FormData;
  restaurantId: string;
}

export type Restaurant = Record<string, unknown>;