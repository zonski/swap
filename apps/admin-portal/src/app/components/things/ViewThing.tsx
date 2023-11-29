import {useGetThing} from "../../api/things.api";
import {useParams} from "react-router-dom";

export const ViewThing = () => {

  const { thingId } = useParams();
  const {data, isLoading, isError, error} = useGetThing(thingId);

  return (
    <div>
      <div>Get thing</div>
      <div>Loading {isLoading}</div>
      <div>Error: {isError} - {JSON.stringify(error)}</div>
      <div>Data: {JSON.stringify(data)}</div>
    </div>
  )
}

