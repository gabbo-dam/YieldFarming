import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import Layerx from '../../layerx';
import config from '../../config';

export interface LayerxProviderContext {
  layerx?: Layerx;
}

export const Context = createContext<LayerxProviderContext>({ layerx: null });

export const LayerxProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [layerx, setLayerx] = useState<Layerx>();

  useEffect(() => {
    if (!layerx) {
      const layerx = new Layerx(config);
      if (account) {
        // wallet was unlocked at initialization
        layerx.unlockWallet(ethereum, account);
      }
      setLayerx(layerx);
    } else if (account) {
      layerx.unlockWallet(ethereum, account);
    }
  }, [account]);

  return <Context.Provider value={{ layerx: layerx }}>{children}</Context.Provider>;
};
