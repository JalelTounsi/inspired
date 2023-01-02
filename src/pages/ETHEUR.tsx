import { Box, Container, Stack } from '@chakra-ui/react'
import ETHEUR from 'components/ETHEUR'
import React from 'react'

export default function Dashboard() {
  return (
    <>
      <Box minH={'100vh'}>
        <Container maxW={'3xl'} alignItems={'center'} justifyContent={'center'}>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <ETHEUR />
          </Stack>
        </Container>
      </Box>
    </>
  )
}