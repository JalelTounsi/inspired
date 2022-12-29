const qs = require("qs");
const { default: BigNumber } = require("bignumber.js");
import { erc20ABI, erc721ABI, erc4626ABI } from "wagmi";
import { CheckCircleIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Image,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
  VStack,
  Text,
  Select,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  HStack,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import { FaExchangeAlt, FaExclamation } from "react-icons/fa";

//0x: Exchange Proxy  0xdef1c0ded9bec7f1a1670819833240f027b25eff

const tokenListJSON = require("../utils/TokensList.json");
const tokens = tokenListJSON.tokens;

const TokensModal = async function listAvailableTokens() {
  console.log("initializing");
  // Create token list for modal
  console.log("tokenListJSON: ", tokenListJSON);
  console.log("tokens", tokens);
  let parent_modal = document.getElementById("ModalListOfTokens");
  document.getElementById("TokenToSell").value = tokens[8].symbol; // WETH
  document.getElementById("SellTokenImage").src = tokens[8].logoURI; // WETH
  document.getElementById("TokenToBuy").value = tokens[1].symbol; //DAI
  document.getElementById("BuyTokenImage").src = tokens[1].logoURI; //DAI
  document.getElementById("amountTokenToSell").value = 1;
  for (const i in tokens) {
    // Token row in the modal token list
    let div = document.createElement("div");
    let html = `
        <img src="${tokens[i].logoURI}" width="24" height="24" style='float: left'/>
        <p>${tokens[i].symbol}</p>
          `;
    div.innerHTML += html;
    parent_modal?.appendChild(div);
  }
};

async function getPrice() {
  const amountToSell = new BigNumber(
    document?.getElementById("amountTokenToSell")?.value * 10 ** 18
  ).toFixed();
  console.log(amountToSell);
  const sellToken = document.getElementById("TokenToSell").value;
  const buyToken = document.getElementById("TokenToBuy").value;

  const params = {
    sellToken: sellToken === null ? "WETH" : sellToken, //WETH
    buyToken: buyToken === null ? "DAI" : buyToken, //DAI
    sellAmount: amountToSell === 0 ? 1 * 10 ** 18 : amountToSell,
  };
  console.log("Getting Price");
  let priceQuery = `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`; //'https://api.0x.org/swap/v1/price?sellToken=WETH&buyToken=USDC&sellAmount=1000000000000000000'
  let quoteQuery = `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`;
  // Fetch the swap price.
  const response = await fetch(quoteQuery);
  console.log(priceQuery);
  let swapPriceJSON = await response.json();
  let priceFixed = Number.parseFloat(swapPriceJSON.price).toFixed(5);
  // console.log('response: ', response)
  console.log("response.json(): ", swapPriceJSON);
  //document.getElementById('TokenToSell').value = swapPriceJSON.sellTokenAddress === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'WETH' : 'DAI'
  document.getElementById("amountTokenToSell").value = `${
    swapPriceJSON.sellAmount / 10 ** 18
  }`;
  //document.getElementById('TokenToBuy').value = swapPriceJSON.buyTokenAddress === '0x6b175474e89094c44da98b954eedeac495271d0f' ? 'DAI' : 'WETH'
  document.getElementById("amountTokenToBuy").value = `${Number.parseFloat(
    (swapPriceJSON.guaranteedPrice * swapPriceJSON.sellAmount) / 10 ** 18
  ).toFixed(5)}`;
  document.getElementById("Price").value = `1 ${
    document.getElementById("TokenToSell").value
  } = ${priceFixed} ${document.getElementById("TokenToBuy").value}`;
  document.getElementById("garenteedPrice").value = Number.parseFloat(
    swapPriceJSON.guaranteedPrice
  ).toFixed(5);
  if (swapPriceJSON.orders !== null)
    document.getElementById("liquidityProvider").value =
      swapPriceJSON.orders[0].source !== null
        ? swapPriceJSON.orders[0].source
        : "no liquidity";
  document.getElementById("estimatedPriceImpact").value = `${Number.parseFloat(
    swapPriceJSON.estimatedPriceImpact
  ).toFixed(4)} %`;
  document.getElementById("divider").style.display = "block";
  document.getElementById("liquidityProvider").style.display = "block";
  document.getElementById("estimatedPriceImpact").style.display = "block";
  document.getElementById("garenteedPrice").style.display = "block";
  document.getElementById("Price").style.display = "block";
  document.getElementById("priceLabel").style.display = "block";
  document.getElementById("liquidityLabel").style.display = "block";
  document.getElementById("impactLabel").style.display = "block";
  document.getElementById("rateLabel").style.display = "block";
}

export default function SwapTokens() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
          <Heading as="h2" size="xl" mt={6} mb={2}>
            Swap tokens
          </Heading>
          <Text color={"gray.500"}>Swap your tokens no strings attached</Text>
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
                  <FormControl isRequired>
                    <SimpleGrid columns={2} spacing={2}>
                      <Box>
                        <HStack>
                          <Image
                            alt={"Login Image"}
                            src={tokens[8].logoURI}
                            width={8}
                            height={8}
                            id="SellTokenImage"
                          />
                          <Input
                            type="text"
                            name="SellToken"
                            placeholder={tokens[8].symbol}
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
                          placeholder="0"
                          id="amountTokenToSell"
                          variant={"flushed"}
                        />
                      </Box>
                    </SimpleGrid>
                  </FormControl>
                </VStack>
                <VStack>
                  <FormControl>
                    <SimpleGrid columns={2} spacing={2}>
                      <Box>
                        <HStack>
                          <Image
                            alt={"Login Image"}
                            src={tokens[1].logoURI}
                            width={8}
                            height={8}
                            id="BuyTokenImage"
                          />
                          <Input
                            type="text"
                            name="BuyToken"
                            placeholder={tokens[1].symbol}
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
                          placeholder="amount To Buy"
                          id="amountTokenToBuy"
                          readOnly={true}
                          variant={"flushed"}
                        />
                      </Box>
                    </SimpleGrid>
                  </FormControl>
                </VStack>
                <SimpleGrid columns={2} spacing={2}>
                  <Box>
                    <Button
                      colorScheme="blue"
                      bg="blue.400"
                      color="white"
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={onOpen}
                    >
                      Open Modal
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={getPrice}
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
                </SimpleGrid>
                <Divider id="divider" orientation="horizontal" display="none" />
                <SimpleGrid columns={2} spacing={2}>
                  <Box maxW="sm">
                    <FormControl>
                      <FormLabel id="liquidityLabel" display="none">
                        Liquidity Provider
                      </FormLabel>
                      <Input
                        type="text"
                        name="liquidityProvider"
                        id="liquidityProvider"
                        placeholder="The Liquidity Provider"
                        readOnly={true}
                        border={"none"}
                        display="none"
                        variant={"flushed"}
                      />
                    </FormControl>
                  </Box>
                  <Box maxW="sm">
                    <FormControl>
                      <FormLabel id="impactLabel" display="none">
                        Estimated Price Impact
                      </FormLabel>
                      <Input
                        type="text"
                        name="estimatedPriceImpact"
                        id="estimatedPriceImpact"
                        placeholder="The Estimated Price Impact"
                        readOnly={true}
                        border={"none"}
                        display="none"
                        variant={"flushed"}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormLabel id="rateLabel" display="none">
                      Exchange Rate
                    </FormLabel>
                    <Input
                      type="text"
                      name="Price"
                      placeholder="Price"
                      id="Price"
                      readOnly={true}
                      display="none"
                      border={"none"}
                      variant={"flushed"}
                    />
                  </Box>
                  <Box>
                    <FormLabel id="priceLabel" display="none">
                      Garenteed Price
                    </FormLabel>
                    <Input
                      type="text"
                      name="garenteedPrice"
                      placeholder="Garenteed Price"
                      id="garenteedPrice"
                      readOnly={true}
                      display="none"
                      border={"none"}
                      variant={"flushed"}
                    />
                  </Box>
                </SimpleGrid>
              </VStack>
            </Box>
          </Stack>
          <>
            {/* the modal */}
            <Modal isOpen={isOpen} onClose={onClose} size={"xs"}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody id="ModalListOfTokens">
                  <Text>List of tokens</Text>
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button variant="ghost" onClick={TokensModal}>
                    Secondary Action
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </Box>
      </HStack>
    </Flex>
  );
}
