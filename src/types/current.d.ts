export interface CurrentCoins {
  ask: number | bigint;
   bid: number | bigint;
  code: string;
   codein: string;
   create_date: string | number;
   high: number | bigint;
   low: number | bigint;
   name: string;
   pctChange: string;
   timestamp: string;
   varBid: string;
}
export interface DataType  { 
  labels: Array, 
  datasets: [{data: CurrentCoins | LineChartData, }]
}

type Coins = {
  currentCoins: CurrentCoins | null;
  type: Type | null
};
