import {useForm} from "react-hook-form";
import {UpdateThingRequest, UpdateThingRequestSchema} from "@swap/server-api";
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import {useGetThing, useUpdateThing} from "../../api/things.api";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoadingPanel} from "../common/loading/LoadingPanel";
import {ErrorMessage} from "../common/error/ErrorMessage";

export const UpdateThing = () => {

  const {thingId} = useParams();
  const {
    data: thing,
    isLoading,
    isError: isLoadError,
    error: loadError
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
    values: thing,
    resolver: zodResolver(UpdateThingRequestSchema),
  });

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (request) => {
    createThing(request, {
      onSuccess: () => {
        navigate(`/things/${thingId}`);
      }
    })
  });

  return (
    <LoadingPanel isLoading={isLoading} isError={isLoadError} error={loadError}>
      {thing ? (
        <div>
          <h1>Update {thing.name}</h1>
          <form onSubmit={onSubmit}>
            <Box>

              <FormControl isInvalid={!!errors.name}>
                <FormLabel htmlFor="name">
                  Name
                </FormLabel>
                <Input
                  id="name"
                  {...register("name")}
                />
                {errors.name && (<FormErrorMessage>{errors.name.message}</FormErrorMessage>)}
              </FormControl>

              <FormControl isInvalid={!!errors.description}>
                <FormLabel htmlFor="description">
                  Name
                </FormLabel>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Describe this thing"
                />
                {errors.description && (<FormErrorMessage>{errors.description.message}</FormErrorMessage>)}
              </FormControl>

              {isSaveError && (<ErrorMessage error={saveError} inline={true}/>)}

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
      ) : (
        <div>
          Thing was not found
        </div>
      )}
    </LoadingPanel>
  )
}

