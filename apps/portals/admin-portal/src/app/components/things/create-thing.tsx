import {useForm} from "react-hook-form";
import {CreateThingRequest, CreateThingRequestSchema} from "@swap/api";
import {useCreateThing} from "../../api/things.api";
import {useNavigate} from "react-router-dom";
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from "@swap/uikit";

export const CreateThing = () => {

  const {
    mutate: createThing,
    isPending: isSaving,
  } = useCreateThing();

  const {
    register,
    handleSubmit,
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

          <div>
            <div>
              Name
            </div>
            <input
              id="name"
              {...register("name")}
            />
          </div>

          <div>
            <div>
              Description
            </div>
            <textarea
              id="description"
              {...register("description")}
              placeholder="Describe this thing"
            />
          </div>


          <div>
            <Button type="submit" disabled={isSaving} onClick={() => navigate("/things")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              Save
            </Button>
          </div>
      </form>
    </div>
  )
}

