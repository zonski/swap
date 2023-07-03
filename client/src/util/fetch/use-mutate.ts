import {useAuth0} from "@auth0/auth0-react";
import {config} from "../../config";
import {useMutation} from "react-query";

const serverUrl = config.serverUrl;

export const useMutate = <RequestType, ResultType>(key: string, endpoint: string) => {
  const auth0 = useAuth0();

  const mutateCall = async (body: RequestType) => {
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
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
    return res.json() as ResultType;
  }

  return useMutation(key, mutateCall);
}
