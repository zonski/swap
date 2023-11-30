import {useSearchThings} from "../../api/things.api";
import {Card, Link} from "@chakra-ui/react";
import {Link as ReactRouterLink} from 'react-router-dom'

export const SearchThings = () => {

  const {data, isLoading, isError, error} = useSearchThings({});

  return (
    <div>
      <Card w='100%' p="4">
        <div>Loading {isLoading}</div>
        <div>Error: {isError} - {JSON.stringify(error)}</div>
        <h1>Things</h1>

        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
          </thead>
          <tbody>
          {data?.results?.map(thing => (
            <tr key={thing.id}>
              <td>
                {thing.id}
              </td>
              <td>
                <Link as={ReactRouterLink} to={thing.id}>{thing.name}</Link>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

