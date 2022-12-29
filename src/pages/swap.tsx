import { Box, Button, Container, createIcon, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import { Head } from 'components/layout/Head'
import SwapTokens from 'components/SwapTokens'
import React from 'react'

export default function Swap() {
  return (
    <>
      <Box minH={'100vh'}>
        <Container maxW={'3xl'} alignItems={'center'} justifyContent={'center'}>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <SwapTokens />
          </Stack>
        </Container>
      </Box>
    </>
  )
}