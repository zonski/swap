import {useFetchQuery} from "../util/fetch/use-fetch";
import {useMutation} from "react-query";

export const useFetchThing = () => {
  return useFetchQuery('thing', '/api/thing');
}

export const useCreateThing = () => {
  return useMutation('thing', '/api/thing');
}
