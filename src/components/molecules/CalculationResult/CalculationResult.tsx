import React from 'react';
import {
  Button, Col, Row, Table,
} from 'antd';

import type { ColumnsType } from 'antd/es/table';
import { ICalculationResult, IProductItem } from '../../../types';

interface IProps {
  data: ICalculationResult;
  addToBasketHandler: () => void;
}

export function CalculationResult({ data, addToBasketHandler }: IProps) {
  const totalSumm = data.product.reduce((acc, item) => {
    acc += Number(item.summ);
    return acc;
  }, 0);

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
    <Row gutter={[8, 8]}>
      <Col span={24}><Table columns={columns} dataSource={data.product} pagination={false} /></Col>
      <Col span={24}>{`Размер ячейки (чистый): ${data.cellSize}`}</Col>
      <Col span={24}>{`Площадь изделия: ${data.placeArea}`}</Col>
      <Col span={24}>{`Количество листов: ${data.numberOfSheets}`}</Col>
      <Col span={24}>{`Сумма итого: ${totalSumm.toFixed(2)}`}</Col>
      <Col span={24}>
        <Button onClick={addToBasketHandler} type="primary">В корзину</Button>
      </Col>
    </Row>
  );
}
