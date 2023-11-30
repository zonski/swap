import {useGetThing} from "../../api/things.api";
import {Link as ReactRouterLink, useParams} from "react-router-dom";
import {Button} from "@chakra-ui/react";

export const ViewThing = () => {

  const { thingId } = useParams();
  const {data: thing, isLoading, isError, error} = useGetThing(thingId);

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>There was an error loading the details: {JSON.stringify(error)}</div>
  }
  if (!thing) {
    return <div>Thing was not found</div>
  }

  return (
    <div>
      <h1>{thing.name}</h1>

      <div>
        <Button as={ReactRouterLink} to="edit" variant='brand'>
          Edit
        </Button>
      </div>

      <div>Data: {JSON.stringify(thing)}</div>
    </div>
  )
}

