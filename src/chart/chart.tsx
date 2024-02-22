import { FC, useEffect, useState } from 'react';
import { ReactECharts } from '../Echarts/ReactECharts';
import { Currency, IData } from './types';
import { presetGpnDefault, Theme } from '@consta/uikit/Theme';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';
import './styles.css';
import AverageForPeriod from './averageForPeriod';
import { getData } from '../getData';

const Chart: FC = () => {
  const [currency, setCurrency] = useState<Currency>(Currency.dollar);
  const [data, setData] = useState<IData[] | null>(null);

  useEffect(() => {
    getData().then((response) => {
      const filteredData = response.filter((e) => e.indicator === currency);
      setData(filteredData);
    });
  }, [currency]);

  const getItemLabel = (item: Currency) => {
    switch (item) {
      case Currency.dollar:
        return '$';
      case Currency.euro:
        return '€';
      case Currency.yuan:
        return '¥';
    }
  };

  return (
    <Theme preset={presetGpnDefault}>
      <div className={'chartContainer'} style={{ width: '100%', height: 600 }}>
        <div className={'chartBlock'}>
          <ReactECharts
            loading={!data}
            option={{
              title: {
                text: `${currency.toUpperCase()} ${getItemLabel(currency)}/₽`,
                textStyle: {
                  color: '#002033',
                  fontWeight: 700,
                  fontSize: 20,
                  lineHeight: 30,
                },
              },
              tooltip: {
                trigger: 'axis',
                valueFormatter: (value: number) => `${value}₽`,
              },
              grid: {
                x: 40,
                y: 100,
                x2: 40,
                y2: 80,
              },
              xAxis: {
                type: 'category',
                data: data
                  ?.sort(
                    (a, b) =>
                      new Date(a.date).getTime() - new Date(b.date).getTime()
                  )
                  .map((e) => e.month),
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    type: 'dashed',
                  },
                },
              },
              yAxis: {
                splitLine: {
                  show: true,
                  lineStyle: {
                    type: [3, 5],
                    dashOffset: 5,
                  },
                },
                type: 'value',
                min: data
                  ? data.sort((a, b) => a.value - b.value)[0].value - 2
                  : 0,

                max: data
                  ? data.sort((a, b) => b.value - a.value)[0].value + 2
                  : 0,
                axisLabel: {
                  showMinLabel: false,
                },
              },
              series: [
                {
                  data: data
                    ?.sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .map((e) => e.value),
                  type: 'line',
                  smooth: true,
                  showSymbol: false,
                  name: 'Курс доллара',
                  color: '#F38B00',
                  symbol: 'none',
                },
              ],
            }}
          />
        </div>

        <ChoiceGroup
          className={'currencySwitcher'}
          items={[Currency.dollar, Currency.euro, Currency.yuan]}
          name={'currencies'}
          getItemLabel={getItemLabel}
          value={currency}
          onChange={(event) => {
            setCurrency(event.value);
          }}
          size={'s'}
        />
        <AverageForPeriod data={data} />
      </div>
    </Theme>
  );
};

export default Chart;