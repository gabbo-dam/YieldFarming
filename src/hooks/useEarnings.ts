import { useCallback, useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import useLayerx from './useLayerx';
import { ContractName } from '../layerx';

const useEarnings = (poolName: ContractName) => {
  const [balance, setBalance] = useState(BigNumber.from(0));
  const layerx = useLayerx();

  const fetchBalance = useCallback(async () => {
    const balance = await layerx.earnedFromFarm(poolName, layerx.myAccount);
    setBalance(balance);
  }, [layerx?.isUnlocked, poolName]);

  useEffect(() => {
    if (layerx?.isUnlocked) {
      fetchBalance().catch((err) => console.error(err.stack));

      const refreshBalance = setInterval(fetchBalance, 10000);
      return () => clearInterval(refreshBalance);
    }
  }, [layerx?.isUnlocked, poolName, layerx]);

  return balance;
};

export default useEarnings;
