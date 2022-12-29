import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultWallets, RainbowKitProvider, AvatarComponent } from '@rainbow-me/rainbowkit'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ReactNode } from 'react'
import Image from 'next/image'
import { infuraProvider } from 'wagmi/providers/infura'
import { NETWORKS, INFURA_KEY, SITE_NAME } from '../utils/config'
import React from 'react'


interface Props {
  children: ReactNode
}
function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')'
}

const CustomAvatar: AvatarComponent = ({ ensImage, size }) => {
  const randomNumber = Math.floor(Math.random() * 100)
  return ensImage ? (
    <Image src={ensImage} width={size} height={size} style={{ borderRadius: 99 }} alt="Random"/>
  ) : (
    <div
      style={{
        backgroundColor: random_rgba(),
        borderRadius: 99,
        height: size,
        width: size,
      }}>
      {randomNumber}
    </div>
  )
}

const { chains, provider } = configureChains(NETWORKS, [infuraProvider({ apiKey: INFURA_KEY }), publicProvider()])

const { connectors } = getDefaultWallets({
  appName: SITE_NAME,
  chains,
})

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
})

export function Web3Provider(props: Props) {
  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider modalSize="compact" coolMode chains={chains} avatar={CustomAvatar}>
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
