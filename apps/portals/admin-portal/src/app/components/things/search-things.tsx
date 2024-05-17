import {useSearchThings} from "../../api/things.api";

export const SearchThings = () => {

  const {data} = useSearchThings({});

  return (
    <div>
      <div>
        <h1>Things</h1>

        <div>
          <button>Create Thing</button>
        </div>

        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {data?.items?.map(thing => (
            <tr key={thing.id}>
              <td>
                {thing.id}
              </td>
              <td>
                <a>{thing.name}</a>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

