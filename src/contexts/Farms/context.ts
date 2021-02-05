import { createContext } from 'react';
import { Farm } from '../../layerx';

export interface FarmsContext {
  farms: Farm[];
}

const context = createContext<FarmsContext>({
  farms: [],
});

export default context;
