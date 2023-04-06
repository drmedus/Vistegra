import React from 'react';
import { Table, Typography } from 'antd';

import type { ColumnsType } from 'antd/es/table';
import styled from 'styled-components';
import { IProductItem, TProduct } from '../../../types';

const { Title } = Typography;

interface IProps {
  basketItems: Array<TProduct>;
}

export function Basket({ basketItems }: IProps) {
  const columns: ColumnsType<IProductItem> = [
    {
      title: 'Наименование',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ед.',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: 'Кол-во',
      dataIndex: 'value',
      key: 'value',
    },
    {
      title: 'Сумма',
      key: 'summ',
      dataIndex: 'summ',
    },
  ];

  return (
    <Container>
      <Title level={2}>Корзина</Title>
      {
        basketItems.map((item) => (
          <ItemContainer>
            <Table columns={columns} dataSource={item} pagination={false} />
          </ItemContainer>
        ))
      }
    </Container>
  );
}

// Эти компоненты по необходимости / договоренности можно:
//  - оставить здесь (если их не много и они необходимы сугубо локально)
//  - перенести в отдельный файл рядом (например styled.ts)
//  - вынести в шеред компоненты если нужно их переиспользовать
// В нашем случае, я решил оставить их здесь для простоты.

const Container = styled.div`
  padding: 12px 0 0 0;
`;

const ItemContainer = styled.div`
  padding: 8px 0;
`;
