import {useMutation, useQuery} from "@tanstack/react-query";
import {useApiDataClient} from "./data-api.hook";
import {
  ApiError,
  CreateThingRequest,
  SearchThingsRequest,
  SearchThingsResponse,
  Thing,
  UpdateThingRequest
} from "@swap/api";

const thingQueryKeys = {
  all: ['things'] as const,
  searches: () => [...thingQueryKeys.all, 'list'] as const,
  search: (filters: SearchThingsRequest) => [...thingQueryKeys.searches(), ...Object.keys(filters)] as const,
  details: () => [...thingQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...thingQueryKeys.details(), id] as const,
}

export const useSearchThings = (request: SearchThingsRequest) => {
  const apiClient = useApiDataClient();
  return useQuery<unknown, ApiError, SearchThingsResponse>({
      queryKey: thingQueryKeys.search(request),
      queryFn: () => apiClient.get<SearchThingsResponse>("/things", {params: request})
    }
  );
};

export const useGetThing = (id?: string) => {
  const apiClient = useApiDataClient();
  return useQuery<unknown, ApiError, Thing>({
      queryKey: thingQueryKeys.detail(id!),
      queryFn: () => apiClient.get<Thing>(`/things/${id}`),
      enabled: !!id,
    }
  );
};

export const useCreateThing = () => {
  const apiClient = useApiDataClient();
  return useMutation<Thing, ApiError, CreateThingRequest>({
    mutationFn: (request: CreateThingRequest) => {
      return apiClient.post<Thing>('/things', request)
    },
  })
};

export const useUpdateThing = () => {
  const apiClient = useApiDataClient();
  return useMutation<Thing, ApiError, UpdateThingRequest>({
    mutationFn: (request: UpdateThingRequest) => {
      return apiClient.put<Thing>('/things', request)
    },
  })
};
