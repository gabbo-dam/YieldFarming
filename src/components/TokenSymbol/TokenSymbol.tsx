import React from 'react';

import vddLogo from '../../assets/img/basis-cash-logo.svg';
import vdsLogo from '../../assets/img/basis-share-logo.svg';
import vdbLogo from '../../assets/img/basis-bond-logo.svg';
import DAILogo from '../../assets/img/DAI.png';
import sUSDLogo from '../../assets/img/sUSD.png';
import USDCLogo from '../../assets/img/USDC.png';
import USDTLogo from '../../assets/img/USDT.png';
import Layerx from '../../icons/layerx'
import VoodooShare from '../../icons/voodooshare'
import VoodooBond from '../../icons/voodoobond'
import iconchehat from '../../img/iconchefhat.svg'

const logosBySymbol: {[title: string]: string} = {
  'VDD': vddLogo,
  'VDB': vdbLogo,
  'VDS': vdsLogo,
  'DAI': DAILogo,
  'LAYERx_ETH-UNI-LPv2': sUSDLogo,
  'ETH_PROPHET-UNI-LPv2': USDCLogo,
  'VDD_DAI-UNI-LPv2': vddLogo,
  'VDS_DAI-UNI-LPv2': vdsLogo,  
};

type VoodooLogoProps = {
  symbol?: string;
  size?: number;
}

const TokenSymbol: React.FC<VoodooLogoProps> = ({ symbol, size = 64 }) => {
  // if (!logosBySymbol[symbol]) {
  //   throw new Error(`Invalid VoodooLogo symbol: ${symbol}`);
  // }

  if(symbol==='LAYERx' || symbol==='VDD' || symbol==='VDD_DAI-UNI-LPv2'){
    return <Layerx style={{width: '64', height: '64'}}/>
  } else if(symbol==='VoodooShare'  || symbol==='VDS_DAI-UNI-LPv2' || symbol==='VDS' ){
    return <VoodooShare />
  } else if (symbol==='VoodooBond' || symbol==='VDB') {
    return <VoodooBond />
  } else if (symbol==='VoodooBond') {
    return <VoodooBond />
  } else if (symbol==='ETH_PROPHET-UNI-LPv2') {
    return <img width={64} height={64} style={{borderRadius:'50px'}} src="https://i.ibb.co/xHHgKJ4/icon.jpg" alt="Trinity"/>
  } else if (symbol==='LAYERx_ETH-UNI-LPv2') {
    
    return (
      <div style={{width:'100px', height: '100px', border:'3px solid #E5E5E5', borderRadius:'100px', backgroundColor:'#FFFFFF', display: 'flex', justifyContent:'center', alignItems:'center'}}>
        <img width={64} height={64} src={iconchehat} alt={iconchehat} />
      </div>
    )
  }else {
    return (
      <img
        src={logosBySymbol[symbol]}
        alt={`${symbol} Logo`}
        width={64}
        height={64}
      />
    )
  }


};

export default TokenSymbol;
