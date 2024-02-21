import { IData } from './chart/types';

export const getData = async (): Promise<IData[]> => {
  const result = await fetch(
    'https://65d64e50f6967ba8e3bde6ae.mockapi.io/api/currencies'
  );
  return await result.json();
};