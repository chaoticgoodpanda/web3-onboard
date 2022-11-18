import { WalletInit } from '@web3-onboard/common'
import Web3 from "web3";

declare global {
  interface Window {
    trustwallet: any;
    metamask: any;
    ethereum: any;
    original: any;
    web3: {
      currentProvider: any;
      __isMetaMaskShim__: boolean;
    };
  }
}

function trust({
  darkMode = false
}: {
  darkMode?: boolean
} = {}): WalletInit {
  return () => {
    return {
      label: 'Trust Wallet Web Extension',
      getIcon: async () => (await import('./icon.js')).default,
      getInterface: async ({ chains, appMetadata }) => {
        const [chain] = chains
        const { name, icon } = appMetadata || {}

        const {
          createEIP1193Provider,
          ProviderRpcErrorCode,
          ProviderRpcError
        } = await import('@web3-onboard/common')

        const base64 = window.btoa(icon || '')
        const appLogoUrl = `data:image/svg+xml;base64,${base64}`

        // const instance = new prov({
        //   appName: name || '',
        //   appLogoUrl,
        //   darkMode
        // })

        const accounts = new Web3(window.trustwallet);

        window.ethereum = window.trustwallet;

        const provider = createEIP1193Provider(window.ethereum, {
          wallet_switchEthereumChain: null,
          eth_selectAccounts: null
        })

        // const initialize = async () => {
        //   await window.trustwallet.request({ method: 'eth_requestAccounts'});
        //   const provider = new Web3(window.trustwallet);
        //   const accounts = await provider.eth.getAccounts();
        //
        //   console.log(accounts);
        // }
        //
        // window.addEventListener('load', initialize);


        // patch the chainChanged event
        // const on = provider.on.bind(coinbaseWalletProvider)
        // coinbaseWalletProvider.on = (event, listener) => {
        //   on(event, val => {
        //     if (event === 'chainChanged') {
        //       listener(`0x${(val as number).toString(16)}`)
        //       return
        //     }
        //
        //     listener(val)
        //   })
        //
        //   return coinbaseWalletProvider
        // }

        return {
          provider: provider,

        }
      }
    }
  }
}

export default trust
