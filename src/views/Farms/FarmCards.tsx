import React, { useCallback, useEffect, useState } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import styled from 'styled-components';

import { Farm } from '../../layerx';
import Button from '../../components/Button';
import Card from '../../components/Card';
import CardContent from '../../components/CardContent';
import CardIcon from '../../components/CardIcon';
import Loader from '../../components/Loader';
import useFarms from '../../hooks/useFarms';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';

const FarmCards: React.FC = () => {
  const [farms] = useFarms();

  const activeFarms = farms.filter((farm) => !farm.finished);
  const inactiveFarms = farms.filter((farm) => farm.finished);

  let finishedFirstRow = false;
  const activeRows = activeFarms.reduce<Farm[][]>(
    (farmRows, farm) => {
      const newFarmRows = [...farmRows];
      if (newFarmRows[newFarmRows.length - 1].length === (finishedFirstRow ? 3 : 3)) {
        newFarmRows.push([farm]);
        finishedFirstRow = true;
      } else {
        newFarmRows[newFarmRows.length - 1].push(farm);
      }
      return newFarmRows;
    },
    [[]],
  );
  const inactiveRows = inactiveFarms.reduce<Farm[][]>(
    (farmRows, farm) => {
      const newFarmRows = [...farmRows];
      if (newFarmRows[newFarmRows.length - 1].length === (finishedFirstRow ? 2 : 3)) {
        newFarmRows.push([farm]);
        finishedFirstRow = true;
      } else {
        newFarmRows[newFarmRows.length - 1].push(farm);
      }
      return newFarmRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have farms where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeRows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {j < farmRow.length - 1 && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveFarmTitle>Inactive Farms</StyledInactiveFarmTitle>
          {inactiveRows.map((farmRow, i) => (
            <StyledRow key={i}>
              {farmRow.map((farm, j) => (
                <React.Fragment key={j}>
                  <FarmCard farm={farm} />
                  {j < farmRow.length - 1 && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface FarmCardProps {
  farm: Farm;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  return (
    <StyledCardWrapper>
      {farm.depositTokenName.includes('LP') &&
        (farm.depositTokenName.includes('VDS_DAI') ? (
          <StyledCardSuperAccent />
        ) : (
          <StyledCardAccent />
        ))}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <TokenSymbol symbol={farm.depositTokenName} size={54} />
            </CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.depositTokenName.toUpperCase()}</StyledDetail>
              <StyledDetail>Earn {`Voodoo ${farm.earnTokenName}`}</StyledDetail>
            </StyledDetails>
            <Button text="Select" to={`/farm/${farm.contract}`} />
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  );
};

const StyledCardAccent = styled.div`
  // background: linear-gradient(
  //   45deg,
  //   rgba(255, 0, 0, 1) 0%,
  //   rgba(255, 154, 0, 1) 10%,
  //   rgba(208, 222, 33, 1) 20%,
  //   rgba(79, 220, 74, 1) 30%,
  //   rgba(63, 218, 216, 1) 40%,
  //   rgba(47, 201, 226, 1) 50%,
  //   rgba(28, 127, 238, 1) 60%,
  //   rgba(95, 21, 242, 1) 70%,
  //   rgba(186, 12, 248, 1) 80%,
  //   rgba(251, 7, 217, 1) 90%,
  //   rgba(255, 0, 0, 1) 100%
  // );
  border-radius: 12px;
  filter: blur(4px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

const StyledCardSuperAccent = styled.div`
  // background: linear-gradient(
  //   45deg,
  //   rgba(255, 0, 0, 1) 0%,
  //   rgba(255, 154, 0, 1) 10%,
  //   rgba(208, 222, 33, 1) 20%,
  //   rgba(79, 220, 74, 1) 30%,
  //   rgba(63, 218, 216, 1) 40%,
  //   rgba(47, 201, 226, 1) 50%,
  //   rgba(28, 127, 238, 1) 60%,
  //   rgba(95, 21, 242, 1) 70%,
  //   rgba(186, 12, 248, 1) 80%,
  //   rgba(251, 7, 217, 1) 90%,
  //   rgba(255, 0, 0, 1) 100%
  // );
  border-radius: 12px;
  filter: blur(8px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`;

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;

  button {
    margin-top: auto;
  }
`;

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`;

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[300]};
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveFarmTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default FarmCards;
