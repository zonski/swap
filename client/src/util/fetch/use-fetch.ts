import {useAuth0} from "@auth0/auth0-react";
import {config} from "../../config";
import {useQuery} from "react-query";

const serverUrl = config.serverUrl;

export const useFetchQuery = <ResultType>(key: string, endpoint: string) => {
  const auth0 = useAuth0();

  const fetchCall = async () => {
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
    return res.json();
  }

  return useQuery(key, fetchCall);
}
