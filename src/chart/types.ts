export interface IData {
  date: string;
  month: string;
  indicator: string;
  value: number;
}

export enum Currency {
  dollar = 'Курс доллара',
  euro = 'Курс евро',
  yuan = 'Курс юаня',
}

export interface IAverage {
  data: IData[] | null;
}