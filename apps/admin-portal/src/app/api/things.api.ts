import {useQuery} from "@tanstack/react-query";
import {useApiDataClient} from "./data-api.hook";
import {SearchThingsRequest, SearchThingsResponse, Thing} from "@swap/server-api";

const thingQueryKeys = {
  all: ['things'] as const,
  searches: () => [...thingQueryKeys.all, 'list'] as const,
  search: (filters: SearchThingsRequest) => [...thingQueryKeys.searches(), ...Object.keys(filters)] as const,
  details: () => [...thingQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...thingQueryKeys.details(), id] as const,
}

export const useSearchThings = (request: SearchThingsRequest) => {
  const apiClient = useApiDataClient();
  return useQuery({
      queryKey: thingQueryKeys.search(request),
      queryFn: () => apiClient.get<SearchThingsResponse>("/things", {params: request})
    }
  );
};

export const useGetThing = (id?: string) => {
  const apiClient = useApiDataClient();
  return useQuery({
      queryKey: thingQueryKeys.detail(id!),
      queryFn: () => apiClient.get<Thing>(`/things/${id}`),
      enabled: !!id
    }
  );
};
