import { useCallback } from 'react';
import useLayerx from './useLayerx';
import { Farm } from '../layerx';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useRedeem = (farm: Farm) => {
  const layerx = useLayerx();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleRedeem = useCallback(() => {
    handleTransactionReceipt(layerx.exit(farm.contract), `Redeem ${farm.contract}`);
  }, [farm, layerx]);

  return { onRedeem: handleRedeem };
};

export default useRedeem;
