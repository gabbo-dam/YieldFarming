import { useContext } from 'react';
import { Context as FarmsContext } from '../contexts/Farms';
import { Farm, ContractName } from '../layerx';

const useFarm = (contractName: ContractName): Farm => {
  const { farms } = useContext(FarmsContext);
  return farms.find((farm) => farm.contract === contractName);
};

export default useFarm;
