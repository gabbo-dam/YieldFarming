import { useCallback } from 'react';
import useLayerx from './useLayerx';
import { Farm } from '../layerx';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useWithdraw = (farm: Farm) => {
  const layerx = useLayerx();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleWithdraw = useCallback(
    (amount: string) => {
      handleTransactionReceipt(
        layerx.unstake(farm.contract, amount),
        `Withdraw ${amount} ${farm.depositTokenName} from ${farm.contract}`,
      );
    },
    [farm, layerx],
  );
  return { onWithdraw: handleWithdraw };
};

export default useWithdraw;
