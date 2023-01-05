import { Box, Container, Stack } from '@chakra-ui/react'
import TradeTokens0x from 'components/TradeTokens0x'
import React from 'react'

export default function Trade0x() {
  return (
    <>
      <Box minH={'100vh'}>
        <Container maxW={'3xl'} alignItems={'center'} justifyContent={'center'}>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <TradeTokens0x />
          </Stack>
        </Container>
      </Box>
    </>
  )
}