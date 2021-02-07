import { useContext } from 'react';
import { Context } from '../contexts/LayerxProvider';

const useLayerx = () => {
  const { layerx: layerx } = useContext(Context);
  return layerx;
};

export default useLayerx;
