import {useListThings} from "../../api/thing.api";

export const SearchThings = () => {

  const response = useListThings();

  return (
    <>
      <div>
        Loading: {response.isLoading}
      </div>
      <div>
        <ul>
          {response.data.map(t => (
            {t.name} - {t.description}
          ))}
        </ul>
      </div>
    </>
  );
}
