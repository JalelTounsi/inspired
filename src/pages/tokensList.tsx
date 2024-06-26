import { Box, Container, Stack } from '@chakra-ui/react'
import TokensList from 'components/TokensList'


import React from 'react'

export default function theList() {
  return (
      <Box minH={'100vh'}>
        <Container maxW={'3xl'} alignItems={'center'} justifyContent={'center'}>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <TokensList/>
          </Stack>
        </Container>
      </Box>
  )
}