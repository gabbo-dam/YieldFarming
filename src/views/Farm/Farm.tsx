import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';

import useFarm from '../../hooks/useFarm';
import useRedeem from '../../hooks/useRedeem';
import { Farm as FarmEntity } from '../../layerx';
import Wallet from '../../icons/wallet'

const Farm: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { farmId } = useParams();
  const farm = useFarm(farmId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(farm);

  return account && farm ? (
    <>
      <PageHeader
        
        subtitle={`Deposit ${farm?.depositTokenName} and earn ${farm?.earnTokenName}`}
        title={farm?.name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest farm={farm} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake farm={farm} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {farm.depositTokenName.includes('LP') && <LPTokenHelpText farm={farm} />}
        <Spacer size="lg" />
        <div style={{width:'308px'}}>
          <Button onClick={onRedeem} text="Settle & Withdraw" variant='secondary' size='sm' />
        </div>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  ) : !farm ? (
    <FarmNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ farm: FarmEntity }> = ({ farm }) => {
  let pairName: string;
  let uniswapUrl: string;
  // if (farm.depositTokenName.includes('VDD')) {
  //   pairName = 'VDD-DAI pair';
  //   uniswapUrl = 'https://medium.com/@basiscash/#bac-dai';
  // } else {
  //   pairName = 'VDS-DAI pair';
  //   uniswapUrl = 'https://medium.com/@basiscash/#bas-dai';
  // }
  pairName = 'LAYERx-ETH pair';
  uniswapUrl = '#';
  return (
    <StyledLink href={uniswapUrl}>
      {`Provide liquidity to ${pairName} on Uniswap `}
    </StyledLink>
  );
};

const FarmNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon="🏚"
        title="Not Found"
        subtitle="You've hit a farm just robbed by unicorns."
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center >
      <Button onClick={() => connect('injected')} text="Unlock Wallet" size='md' >
        <StyledWallet>
          
          <Wallet />
        </StyledWallet>
      </Button>
    </Center>
  );
};

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledUniswapLPGuide = styled.div`
  margin: -24px auto 48px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
  @media (max-width: 768px) {
    width: 90%;
    text-align: center;
    
  }
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 700px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  width: 600px;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width: 768px){
    width: 280px;
}
`;
const StyledWallet = styled.div`

  margin: 0 15px 0 -35px;

  @media only screen and (max-width: 768px){
    margin: 0 15px 0 0;
  }
`;

export default Farm;
