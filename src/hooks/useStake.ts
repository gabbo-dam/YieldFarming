import { useCallback } from 'react';
import useLayerx from './useLayerx';
import { Farm } from '../layerx';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStake = (farm: Farm) => {
  const layerx = useLayerx();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        layerx.stake(farm.contract, amount, farm.depositToken.decimal),
        `Stake ${amount} ${farm.depositTokenName} to ${farm.contract}`,
      );
    },
    [farm, layerx],
  );
  return { onStake: handleStake };
};

export default useStake;
