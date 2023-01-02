import { CheckCircleIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Container, Heading, Link, Stack, Text } from "@chakra-ui/react";
import { TransferPay } from "components/TransferPay";
import React from "react";

export default function Transfer() {
  return (
  <Box minH={'100vh'}>
  <Container maxW={'3xl'} alignItems={'center'} justifyContent={'center'}>
    <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
    <TransferPay />
    </Stack>
  </Container>
</Box>
  )
}
