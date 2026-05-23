import React, { useEffect } from 'react' 
import { useWeb3Modal } from '@web3modal/wagmi/react'  
import { useAccount } from 'wagmi'  
  
const ConnectButton = () => {  
  const { open } = useWeb3Modal()  
  const { address, isConnected } = useAccount()  
  
  // Backend ko data bhejne wala function 
  const saveUserToBackend = async (walletAddress) => { 
    try { 
      // Yahan URL ekdum clean kar diya hai
      await fetch('https://ecobackend-two.vercel.app/api/users/create', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ walletAddress: walletAddress }) 
      }); 
      console.log("User successfully saved to backend!"); 
    } catch (error) { 
      console.error("Backend saving failed:", error); 
    } 
  } 
 
  // Monitor: Jaise hi isConnected true hoga, ye chalega 
  useEffect(() => { 
    if (isConnected && address) { 
      saveUserToBackend(address); 
    } 
  }, [isConnected, address]); 
 
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