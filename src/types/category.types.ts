export interface categoryProps {
    id?: string;
    name: string;
    restaurantId?: number,
}

export interface CategoriesState {
  new: RequestState<Category[]>;
  searched: RequestState<Category[]>;
  detailed: RequestState<Category>;
  categories?: RequestState<Category>;
}

export interface RequestState<T = any> {
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    data?: T;
  }

  export interface CategoryFormProps {
    type: string;
    defaultValues?: categoryProps | null;
    onSubmitSuccess?: (value: categoryProps) => void;
  }
export type Category = Record<string, unknown>;