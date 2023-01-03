import { Box, Button, Container, createIcon, Heading, Icon, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import ListOfTokens from 'components/ListOfTokens'

import React from 'react'

export default function tokensList() {
  return (
    <>
      <Box minH={'100vh'}>
        <Container maxW={'3xl'} alignItems={'center'} justifyContent={'center'}>
          <Stack as={Box} textAlign={'center'} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <ListOfTokens />
          </Stack>
        </Container>
      </Box>
    </>
  )
}