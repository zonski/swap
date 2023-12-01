import {useForm} from "react-hook-form";
import {CreateThingRequest} from "@swap/server-api";
import {Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, Textarea} from "@chakra-ui/react";
import {useCreateThing} from "../../api/things.api";
import {useNavigate} from "react-router-dom";

export const CreateThing = () => {

  const {
    mutate: createThing,
    isPending: isSaving
  } = useCreateThing();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<CreateThingRequest>();

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

