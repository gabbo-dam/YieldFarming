import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import ERC20 from '../layerx/ERC20';
import useLayerx from './useLayerx';

const useTokenBalance = (token: ERC20) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const layerx = useLayerx();

  const fetchBalance = useCallback(async () => {
    setBalance(await token.balanceOf(layerx.myAccount));
  }, [layerx?.isUnlocked, token]);

  useEffect(() => {
    if (layerx?.isUnlocked) {
      fetchBalance().catch((err) =>
        console.error(`Failed to fetch token balance: ${err.stack}`),
      );
      let refreshInterval = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshInterval);
    }
  }, [layerx?.isUnlocked, token]);

  return balance;
};

export default useTokenBalance;
