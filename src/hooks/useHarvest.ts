import { useCallback } from 'react';
import useLayerx from './useLayerx';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Farm } from '../layerx';

const useHarvest = (farm: Farm) => {
  const layerx = useLayerx();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      layerx.harvest(farm.contract),
      `Claim ${farm.earnTokenName} from ${farm.contract}`,
    );
  }, [farm, layerx]);

  return { onReward: handleReward };
};

export default useHarvest;
