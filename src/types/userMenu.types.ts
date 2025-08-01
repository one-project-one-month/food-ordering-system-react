export interface UserMenuState {
  searched: RequestState<UserMenu[]>;
}

export interface RequestState<T = any> {
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    data?: T;
}

export type UserMenu = Record<string, unknown>;