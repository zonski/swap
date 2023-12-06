import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {ZodType, ZodTypeDef} from "zod";
import {config} from "../../config";
import {ApiError} from "@swap/server-api";

const apiUrl = config.apiBaseUrl;

interface DataClientOptions {
  ignore401?: boolean;
}

export interface DataClient {
  get<T>(url: string, config?: ApiRequestConfig<T>): Promise<T>;

  post<T>(url: string, data?: unknown, config?: ApiRequestConfig<T>): Promise<T>;

  put<T>(url: string, data?: unknown, config?: ApiRequestConfig<T>): Promise<T>;

  delete<T>(url: string, config?: ApiRequestConfig<T>): Promise<T>;
}

/**
 * Creates an Axios Api client wrapper that will automatically extract the data from the response.
 * In most cases this is all you need but if you need access to the axios response then use
 * `useApiClient` instead.
 */
export const useApiDataClient = ({ignore401}: DataClientOptions = {}): DataClient => {

  // Get admin api url from config
  const axiosClient = axios.create({baseURL: `${apiUrl}/api`});

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      // API often returns 403 when it means 401
      if ((error?.response?.status === 401 || error?.response?.status === 403) && !ignore401) {
        console.log("User token invalid. Signing out and reloading.");
        // await signOut();
        // location.reload();
      }
      const errBody = error.response.data;
      throw new ApiError(
        errBody.message,
        error.response.status,
        errBody.code,
        errBody.extra
      );
    },
  );

  return {
    async get<T>(url: string, config?: ApiRequestConfig<T>): Promise<T> {
      return toResult(axiosClient.get<T>(url, await authHeadersAndConfig(config)), config);
    },
    async post<T>(url: string, data?: unknown, config?: ApiRequestConfig<T>): Promise<T> {
      return toResult(axiosClient.post<T>(url, data, await authHeadersAndConfig(config)), config);
    },
    async put<T>(url: string, data?: unknown, config?: ApiRequestConfig<T>): Promise<T> {
      return toResult(axiosClient.put<T>(url, data, await authHeadersAndConfig(config)), config);
    },
    async delete<T>(url: string, config?: ApiRequestConfig<T>): Promise<T> {
      return toResult(axiosClient.delete<T>(url, await authHeadersAndConfig(config)), config);
    },
  };
};

const getAccessToken = () => {
  return "todo";
}

const authHeadersAndConfig = async <T>(config?: ApiRequestConfig<T>) => {
  const authToken = config?.noAuth ? undefined : await getAccessToken();
  const headers = {
    "Content-Type": "application/json",
    ...(authToken ? {Authorization: `Bearer ${authToken}`} : {}),
    ...config?.headers,
  };
  return {
    ...(config ?? {}),
    headers,
  };
};

export interface ApiRequestConfig<T> extends AxiosRequestConfig {
  noAuth?: boolean;
  schema?: ZodType<T, ZodTypeDef, unknown>;
}

const toResult = async <T>(resp: Promise<AxiosResponse<T>>, {schema}: Pick<ApiRequestConfig<T>, "schema"> = {}) => {
  const {data} = await resp;
  try {
    return schema ? schema.parse(data) : data;
  } catch (err) {
    console.error("ERROR parsing response with schema", err);
    throw err;
  }
};
