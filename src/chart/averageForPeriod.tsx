import { FC } from 'react';
import { IAverage } from './types';

const AverageForPeriod: FC<IAverage> = ({ data }) => {
  if (!data) {
    return null;
  }
  const average = (
    data.reduce((acc, item) => acc + item.value, 0) /
    (data.length + 1)
  ).toFixed(1);

  return (
    <div className={'averageForPeriod'}>
      <p className={'averageForPeriodTitle'}>Среднее за период</p>
      <div className={'averageTextNumber'}>
        <p className={'number'}>{average.replace('.', ',')}</p>
        <p className={'ruble'}>₽</p>
      </div>
    </div>
  );
};
export default AverageForPeriod;

