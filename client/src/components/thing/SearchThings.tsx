import {useFetchThing} from "../../api/thing.api";
import {CreateThingSchema, Thing} from "@swap/common";

export const SearchThings = () => {

  const response = useFetchThing();

  const p = CreateThingSchema.parse({
    name: 'a'
  });

  return (
    <>
      <div>
        Loading: {response.isLoading}
      </div>
      <div>
        Name: {response.data?.name}
      </div>
    </>
  );
}
