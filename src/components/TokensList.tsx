
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
  StylesProvider,
  border,
} from "@chakra-ui/react";

function getNetworkName(chainID){
  if(chainID === 1)
  return "Ethereum"
  if(chainID === 3)
  return "Ropsten"
  if(chainID === 4)
  return "Rinkeby"
  if(chainID === 5)
  return "Goerli"
  if(chainID === 42)
  return "Kovan"
  if(chainID === 137)
  return "Polygon"
  if(chainID === 80001)
  return "Mumbai"
  if(chainID === 56)
  return "Binance Smart Chain"
  if(chainID === 42161)
  return "Arbitrum One"
  if(chainID === 10)
  return "Optimism"
  if(chainID === 42220)
  return "Celo"
  else return chainID
}
export default function TheList() {
  const tokenListJSON = require("../utils/TokensList.json");
  const tokenList = tokenListJSON.tokens;
  let count = 1;
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
            <Th>ID</Th>
              <Th>name</Th>
              <Th>symbol</Th>
              {/* <Th>chainId</Th> */}
              <Th>logo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tokenList &&
              tokenList.map((item) => (
                <Tr key={item.address}>
                  <Td>{count++}</Td>
                  <Td>{item.name}</Td>
                  <Td>{item.symbol}</Td>
                  {/* <Td>{getNetworkName(item.chainId)}</Td> */}
                  <Td>
                    <IconButton
                      variant="outline"
                      colorScheme="teal"
                      aria-label="Call Sage"
                      border={"none"}
                      fontSize="20px"
                      icon={<Image src={item.logoURI} />}
                      height={10}
                      width={10}
                      onClick={() => {
                        alert(item.symbol);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
          </Tbody>
          <Tfoot>
            <Tr>
            <Th>ID</Th>
              <Th>name</Th>
              <Th>symbol</Th>
              {/* <Th>chainId</Th> */}
              <Th>logo</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
}
