import { 
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import SimplePagination from "@components/SimplePagination";

export const DataTable = ({
  headData = [],
  data = [],
  caption,
  limit,
  setLimit = () => {},
  page,
  setPage = () => {},
  pagination,
  ...props
}) => {
  
  return <Box
    border="1px solid"
    borderColor="gray.200"
    borderRadius="12px"
    overflow={"auto"}
    {...props}>
    <Table
      variant="simple"
    >
      {caption && <TableCaption>{caption}</TableCaption>}
      <Thead
        bgColor="gray.50"
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <Tr>
          {headData.map((head, index) => (
            <Th
              key={index}
              isNumeric={head.isNumeric}
              width={"160px"}
              color="gray.900"
              fontWeight={"600"}
              fontSize={"12px"}
              {...head.thProps}
            >
              {head.label}
            </Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {data.map((row, rowIndex) => (
          <Tr key={rowIndex}>
            {headData.map((head, colIndex) => (
              <Td
                key={colIndex}
                isNumeric={head.isNumeric}
                width={"160px"}
                fontWeight={"400"}
                fontSize={"14px"}
                {...head.tdProps}
              >
                {row[head.key]}
              </Td>
            ))}
          </Tr>
        ))}
      </Tbody>
      {/* {
        footerData.length > 0 && <Tfoot>
          <Tr>
            {footerData.map((head, index) => (
              <Th
                key={index}
                isNumeric={head.isNumeric}
                {...head.thProps}
              >
                {head.label}
              </Th>
            ))}
          </Tr>
        </Tfoot>
      } */}
    </Table>
    {
      pagination && <Box width="100%">
        <Box
          padding="12px 24px"
          width="100%">
          <SimplePagination
            limit={limit}
            setLimit={setLimit}
            page={page}
            setPage={setPage}
            count={data.length} 
          />
        </Box>
      </Box>
    }
  </Box>;
};