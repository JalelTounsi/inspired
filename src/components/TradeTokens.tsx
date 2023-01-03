const qs = require("qs");
const { default: BigNumber } = require("bignumber.js");
import {
  Image,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
  HStack,
  SimpleGrid,
  Heading,
  VisuallyHiddenInput,
  IconButton,
} from "@chakra-ui/react";
import { sendTransaction } from "@wagmi/core";
import React from "react";
import { useAccount, useContract } from "wagmi";
import { erc20ABI } from "wagmi";
import { useNetwork } from "wagmi";
import ListOfTokens from "./ListOfTokens";
//0x: Exchange Proxy  0xdef1c0ded9bec7f1a1670819833240f027b25eff

const tokenListJSON = require("../utils/TokensList.json");
const tokens = tokenListJSON.tokens;

const CreateOxAPICall = function CreateOxAPICall(chain) {
  let quoteQuery = "";
  const amountToSell = new BigNumber(
    document?.getElementById("amountTokenToSell").value * Math.pow(10, 18)
  ).toFixed();
  const sellToken = document.getElementById("TokenToSell").value;
  const buyToken = document.getElementById("TokenToBuy").value;

  const params = {
    sellToken: sellToken === null ? "WETH" : sellToken, //WETH
    buyToken: buyToken === null ? "DAI" : buyToken, //DAI
    sellAmount: amountToSell === 0 ? 1 * Math.pow(10, 18) : amountToSell,
  };
  if (chain.network === "homestead") {
    quoteQuery = `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`;
  }
  if (chain.network === "goerli") {
    quoteQuery = `https://${
      chain.network
    }.api.0x.org/swap/v1/quote?${qs.stringify(params)}`;
  }
  console.log(quoteQuery);
};

const TokensModal = async function listAvailableTokens() {
  // Create token list for modal
  let parent_modal = document.getElementById("ModalListOfTokens");
  document.getElementById("TokenToSell").value = tokens[8].symbol; // WETH
  document.getElementById("SellTokenImage").src = tokens[8].logoURI; // WETH
  document.getElementById("TokenToBuy").value = tokens[1].symbol; //DAI
  document.getElementById("BuyTokenImage").src = tokens[1].logoURI; //DAI
  document.getElementById("amountTokenToSell").value = 1;
  for (const token in tokens) {
    // Token row in the modal token list
    let div = document.createElement("div");
    let html = `
      <table>
      <tr>
        <td>
        <Image src=${tokens[token].logoURI} height="32px" width="32px" />
        </td>
        <td>
        <label>${tokens[token].name}</label>
        </td>
        <td>
        <button variant="ghost" onClick ="alert('hello')">yes?</button>
      </td>
      </tr>
      </table>`;
    div.innerHTML += html;
    parent_modal?.appendChild(div);
  }
};

//ask for the price / rate
async function RequestForQuote() {
  const amountToSell = new BigNumber(
    document?.getElementById("amountTokenToSell").value * Math.pow(10, 18)
  ).toFixed();
  const sellToken = document.getElementById("TokenToSell").value;
  const buyToken = document.getElementById("TokenToBuy").value;

  const params = {
    sellToken: sellToken === null ? "WETH" : sellToken, //WETH
    buyToken: buyToken === null ? "DAI" : buyToken, //DAI
    sellAmount: amountToSell === 0 ? 1 * Math.pow(10, 18) : amountToSell,
  };
  //let priceQuery = `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`; //'https://api.0x.org/swap/v1/price?sellToken=WETH&buyToken=USDC&sellAmount=1000000000000000000'
  let quoteQuery = `https://api.0x.org/swap/v1/quote?${qs.stringify(params)}`;
  // Fetch the swap price.
  const response = await fetch(quoteQuery);
  let swapPriceJSON = await response.json();
  let priceFixed = Number.parseFloat(swapPriceJSON.price).toFixed(5);
  //document.getElementById('TokenToSell').value = swapPriceJSON.sellTokenAddress === '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2' ? 'WETH' : 'DAI'
  document.getElementById("amountTokenToSell").value = `${
    swapPriceJSON.sellAmount / Math.pow(10, 18)
  }`;
  //document.getElementById('TokenToBuy').value = swapPriceJSON.buyTokenAddress === '0x6b175474e89094c44da98b954eedeac495271d0f' ? 'DAI' : 'WETH'
  document.getElementById("amountTokenToBuy").value = `${Number.parseFloat(
    (swapPriceJSON.guaranteedPrice * swapPriceJSON.sellAmount) /
      Math.pow(10, 18)
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
  document.getElementById("estimatedGas").value = `${Number.parseFloat(
    swapPriceJSON.estimatedGas
  ).toFixed(0)} wei`;
  document.getElementById("divider").style.display = "block";
  document.getElementById("liquidityProvider").style.display = "block";
  document.getElementById("estimatedGas").style.display = "block";
  document.getElementById("garenteedPrice").style.display = "block";
  document.getElementById("Price").style.display = "block";
  document.getElementById("priceLabel").style.display = "block";
  document.getElementById("liquidityLabel").style.display = "block";
  document.getElementById("impactLabel").style.display = "block";
  document.getElementById("rateLabel").style.display = "block";
}
//try getting an official quote and try to do the swap
async function TryPerformSwapToken(_address: any, _ERC20TokenContract) {
  //const _address = document?.getElementById("UserAddress").value
  const amountToSell = 1 * Math.pow(10, 18);
  const sellToken = "WETH";
  const buyToken = "DAI";
  console.log(_address);
  console.log(ERC20TokenContract);
  const params = {
    sellToken: sellToken, //WETH
    buyToken: buyToken, //DAI
    sellAmount: amountToSell,
    // feeRecipient: "0xD9523Ed595Fec541425807586a0CCe7F8CeEB450",
    // buyTokenPercentageFee: "0.3",
    takerAddress: _address,
  };
  console.log("params", params);
  let quoteQuery = `https://api.0x.org/swap/v1/price?${qs.stringify(params)}`;
  console.log(quoteQuery);
  // Fetch the swap quote.
  const response = await fetch(quoteQuery);
  let swapQuoteJSON = await response.json();
  const maxApproval = new BigNumber(2).pow(256).minus(1);
  console.log("approval amount: ", maxApproval);
  // const WETHaddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  // const ERC20TokenContract = useContract({
  //   address: WETHaddress,
  //   abi: erc20ABI,
  // })
  // Grant the allowance target an allowance to spend our tokens.
  let tx = await ERC20TokenContract.approve(
    swapQuoteJSON.allowanceTarget,
    maxApproval
  );
  tx = await ERC20TokenContract.send({ from: _address }).then((tx: any) => {
    console.log("tx: ", tx);
  });

  // Perform the swap
  const receipt = await sendTransaction(swapQuoteJSON);
  console.log("receipt: ", receipt);
}

export default function TradeTokens() {
  const { address } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { chain, chains } = useNetwork();
  const _ERC20TokenContract = useContract({
    _address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: erc20ABI,
  });

  return (
    <>
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
          {/* <Text>{address}</Text> */}
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
                  <FormControl isRequired>
                    <VisuallyHiddenInput
                      type="text"
                      name="UserAddress"
                      id="UserAddress"
                      value={address}
                    />
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
                                src={tokens[8].logoURI}
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
                          <IconButton
                            variant="outline"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            border={"none"}
                            fontSize="20px"
                            icon={
                              <Image
                                alt={"Login Image"}
                                src={tokens[1].logoURI}
                                width={8}
                                height={8}
                                id="BuyTokenImage"
                              />
                            }
                            onClick={onOpen}
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
                <SimpleGrid columns={3} spacing={2}>
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
                      Tokens list
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={RequestForQuote}
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
                      // onClick={() =>
                      //   TryPerformSwapToken(address, _ERC20TokenContract)
                      // }
                      onClick={() => CreateOxAPICall(chain)}
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
                        Estimated Gas
                      </FormLabel>
                      <Input
                        type="text"
                        name="estimatedGas"
                        id="estimatedGas"
                        placeholder="The Estimated Gas"
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
            <Modal isOpen={isOpen} onClose={onClose} >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody id="ModalListOfTokens">
                <ListOfTokens />
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
    </>);
}

