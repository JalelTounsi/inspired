import React, { ReactNode } from 'react'
import { Image, Box, chakra, Container, Flex, HStack, Link, Stack, Text, useBreakpointValue, useColorModeValue, VisuallyHidden } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaMedium, FaTwitter } from 'react-icons/fa'
import { LinkComponent } from 'components/LinkComponent'
import { SITE_DESCRIPTION, SITE_NAME, SOCIAL_GITHUB, SOCIAL_LINKEDIN, SOCIAL_MEDIUM, SOCIAL_TWITTER } from 'utils/config'
import { NetworkStatus } from 'components/NetworkStatus'

interface Props {
  className?: string
}

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target={'_blank'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}>
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}
export function Footer(props: Props) {
  const className = props.className ?? ''
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      // pos={'sticky'}
      pos="fixed"
      w="full"
      borderTop="1px"
      borderTopWidth="small"
      borderTopStyle="solid"
      borderTopColor="white"
      bottom={0}>
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}>
        <Text as="samp">
        {SITE_DESCRIPTION}</Text>
        <Link
          href={"/"}
          textAlign={useBreakpointValue({ base: "center", md: "left" })}
          fontFamily={"heading"}
          color={useColorModeValue("gray.800", "white")}
          _hover={{
            textDecoration: "none",
            color: useColorModeValue("gray.800", "white"),
            bg: useColorModeValue("green.200", "green.900"),
          }}
        >
          <Logo />
        </Link>
        <Stack direction={'row'} spacing={6}>
          <SocialButton label={'Twitter'} href={`https://twitter.com/${SOCIAL_TWITTER}`}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={'Medium'} href={`https://medium.com/${SOCIAL_MEDIUM}`}>
            <FaMedium />
          </SocialButton>
          <SocialButton label={'Github'} href={`https://github.com/${SOCIAL_GITHUB}`}>
            <FaGithub />
          </SocialButton>
          <SocialButton label={'LinkedIn'} href={`https://www.linkedin.com/in/${SOCIAL_LINKEDIN}`}>
            <FaLinkedin />
          </SocialButton>
        </Stack>
      </Container>
      <Box position="absolute" bottom={2} right={2}>
        <NetworkStatus />
      </Box>
    </Box>
  )
}

const Logo = (props: any) => {
  return (
    <HStack>
      <>
        <Image
          width={8}
          height={8}
          alt={"Login Image"}
          objectFit={"cover"}
          src={"/gangstaish.png"}
        />
        <Text as="kbd">Inspired</Text>
      </>
    </HStack>
  );
};
