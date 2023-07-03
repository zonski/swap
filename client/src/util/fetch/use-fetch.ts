import {useAuth0} from "@auth0/auth0-react";
import {config} from "../../config";
import {useQuery, UseQueryOptions} from "react-query";

const serverUrl = config.serverUrl;

export const useFetchQuery = <ResultType>(key: string, endpoint: string) => {
  const auth0 = useAuth0();

  const fetchCall = async (): Promise<ResultType> => {
    const accessToken = await auth0.getAccessTokenSilently({
      authorizationParams: {
        audience: config.auth0.audience
      },
    });
    const res = await fetch(`${serverUrl}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      method: 'GET',
    });
    return res.json() as ResultType;
  }

  return useQuery([key], fetchCall);
}

export const fetchWithToken = async <ResultType>(endpoint: string, token: string) => {
  const res = await fetch(`${serverUrl}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'GET',
  });
  return res.json() as ResultType;
}


export function useApi<
  TQueryKey extends [string, Record<string, unknown>?],
  TQueryFnData,
  TError,
  TData = TQueryFnData
  >(
  queryKey: TQueryKey,
  fetcher: (params: TQueryKey[1], token: string) => Promise<TQueryFnData>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    "queryKey" | "queryFn"
    >
) {
  const { getAccessTokenSilently } = useAuth0();

  return useQuery({
    queryKey,
    queryFn: async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: config.auth0.audience
        },
      });
      return fetcher(queryKey[1], token);
    },
    ...options
  });
}
