import { ChainId } from '@uniswap/sdk';
import { Configuration } from './layerx/config';
import { FarmInfo } from './layerx';

const configurations: { [env: string]: Configuration } = {
  development: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./layerx/deployments/deployments.rinkeby.json'),
    externalTokens: {
      'ETH_PROPHET-UNI-LPv2': ['0x22aDE3578c58BC4e932fc23fa7AebCf9406DBEac', 18],
      'LAYERx_ETH-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      'VDD_DAI-UNI-LPv2': ['0x19D9ec051f944Fc3C57338F80Da62De78C7cF2bc', 18],
      'VDS_DAI-UNI-LPv2': ['0xCc4fC5eEE4ae95cEd29d128095495bE8A6f3A34A', 18],
    },
    baseLaunchDate: new Date('2020-02-02T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-08T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-02T00:00:00Z'),
  },
  production: {
    chainId: ChainId.RINKEBY,
    etherscanUrl: 'https://rinkeby.etherscan.io',
    defaultProvider: 'wss://rinkeby.infura.io/ws/v3/751553d8430144e99fb0340edc99d9ab',
    deployments: require('./layerx/deployments/deployments.rinkeby.json'),
    externalTokens: {
      'ETH_PROPHET-UNI-LPv2': ['0x22aDE3578c58BC4e932fc23fa7AebCf9406DBEac', 18],
      'LAYERx_ETH-UNI-LPv2': ['0xe62b0f96fd9335a9e05bfe866def8a7c5cb0bce9', 18],
      DAI: ['0x8c96CeeB1569bB9442f2AdbeEcF4774928E2b7A3', 18],
      'VDD_DAI-UNI-LPv2': ['0x19D9ec051f944Fc3C57338F80Da62De78C7cF2bc', 18],
      'VDS_DAI-UNI-LPv2': ['0xCc4fC5eEE4ae95cEd29d128095495bE8A6f3A34A', 18],
    },
    baseLaunchDate: new Date('2020-02-02T00:00:00Z'),
    bondLaunchesAt: new Date('2020-02-08T00:00:00Z'),
    boardroomLaunchesAt: new Date('2020-02-02T00:00:00Z'),
  },
};

export const farmDefinitions: { [contractName: string]: FarmInfo } = {
  LAYERXETHPool: {
    name: 'Earn LAYERx by LAYERx-ETH LP',
    contract: 'LAYERXETHPool',
    depositTokenName: 'LAYERx_ETH-UNI-LPv2',
    earnTokenName: 'LAYERx',
    finished: false,
    sort: 1,
  },
};

// export default configurations[process.env.NODE_ENV];
export default configurations.development;
