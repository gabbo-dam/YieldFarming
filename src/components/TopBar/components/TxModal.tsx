import React, { useMemo } from 'react';
import Modal, { ModalProps } from '../../Modal';
import Label from '../../Label';
import Button from '../../Button';
import { TransactionDetails } from '../../../state/transactions/reducer';
import styled from 'styled-components';
import Transaction from './Transaction';
import ModalActions from '../../ModalActions';
import Spacer from '../../Spacer';
import { isTransactionRecent, useAllTransactions, useClearAllTransactions } from '../../../state/transactions/hooks';
import { Trash } from 'react-feather';
import Trans from '../../../icons/transaction/'
import Cross from '../../../icons/cross'

const TxModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const allTransactions = useAllTransactions();
  const { clearAllTransactions } = useClearAllTransactions();

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions);
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst);
  }, [allTransactions]);

  const pending = sortedRecentTransactions.filter((tx) => !tx.receipt);
  const confirmed = sortedRecentTransactions.filter((tx) => tx.receipt);

  const isEmpty = (confirmed?.length + pending?.length) == 0;
  return (
    <StyledModal>
      <div style={{ textAlign:'right'}}>
        <Cross />
      </div>
      <StyledTitleArea>
      
        <StyledModalTitle style={{textAlign: 'center', fontSize:'24px'}}>Transactions</StyledModalTitle>
        {confirmed?.length > 0 && (
          <StyledClearIconWrapper>
            <Trash onClick={clearAllTransactions} size="16" />
          </StyledClearIconWrapper>
        )}
      </StyledTitleArea>
      {pending?.length > 0 && (
        <>
          <Label text="Pending transactions" />
          <StyledTransactionList>
            {pending.map(tx => <Transaction key={tx.hash} tx={tx} />)}
          </StyledTransactionList>
          <Spacer size="sm" />
        </>
      )}
      {confirmed?.length > 0 && (
        <>
          <Label text="Recent transactions" />
          <StyledTransactionList>
            {confirmed.map(tx => <Transaction key={tx.hash} tx={tx} />)}
          </StyledTransactionList>
        </>
      )}
      {isEmpty && (
        <Center>
          <img src={require('../../../icons/transaction/transaction.svg')} alt='transaction' style={{margin: '30px 0'}} />
          <Label text="No transactions." color="#B7C8EC" />
        </Center>
      )}
      {/* <ModalActions>
        <Button text="Close" onClick={onDismiss} />
      </ModalActions> */}
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  width: 360px;
`;

const StyledTitleArea = styled.div`
  display: flex;
  align-items: center;
  
  height: ${props => props.theme.topBarSize}px;
  margin-top: ${props => -props.theme.spacing[4]}px;
`;

const StyledModalTitle = styled.div`
  color: ${props => props.theme.color.grey[300]};
  flex: 1;
  font-size: 18px;
  font-weight: 700;
`;

const StyledClearIconWrapper = styled.div`
  color: ${({ theme }) => theme.color.grey[300]};
`;

const StyledTransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime;
}

export default TxModal;