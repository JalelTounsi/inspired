const qs = require("qs");
const { default: BigNumber } = require("bignumber.js");
import {
  Image,
  Box,
  Button,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  useDisclosure,
  VStack,
  Text,
  HStack,
  SimpleGrid,
  Heading,
  VisuallyHiddenInput,
  IconButton,
  Select,
} from "@chakra-ui/react";
import React from "react";
import { useAccount } from "wagmi";
import { useNetwork } from "wagmi";

export default function TradeTokensUni() {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain, chains } = useNetwork();
  const tokenListJSON = require("../utils/LSDTokenList.json");
  const tokenList = tokenListJSON.tokens;
  return (
    <Flex align="center" justify="center">
      <HStack spacing={{ base: 4, md: 8, lg: 20 }}>
        {/* The title */}
        <Box
          textAlign="center"
          borderRadius="lg"
          p={{ base: 5, lg: 16 }}
          bgSize={"lg"}
          boxSize={"50vh"}
        >
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Trade
          </Heading>
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Tokens & NFTs
          </Heading>
          <Text color={"gray.500"}>
            Trade your tokens or NFTs no strings attached
          </Text>
        </Box>
        <Box>
          <Stack
            spacing={{ base: 4, md: 8, lg: 20 }}
            direction={{ base: "column", md: "row" }}
          >
            <Box
              bg={useColorModeValue("white", "gray.700")}
              borderRadius="md"
              p={8}
              color={useColorModeValue("gray.700", "whiteAlpha.900")}
              shadow="base"
              width={"69vh"}
            >
              <VStack>
                <VStack>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <HStack>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          border={"none"}
                          fontSize="20px"
                          icon={
                            <Image
                              alt={"Login Image"}
                              src={tokenList[0].logoURI}
                              width={8}
                              height={8}
                              id="SellTokenImage"
                            />
                          }
                          onClick={onOpen}
                        />
                        <Input
                          type="text"
                          name="SellToken"
                          placeholder={tokenList[0].symbol}
                          value={tokenList[0].symbol}
                          id="TokenToSell"
                          variant={"flushed"}
                          htmlSize={4}
                        />
                      </HStack>
                    </Box>
                    <Box>
                      <Input
                        type="text"
                        name="SellAmount"
                        placeholder="1"
                        id="amountTokenToSell"
                        variant={"flushed"}
                      />
                    </Box>
                  </SimpleGrid>
                </VStack>
                <VStack>
                  <SimpleGrid columns={2} spacing={2}>
                    <Box>
                      <HStack>
                        <IconButton
                          variant="outline"
                          colorScheme="teal"
                          aria-label="Call Sage"
                          border={"none"}
                          fontSize="20px"
                          icon={
                            <Image
                              alt={"Login Image"}
                              src={tokenList[1].logoURI}
                              width={8}
                              height={8}
                              id="BuyTokenImage"
                            />
                          }
                          onClick={() => alert("thank you")}
                        />
                        <Input
                          type="text"
                          name="BuyToken"
                          placeholder={tokenList[1].symbol}
                          value={tokenList[1].symbol}
                          id="TokenToBuy"
                          variant={"flushed"}
                          htmlSize={4}
                        />
                      </HStack>
                    </Box>
                    <Box>
                      <Input
                        type="text"
                        name="BuyAmount"
                        placeholder="0"
                        id="amountTokenToBuy"
                        readOnly={true}
                        variant={"flushed"}
                      />
                    </Box>
                  </SimpleGrid>
                </VStack>
                <SimpleGrid columns={3} spacing={2}>
                  <Box>
                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={() => alert("thank you")}
                    >
                      Tokens list
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => alert("thank you")}
                      colorScheme="green"
                      bg="green.400"
                      color="white"
                      _hover={{
                        bg: "green.500",
                      }}
                    >
                      Get Quote
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => alert("thank you")}
                      colorScheme="red"
                      bg="red.400"
                      color="white"
                      _hover={{
                        bg: "red.500",
                      }}
                    >
                      Swap tokens!
                    </Button>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Box>
          </Stack>
        </Box>
      </HStack>
    </Flex>
  );
}
