import Head from 'next/head'
import styles from '../styles/Home.module.css'

import {init, useConnectWallet} from '@web3-onboard/react'
import { ethers } from 'ethers'
import ledgerModule from '@web3-onboard/ledger';
import injectedModule from '@web3-onboard/injected-wallets'



const buttonStyles = {
  borderRadius: '6px',
  background: '#111827',
  border: 'none',
  fontSize: '18px',
  fontWeight: '600',
  cursor: 'pointer',
  color: 'white',
  padding: '14px 12px',
  marginTop: '40px',
  fontFamily: 'inherit'
}

const INFURA__KEY = 'cf540cb0b3b643d399e59aef4f5ac179';
const ledger = ledgerModule();
const injected = injectedModule();


init({
  wallets: [injected, ledger],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA__KEY}`
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ropsten',
      rpcUrl: `https://ropsten.infura.io/v3/${INFURA__KEY}`
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Rinkeby',
      rpcUrl: `https://rinkeby.infura.io/v3/${INFURA__KEY}`
    },
    {
      id: '0x38',
      token: 'BNB',
      label: 'Binance',
      rpcUrl: 'https://bsc-dataseed.binance.org/'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    },
    {
      id: '0xfa',
      token: 'FTM',
      label: 'Fantom',
      rpcUrl: 'https://rpc.ftm.tools/'
    }
  ],
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: '<svg>My App Icon</svg>',
    description: "A demo of Web3-Onboard with Ledger."
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: false
    }
  }
})

export default function Home() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  // create an ethers provider
  let ethersProvider

  if (wallet) {
    ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Web3-Onboard Demo</title>
        <meta
          name="description"
          content="Example of how to integrate Web3-Onboard with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to this demo of
          <a href="https://github.com/blocknative/web3-onboard">
            {' '}
            Web3-Onboard
          </a>
          !
        </h1>
        <button
          style={buttonStyles}
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
        >
          {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
        </button>
      </main>
    </div>
  )
}
