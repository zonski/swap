import {useForm} from "react-hook-form";
import {CreateThingRequest, CreateThingRequestSchema} from "@swap/server-api";
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import {useCreateThing} from "../../api/things.api";
import {useNavigate} from "react-router-dom";
import {zodResolver} from '@hookform/resolvers/zod';
import {ErrorMessage} from "../common/error/ErrorMessage";

export const CreateThing = () => {

  const {
    mutate: createThing,
    isPending: isSaving,
    isError: isSaveError,
    error: saveError
  } = useCreateThing();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<CreateThingRequest>({
    resolver: zodResolver(CreateThingRequestSchema),
  });

  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (request) => {
    createThing(request, {
      onSuccess: () => {
        navigate("/things");
      }
    })
  });

  return (
    <div>
      <h1>Create Thing</h1>
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
              Description
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
            <Button variant="link" type="submit" disabled={isSaving} onClick={() => navigate("/things")}>
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

