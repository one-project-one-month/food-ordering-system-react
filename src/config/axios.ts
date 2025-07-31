/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const url = import.meta.env.VITE_API_URL;

const api = axios.create({
 baseURL: url,
});


// Queue to hold failed requests during token refresh
let isRefreshing = false;
let failedQueue: {
 resolve: (value?: unknown) => void;
 reject: (reason?: unknown) => void;
}[] = [];


const processQueue = (error: Error | null, token: string | null) => {
 failedQueue.forEach((prom) => {
   if (error) {
     prom.reject(error);
   } else {
     prom.resolve(token);
   }
 });
 failedQueue = [];
};

api.interceptors.request.use(
 (config) => {
   const token = Cookies.get('token');
   if (token) {
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
 },
 (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError): Promise<AxiosResponse | void> => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    const isExpiredToken =
    (error.response?.status === 401) ||
    (error.response?.status === 500);

    if (isExpiredToken && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const storedRefreshToken = Cookies.get('refreshToken');
          if (!storedRefreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axios.post(
            `${url}/api/v1/auth/users/getRefreshToken`,
            {},
            {
              headers: {
                Authorization: `Bearer ${storedRefreshToken}`,
              }
            }
          );
          const newRefreshToken: string = response.data.data.refreshToken;

          if (newRefreshToken) {
            Cookies.set('token', newRefreshToken, { expires: 1 });
            Cookies.set('refreshToken', newRefreshToken, { expires: 1 });
          }

          processQueue(null, newRefreshToken);
          isRefreshing = false;

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newRefreshToken}`;
          }

          return await api(originalRequest);
        } catch (refreshError) {
          const err = refreshError instanceof Error ? refreshError : new Error('Token refresh failed');
          processQueue(err, null);
          isRefreshing = false;
          Cookies.remove("role");
          Cookies.remove("userId");
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          Cookies.remove("restaurantId")
          Cookies.remove("logged_in")
          window.location.href = '/login';
          return Promise.reject(err);
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: unknown) => {
            if (typeof token === 'string' && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(api(originalRequest));
          },
          reject: (err) => {
            reject(err instanceof Error ? err : new Error('Retry queue failed'));
          },
        });
      });
    }

    return Promise.reject(error instanceof Error ? error : new Error('Unknown error'));
  }
);


export default api;



