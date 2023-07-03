import {useApi, useFetchQuery} from "../util/fetch/use-fetch";
import {useMutate} from "../util/fetch/use-mutate";
import {Thing} from "@swap/common/dist/dto/thing";
import {config} from "../config";

const serverUrl = config.serverUrl;

export const useListThings = () => {
  return useApi(['list-thing'], async (_, token): Promise<Thing[]> => {
    const res = await fetch(`${serverUrl}/api/thing`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      method: 'GET',
    });
    return res.json() as Thing[];
  });
}

export const useFetchThing = (id: number) => {
  return useFetchQuery(`fetch-thing-${id}`, `/api/thing/${id}`);
}

export const useCreateThing = () => {
  return useMutate('create-thing', '/api/thing');
}
