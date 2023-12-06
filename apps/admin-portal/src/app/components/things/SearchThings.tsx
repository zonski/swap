import {useSearchThings} from "../../api/things.api";
import {Button, Card, Link, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react'
import {Link as ReactRouterLink} from 'react-router-dom'
import {LoadingSpinner} from "../common/loading/LoadingSpinner";
import {ErrorMessage} from "../common/error/ErrorMessage";

export const SearchThings = () => {

  const {data, isLoading, isError, error} = useSearchThings({});

  return (
    <div>
      <Card w='100%' p="4">
        <h1>Things</h1>

        <div>
          <Button
            as={ReactRouterLink} to="create"
            variant='brand'
          >Create Thing</Button>
        </div>

        <Table>
          <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Name</Th>
          </Tr>
          </Thead>
          <Tbody>
          {isLoading && <LoadingSpinner/>}
          {isError && <ErrorMessage inline={true} error={error}/> }
          {data?.items?.map(thing => (
            <Tr key={thing.id}>
              <Td>
                {thing.id}
              </Td>
              <Td>
                <Link as={ReactRouterLink} to={thing.id}>{thing.name}</Link>
              </Td>
            </Tr>
          ))}
          </Tbody>
        </Table>
      </Card>
    </div>
  )
}

