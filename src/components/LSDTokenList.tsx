import {
  Box,
  Image,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

export default function LSDTokenList() {
  const tokenListJSON = require("../utils/LSDTokenList.json");
  const tokenList = tokenListJSON.tokens;
  //console.log(tokenList);
  return (
    <Box>
      <TableContainer>
        <Table
         size='sm'
         variant='striped'
          bg={useColorModeValue("gray.50", "gray.900")}
          color={useColorModeValue("gray.700", "gray.200")}
        >
          <TableCaption>Tokens list</TableCaption>
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>symbol</Th>
              <Th>logo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokenList &&
              tokenList.map((token) => (
                <Tr key={token.symbol}>
                  <Td  width={2}>{token.name}</Td>
                  <Td  width={2}>{token.symbol}</Td>
                  <Td  width={2}>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      border={"none"}
                      fontSize="20px"
                      icon={<Image src={token.logoURI} />}
                      height={10}
                      width={10}
                      onClick={() => {
                        alert(token.symbol);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>name</Th>
              <Th>symbol</Th>
              <Th>logo</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
