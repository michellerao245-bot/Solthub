import React from 'react'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount } from 'wagmi'

const ConnectButton = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()

  const shortAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

  const handleConnect = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    await open()
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      style={{
        backgroundColor: '#fbbf24',
        color: '#000',
        padding: '10px 24px',
        borderRadius: '10px',
        fontWeight: 'bold',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {isConnected ? shortAddress : 'Connect Wallet'}
    </button>
  )
}

export default ConnectButton