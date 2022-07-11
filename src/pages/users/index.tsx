import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, Link } from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import Pagination from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";


import NextLink from 'next/link'
import { useEffect, useState } from "react";

import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from '../../services/queryClient'
import { api } from "../../services/api";
import { GetServerSideProps } from "next";
// type User = {
//   id: string;
//   name: string
//   email: string
//   created_at: string

// }

export default function UserList({ users }) {

  console.log('users recebido', users)

  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isFetching, error } = useUsers(page, {
    initialData: users
  });

  console.log('data', data)
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true

  })

  async function handlePrefetchUser(userId: string) {

    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`)


      return response.data
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutor
    })

  }

  return (
    <Box>

      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" >
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading
              size="lg"
              fontWeight="normal"
            >
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}

            </Heading>


            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="pink"
                leftIcon={
                  <Icon
                    as={RiAddLine}
                    fontSize="20"
                  ></Icon>
                }
              >
                Criar Novo
              </Button>
            </NextLink>




          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>

          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados do usuários.</Text>

            </Flex>

          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={{ base: "4", sm: "4", md: "4", lg: "6" }} color="gray.300" w="8">
                      <Checkbox colorScheme="pink"></Checkbox>
                    </Th>
                    <Th>Usuário</Th>

                    {isWideVersion && <Th>Data de cadastro</Th>}

                    <Th w="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <>
                        <Tr key={user.id}>
                          <Td px={{ base: "4", sm: "4", md: "4", lg: "6" }}>
                            <Checkbox colorScheme="pink"></Checkbox>
                          </Td>
                          <Td>
                            <Box>
                              <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text fontWeight="bold"> {user.name} </Text>
                              </Link>
                              <Text fontSize="sm" color="gray.300"> {user.email} </Text>
                            </Box>
                          </Td>

                          {isWideVersion && <Td>
                            {user.created_at}
                          </Td>}
                          <Td>
                            {isWideVersion &&
                              <Button
                                as="a"
                                size="sm"
                                fontSize="small"
                                colorScheme="purple"
                                leftIcon={
                                  <Icon
                                    as={RiPencilLine}
                                    fontSize="16"
                                  ></Icon>
                                }
                              >
                                Editar
                              </Button>
                            }
                          </Td>
                        </Tr>
                      </>
                    )

                  })}
                </Tbody>

              </Table>

              <Pagination
                onPageChange={setPage}
                totalCountOfRegiters={data.totalCount}
                currentPage={page}

              />
            </>
          )}

        </Box>
      </Flex>

    </Box>
  )
}

/* miragejs não da suporte a ssr
export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users
    }

  }

}
*/