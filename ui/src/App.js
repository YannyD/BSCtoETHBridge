import logo from './logo.svg';
import { TransferButton } from "./components/TransferButton/index.js"
import { InjectedConnector } from "@web3-react/injected-connector";
import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 56, 97],
});

function App() {
  const { account, chainId, active, activate } = useWeb3React();
  useEffect(async () => {
    if (!account) {
      await activate(injected);
    }
  }, []);

  if (active) {
    return (
      <div>
        <TransferButton />
      </div>
    );
  }
  else { return (<div>Loading...</div>) }
}

export default App;
