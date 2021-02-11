import React from 'react';
import styled from 'styled-components';

import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';

export interface ModalProps {
  onDismiss?: () => void;
}

const Modal: React.FC = ({ children }) => {
  return (
    <Container size="sm">
      <StyledModal>
        <div style={{width: '485px', height:'350px', margin: '0 auto'}}>
        <Card>
          <StyledBackground>
          <CardContent>{children}</CardContent>
          </StyledBackground>
        </Card>
        </div>
      </StyledModal>
    </Container>
  );
};

const StyledModal = styled.div`
  border-radius: 12px;
  box-shadow: 24px 24px 48px -24px ${(props) => props.theme.color.grey[900]};
  position: relative;
`;
const StyledBackground = styled.div`
  background-color: #1A2848;
  border: 2px solid #263760;
  height: 350px;
`;

export default Modal;
