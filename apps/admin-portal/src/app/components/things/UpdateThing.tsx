import {useForm} from "react-hook-form";
import {UpdateThingRequest} from "@swap/server-api";
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import {useGetThing, useUpdateThing} from "../../api/things.api";
import {useNavigate, useParams} from "react-router-dom";

export const UpdateThing = () => {

  const {thingId} = useParams();
  const {
    data: thing,
    isLoading,
    isError: isLoadingError,
    error: loadingError
  } = useGetThing(thingId);

  const {
    mutate: createThing,
    isPending: isSaving,
    isError: isSaveError,
    error: saveError,
  } = useUpdateThing();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<UpdateThingRequest>({
    values: thing
  });
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (request) => {
    createThing(request, {
      onSuccess: () => {
        navigate(`/things/${thingId}`);
      }
    })
  });

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (isLoadingError) {
    return <div>There was an error loading the details: {JSON.stringify(loadingError)}</div>
  }
  if (!thing) {
    return <div>Thing was not found</div>
  }

  return (
    <div>
      <h1>Update {thing.name}</h1>
      <form onSubmit={onSubmit}>
        <Box>

          <FormControl mr="5%" isInvalid={!!errors.name}>
            <FormLabel htmlFor="name">
              Name
            </FormLabel>
            <Input
              id="name"
              {...register("name", {required: true})}
            />
            {errors.name && (<FormErrorMessage>This field is required</FormErrorMessage>)}
          </FormControl>

          <FormControl mr="5%">
            <FormLabel htmlFor="description">
              Name
            </FormLabel>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Describe this thing"
            />
          </FormControl>

          {isSaveError && (<FormErrorMessage>{JSON.stringify(saveError)}</FormErrorMessage>)}

          <Flex>
            <Button variant="link" type="submit" disabled={isSaving} onClick={() => navigate(`/things/${thingId}`)}>
              Cancel
            </Button>
            <Button variant="brand" type="submit" disabled={isSaving}>
              Save
            </Button>
          </Flex>
        </Box>
      </form>
    </div>
  )
}

