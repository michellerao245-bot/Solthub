import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { bsc, mainnet } from 'wagmi/chains'

// Reown Project ID
export const projectId = '36ab9bad9a38e511fd10489d2f947ceb'

// App metadata
const metadata = {
  name: 'CyberDice Pro',
  description: 'SoltChain Premium Web3 Gaming',
  url: 'https://soltcreator.vercel.app',
  icons: ['https://soltcreator.vercel.app/logo.png']
}

// Supported chains
const chains = [bsc, mainnet]

// Wagmi config
export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,

  storage: createStorage({
    storage: cookieStorage
  })
})

// Address shortener helper
export const shortenAddress = (address) => {
  if (!address) return ''

  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}