  export interface RequestState<T = any> {
    loading: boolean;
    error: boolean;
    errorMessage?: string;
    contents?: T;
    data?: T;
  }

export interface DashboardState {
  ownerSummaryData: RequestState<Dashboard>;
  deliverySummaryData: RequestState<Dashboard>;
}

export type Dashboard = Record<string, unknown>;