import { Box, Button, Stack, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface IPaginationProps {
  totalCountOfRegiters: number;
  registerPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;

}

const siblingsCount = 1;

function generatePagesAray(from: number, to: number) {


  return [...new Array(to - from)] // quantidade de itens no array
    .map((_, index) => {
      return from + index + 1;

    })
    .filter(page => page > 0);

}

export default function Pagination({
  totalCountOfRegiters,
  currentPage = 1,
  registerPerPage = 10,
  onPageChange
}: IPaginationProps) {

  // 1 ... 4 5 6 ... 20

  const lastPage = Math.floor(totalCountOfRegiters / registerPerPage);

  const previousPage = currentPage > 1
    ? generatePagesAray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesAray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
    : []



  return (
    <Stack
      direction={{ base: "column", sm: "column", md: "row" }}
      mt="8"
      spacing="6"
      justify="space-between"
      align="center"
    >

      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>

      </Box>
      <Stack direction="row" spacing="2">

        {/* primeira pg */}
        {currentPage > (1 + siblingsCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingsCount) && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
          </>
        )}

        {/* anteriores */}
        {previousPage.length > 0 && previousPage.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />

        })}

        {/* pg Atual */}
        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {/* proximas */}
        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}



        {/* Ultima pg */}
        {(currentPage + siblingsCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingsCount) < lastPage && (
              <Text color="gray.300" width="8" textAlign="center">...</Text>
            )}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>

  )

}