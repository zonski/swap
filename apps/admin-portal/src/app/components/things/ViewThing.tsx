import {useGetThing} from "../../api/things.api";
import {Link as ReactRouterLink, useParams} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import {LoadingPanel} from "../common/loading/LoadingPanel";

export const ViewThing = () => {

  const {thingId} = useParams();
  const {data: thing, isLoading, isError, error} = useGetThing(thingId);

  return (
    <LoadingPanel isLoading={isLoading} isError={isError} error={error}>
      {thing ? (
        <div>
          <h1>{thing.name}</h1>

          <div>
            <Button as={ReactRouterLink} to="edit" variant='brand'>
              Edit
            </Button>
          </div>

          <div>Data: {JSON.stringify(thing)}</div>
        </div>
      ) : (
        <div>
          Thing was not found
        </div>
      )}
    </LoadingPanel>
  )
}

