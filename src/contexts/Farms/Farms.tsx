import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useLayerx from '../../hooks/useLayerx';
import { Farm } from '../../layerx';
import config, { farmDefinitions } from '../../config';

const Farms: React.FC = ({ children }) => {
  const [farms, setFarms] = useState<Farm[]>([]);
  const layerx = useLayerx();

  const fetchPools = useCallback(async () => {
    const farms: Farm[] = [];

    for (const farmInfo of Object.values(farmDefinitions)) {
      if (farmInfo.finished) {
        if (!layerx.isUnlocked) continue;

        // only show pools staked by user
        const balance = await layerx.stakedBalanceOnFarm(farmInfo.contract, layerx.myAccount);
        if (balance.lte(0)) {
          continue;
        }
      }
      farms.push({
        ...farmInfo,
        address: config.deployments[farmInfo.contract].address,
        depositToken: layerx.externalTokens[farmInfo.depositTokenName],
        earnToken: farmInfo.earnTokenName == 'VDD' ? layerx.VDD : layerx.VDS,
      });
    }
    farms.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setFarms(farms);
  }, [layerx, setFarms]);

  useEffect(() => {
    if (layerx) {
      fetchPools()
        .catch(err => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [layerx, fetchPools]);

  return <Context.Provider value={{ farms: farms }}>{children}</Context.Provider>;
};

export default Farms;
