import React from 'react';
import {
  Button, Select, Form, Input,
} from 'antd';
import {
  ICalculationResult, ICalculatorFormValues, IConfig, IData, TProduct,
} from '../../../types';

interface IProps {
  sheetsOptions: { value: number, label: string }[];
  framesOptions: { value: number, label: string }[];
  pipesOptions: { value: number, label: string }[];
  widthConfig: IConfig | undefined;
  lengthConfig: IConfig | undefined;
  fixConfig: IConfig[];
  frames: IConfig[];
  fix: IData[];
  pipes: IData[];
  sheets: IData[];
  saveResult: (result: ICalculationResult) => void;
}
export function Calculator({
  sheetsOptions,
  framesOptions,
  pipesOptions,
  widthConfig,
  lengthConfig,
  saveResult,
  fixConfig,
  frames,
  fix,
  pipes,
  sheets,
}: IProps) {
  const [form] = Form.useForm();

  const onFinish = (values: ICalculatorFormValues) => {
    const selectedSheet = sheets.find(
      (item) => item.name === sheetsOptions[values.sheet].label,
    )!;

    // Поскольку информацию о длине одного листа сервер нам не предоставляет, но по условию
    // мы знаем, что длина строго 1м, то площадь этого листа будет фактически
    // равна его ширине в метрах.
    const oneSheetArea = selectedSheet.width;

    // Специфических условий вычисления количества листов поставновкой
    // задачи не описывается, поэтому вычисляем самым простым способом
    // с округлением до целого листа в большую сторону..
    const numberOfSheets = Math.ceil((values.width * values.length) / oneSheetArea!);

    // Вычисление общей длины трубы
    const cellStep = frames.find(
      (item) => item.name === framesOptions[values.frame].label,
    )?.step;

    const selectedPipe = pipes.find(
      (item) => item.name === pipesOptions[values.pipe].label,
    )!;

    const pipeWidth = selectedPipe.width! / 1000;

    const numberOfWidthPipes = Math.trunc((values.width - pipeWidth!) / (cellStep! + pipeWidth!)) + 2;
    const numberOfLengthPipes = Math.trunc((values.length - pipeWidth!) / (cellStep! + pipeWidth!)) + 2;

    // По условию этого не требуется, но ,вероятно, к вычисленной итоговой длине трубы
    // стоит добавлять какой-то процент дополнительно на подрезку.
    const totalPipeLength = numberOfWidthPipes * values.length + numberOfLengthPipes * values.width
            - (numberOfWidthPipes * pipeWidth * numberOfLengthPipes);

    // Вычисление размера ячейки (чистого, без учета толщины трубы)
    const cellWidth = ((values.width - (numberOfWidthPipes * pipeWidth)) / (numberOfWidthPipes - 1)).toFixed(3);
    const cellLength = ((values.length - (numberOfLengthPipes * pipeWidth)) / (numberOfLengthPipes - 1)).toFixed(3);

    // Вычисление количества саморезов
    const selectedScrew = fix[0]; // В наличии только один вид самореза без признаков отличия
    const selectedScrewConfig = fixConfig.find((item) => item.key === selectedSheet.material)!;
    const numberOfScrew = selectedScrewConfig.value! * (values.width * values.length);

    // Структура необходимая исключительно для корзины.
    const product: TProduct = [
      {
        name: selectedSheet.name,
        unit: selectedSheet.unit!,
        value: String(selectedSheet.width! * numberOfSheets),
        summ: (selectedSheet.width! * numberOfSheets * selectedSheet.price!).toFixed(2),
      },
      {
        name: selectedPipe.name,
        unit: selectedPipe.unit!,
        value: totalPipeLength.toFixed(2),
        summ: (totalPipeLength * selectedPipe.price!).toFixed(2),
      },
      {
        name: selectedScrew.name,
        unit: selectedScrew.unit!,
        value: String(numberOfScrew),
        summ: (numberOfScrew * selectedScrew.price!).toFixed(2),
      },
    ];

    const result: ICalculationResult = {
      cellSize: `${cellWidth}м x ${cellLength}м`,
      placeArea: String(values.width * values.length),
      numberOfSheets: String(numberOfSheets),
      product,
    };

    saveResult(result);
  };

  const handleSizeChange = (
    name: string,
    value: string,
    min: number = 0,
    max: number = 100000,
    step: number = 0.1,
  ) => {
    // Логика ниже описана в дополнение к браузерной в инпуте.

    let result = Number(Number(value).toFixed(1));

    if (result % step !== 0) {
      result = result - (result % step) + step;
    }

    result = Number(result.toFixed(1));

    if (result > max) {
      result = max;
    }

    if (result < min) {
      result = min;
    }

    form.setFieldValue(name, result);
  };

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Лист"
        name="sheet"
        rules={[{ required: true, message: 'Укажите тип листа' }]}
      >
        <Select
          options={sheetsOptions}
        />
      </Form.Item>

      <Form.Item
        label="Труба"
        name="pipe"
        rules={[{ required: true, message: 'Укажите тип трубы' }]}
      >
        <Select
          options={pipesOptions}
        />
      </Form.Item>

      <Form.Item
        label="Прочность"
        name="frame"
        rules={[{ required: true, message: 'Укажите тип прочности' }]}
      >
        <Select
          options={framesOptions}
        />
      </Form.Item>

      <Form.Item
        label="Ширина"
        name="width"
        rules={[{ required: true, message: 'Укажите ширину' }]}
      >
        <Input
          value={form.getFieldValue('width')}
          type="number"
          min={widthConfig?.min}
          max={widthConfig?.max}
          step={widthConfig?.step}
          onChange={(event) => handleSizeChange(
            'width',
            event.target.value,
            widthConfig?.min,
            widthConfig?.max,
            widthConfig?.step,
          )}
        />
      </Form.Item>

      <Form.Item
        label="Длина"
        name="length"
        rules={[{ required: true, message: 'Укажите длину' }]}
      >
        <Input
          type="number"
          min={lengthConfig?.min}
          max={lengthConfig?.max}
          step={lengthConfig?.step}
          onChange={(event) => handleSizeChange(
            'length',
            event.target.value,
            lengthConfig?.min,
            lengthConfig?.max,
            lengthConfig?.step,
          )}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Вычислить
        </Button>
      </Form.Item>
    </Form>
  );
}
