import React, { ReactNode } from 'react';
import { Layout, Typography } from 'antd';
import styled from 'styled-components';

const { Content } = Layout;
const { Title } = Typography;

interface IProps {
  title?: string;
  children?: ReactNode;
}

export function PageTemplate({ title, children }: IProps) {
  return (
    <LayoutContainer>
      {title && <PageTitle>{title}</PageTitle>}
      <Content>
        {children}
      </Content>
    </LayoutContainer>
  );
}

// Эти компоненты по необходимости / договоренности можно:
//  - оставить здесь (если их не много и они необходимы сугубо локально)
//  - перенести в отдельный файл рядом (например styled.ts)
//  - вынести в шеред компоненты если нужно их переиспользовать
// В нашем случае, я решил оставить их здесь для простоты.

const LayoutContainer = styled(Layout)`
  padding: 12px;
`;

const PageTitle = styled(Title)`
  padding: 8px 0;
`;
