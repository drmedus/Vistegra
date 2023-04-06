import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'antd';
import { PageTemplate } from '../../templates/pageTemplate';
import { requestData } from '../../../store/slices/data/actions';
import { requestConfig } from '../../../store/slices/config/actions';
import { selectFix, selectLists, selectPipes } from '../../../store/slices/data/selectors';
import { selectFixConfig, selectFrames, selectSizes } from '../../../store/slices/config/selectors';
import { ICalculationResult } from '../../../types';
import { CalculationResult } from '../../molecules/CalculationResult';
import { addToBasket } from '../../../store/slices/basket/actions';
import { selectBasketItems } from '../../../store/slices/basket/selectors';
import { Basket } from '../../molecules/Basket';
import { Calculator } from '../../organisms/Calculator';

export function Home() {
  const dispatch = useDispatch();

  const [calculationResult, setCalculationResult] = useState<ICalculationResult>();

  const sheets = useSelector(selectLists);
  const pipes = useSelector(selectPipes);
  const sizes = useSelector(selectSizes);
  const frames = useSelector(selectFrames);
  const fix = useSelector(selectFix);
  const fixConfig = useSelector(selectFixConfig);
  const basketItems = useSelector(selectBasketItems);

  const addToBasketHandler = () => {
    if (calculationResult) {
      dispatch(addToBasket(calculationResult.product));
    }
  };

  const widthConfig = useMemo(
    () => sizes.find((item) => item.key === 'width'),
    [sizes],
  );

  const lengthConfig = useMemo(
    () => sizes.find((item) => item.key === 'length'),
    [sizes],
  );

  const sheetsOptions = useMemo(
    () => sheets.map((item, index) => ({ value: index, label: item.name })),
    [sheets],
  );

  const pipesOptions = useMemo(
    () => pipes.map((item, index) => ({ value: index, label: item.name })),
    [pipes],
  );

  const framesOptions = useMemo(
    () => frames.map((item, index) => ({ value: index, label: item.name })),
    [frames],
  );

  useEffect(() => {
    dispatch(requestData());
    dispatch(requestConfig());
  }, []);

  return (
    <PageTemplate title="Калькулятор">
      {Boolean(sheetsOptions.length) && (
        <Row gutter={[16, 32]}>
          <Col span={12}>
            <Calculator
              sheetsOptions={sheetsOptions}
              framesOptions={framesOptions}
              pipesOptions={pipesOptions}
              widthConfig={widthConfig}
              lengthConfig={lengthConfig}
              fixConfig={fixConfig}
              frames={frames}
              fix={fix}
              pipes={pipes}
              sheets={sheets}
              saveResult={(result) => setCalculationResult(result)}
            />
          </Col>
          <Col span={12}>
            {calculationResult
                && <CalculationResult data={calculationResult} addToBasketHandler={addToBasketHandler} />}
          </Col>
        </Row>
      )}
      {Boolean(basketItems.length) && (
        <Basket basketItems={basketItems} />
      )}
    </PageTemplate>
  );
}
