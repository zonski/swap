import {useGetThing} from "../../api/things.api";
import {Link as ReactRouterLink, useParams} from "react-router-dom";

export const ViewThing = () => {

  const {thingId} = useParams();
  const {data: thing, isLoading, isError, error} = useGetThing(thingId);

  return (
    <div>
      {thing ? (
        <div>
          <h1>{thing.name}</h1>

          <div>
            <button>
              Edit
            </button>
          </div>

          <div>Data: {JSON.stringify(thing)}</div>
        </div>
      ) : (
        <div>
          Thing was not found
        </div>
      )}
    </div>
  )
}

