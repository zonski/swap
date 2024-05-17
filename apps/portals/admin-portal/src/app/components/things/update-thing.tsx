import {useForm} from "react-hook-form";
import {UpdateThingRequest, UpdateThingRequestSchema} from "@swap/api";
import {useGetThing, useUpdateThing} from "../../api/things.api";
import {useNavigate, useParams} from "react-router-dom";
import {zodResolver} from "@hookform/resolvers/zod";

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

  return thing ? (
    <div>
      <h1>Update {thing.name}</h1>
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
            Name
          </div>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Describe this thing"
          />
        </div>

        <div>
          <button type="submit" disabled={isSaving} onClick={() => navigate(`/things/${thingId}`)}>
            Cancel
          </button>
          <button type="submit" disabled={isSaving}>
            Save
          </button>
        </div>
      </form>
    </div>
  ) : (
    <div>
      Thing was not found
    </div>
  )
}

