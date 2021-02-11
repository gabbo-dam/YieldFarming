import React from 'react'
import styled from 'styled-components'
import Layerx from '../../icons/layerx'

interface PageHeaderProps {
  icon?: React.ReactNode,
  subtitle?: string,
  title?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title }) => {
  return (
    <StyledPageHeader>
      <StyledIcon>{icon}</StyledIcon>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  padding-top: ${props => props.theme.spacing[6]}px;
  max-width: 512px;
  width: 100%;
  margin: 0 auto;
`

const StyledIcon = styled.div`
  font-size: 96px;
  height: 100px;
  line-height: 96px;
  text-align: center;
  width: 162px;
`

const StyledTitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const StyledSubtitle = styled.h3`
  color: #B7C8EC;
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0 0 0;
  padding: 0;
  text-align: center;
`

export default PageHeader