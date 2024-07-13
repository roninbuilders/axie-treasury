import { ChartConfig } from "../ui/chart"

interface ChartDataPoint {
    date: number;
    value: number;
    inflows: number;
    outflows: number;
  }

export const chartData = [
    {
      "date": 1711929600000,
      "inflows": 222,
      "outflows": 150,
      "value": 900
    },
    {
      "date": 1712016000000,
      "inflows": 97,
      "outflows": 180,
      "value": 900
    },
    {
      "date": 1712102400000,
      "inflows": 167,
      "outflows": 120,
      "value": 900
    },
    {
      "date": 1712188800000,
      "inflows": 242,
      "outflows": 260,
      "value": 900
    },
    {
      "date": 1712275200000,
      "inflows": 373,
      "outflows": 290,
      "value": 9000
    },
    {
      "date": 1712361600000,
      "inflows": 301,
      "outflows": 340,
      "value": 9000
    },
    {
      "date": 1712448000000,
      "inflows": 245,
      "outflows": 180,
      "value": 9000
    },
    {
      "date": 1712534400000,
      "inflows": 409,
      "outflows": 320,
      "value": 9000
    },
    {
      "date": 1712620800000,
      "inflows": 59,
      "outflows": 110,
      "value": 9000
    },
    {
      "date": 1712707200000,
      "inflows": 261,
      "outflows": 190,
      "value": 9000
    },
    {
      "date": 1712793600000,
      "inflows": 327,
      "outflows": 350,
      "value": 9000
    },
    {
      "date": 1712880000000,
      "inflows": 292,
      "outflows": 210,
      "value": 9000
    },
    {
      "date": 1712966400000,
      "inflows": 342,
      "outflows": 380,
      "value": 9000
    },
    {
      "date": 1713052800000,
      "inflows": 137,
      "outflows": 220,
      "value": 9000
    },
    {
      "date": 1713139200000,
      "inflows": 120,
      "outflows": 170,
      "value": 9000
    },
    {
      "date": 1713225600000,
      "inflows": 138,
      "outflows": 190,
      "value": 9000
    },
    {
      "date": 1713312000000,
      "inflows": 446,
      "outflows": 360,
      "value": 9000
    },
    {
      "date": 1713398400000,
      "inflows": 364,
      "outflows": 410,
      "value": 9000
    },
    {
      "date": 1713484800000,
      "inflows": 243,
      "outflows": 180,
      "value": 9000
    },
    {
      "date": 1713571200000,
      "inflows": 89,
      "outflows": 150,
      "value": 9000
    },
    {
      "date": 1713657600000,
      "inflows": 137,
      "outflows": 200,
      "value": 9000
    },
    {
      "date": 1713744000000,
      "inflows": 224,
      "outflows": 170,
      "value": 9000
    },
    {
      "date": 1713830400000,
      "inflows": 138,
      "outflows": 230,
      "value": 9000
    },
    {
      "date": 1713916800000,
      "inflows": 387,
      "outflows": 290,
      "value": 9000
    },
    {
      "date": 1714003200000,
      "inflows": 215,
      "outflows": 250,
      "value": 9000
    },
    {
      "date": 1714089600000,
      "inflows": 75,
      "outflows": 130,
      "value": 1000
    },
    {
      "date": 1714176000000,
      "inflows": 383,
      "outflows": 420,
      "value": 1000
    },
    {
      "date": 1714262400000,
      "inflows": 122,
      "outflows": 180,
      "value": 1000
    },
    {
      "date": 1714348800000,
      "inflows": 315,
      "outflows": 240,
      "value": 1000
    },
    {
      "date": 1714435200000,
      "inflows": 454,
      "outflows": 380,
      "value": 1000
    },
    {
      "date": 1714521600000,
      "inflows": 165,
      "outflows": 220,
      "value": 1000
    },
    {
      "date": 1714608000000,
      "inflows": 293,
      "outflows": 310,
      "value": 1000
    },
    {
      "date": 1714694400000,
      "inflows": 247,
      "outflows": 190,
      "value": 1000
    },
    {
      "date": 1714780800000,
      "inflows": 385,
      "outflows": 420,
      "value": 1000
    },
    {
      "date": 1714867200000,
      "inflows": 481,
      "outflows": 390,
      "value": 1000
    },
    {
      "date": 1714953600000,
      "inflows": 498,
      "outflows": 520,
      "value": 1000
    },
    {
      "date": 1715040000000,
      "inflows": 388,
      "outflows": 300,
      "value": 1000
    },
    {
      "date": 1715126400000,
      "inflows": 149,
      "outflows": 210,
      "value": 1000
    },
    {
      "date": 1715212800000,
      "inflows": 227,
      "outflows": 180,
      "value": 10000
    },
    {
      "date": 1715299200000,
      "inflows": 293,
      "outflows": 330,
      "value": 10000
    },
    {
      "date": 1715385600000,
      "inflows": 335,
      "outflows": 270,
      "value": 10000
    },
    {
      "date": 1715472000000,
      "inflows": 197,
      "outflows": 240,
      "value": 10000
    },
    {
      "date": 1715558400000,
      "inflows": 197,
      "outflows": 160,
      "value": 10000
    },
    {
      "date": 1715644800000,
      "inflows": 448,
      "outflows": 490,
      "value": 10000
    },
    {
      "date": 1715731200000,
      "inflows": 473,
      "outflows": 380,
      "value": 10000
    },
    {
      "date": 1715817600000,
      "inflows": 338,
      "outflows": 400,
      "value": 10000
    },
    {
      "date": 1715904000000,
      "inflows": 499,
      "outflows": 420,
      "value": 10000
    },
    {
      "date": 1715990400000,
      "inflows": 315,
      "outflows": 350,
      "value": 10000
    },
    {
      "date": 1716076800000,
      "inflows": 235,
      "outflows": 180,
      "value": 10000
    },
    {
      "date": 1716163200000,
      "inflows": 177,
      "outflows": 230,
      "value": 10000
    },
    {
      "date": 1716249600000,
      "inflows": 82,
      "outflows": 140,
      "value": 10000
    },
    {
      "date": 1716336000000,
      "inflows": 81,
      "outflows": 120,
      "value": 10000
    },
    {
      "date": 1716422400000,
      "inflows": 252,
      "outflows": 290,
      "value": 10000
    },
    {
      "date": 1716508800000,
      "inflows": 294,
      "outflows": 220,
      "value": 10000
    },
    {
      "date": 1716595200000,
      "inflows": 201,
      "outflows": 250,
      "value": 10000
    },
    {
      "date": 1716681600000,
      "inflows": 213,
      "outflows": 170,
      "value": 10000
    },
    {
      "date": 1716768000000,
      "inflows": 420,
      "outflows": 460,
      "value": 10000
    },
    {
      "date": 1716854400000,
      "inflows": 233,
      "outflows": 190,
      "value": 10000
    },
    {
      "date": 1716940800000,
      "inflows": 78,
      "outflows": 130,
      "value": 10000
    },
    {
      "date": 1717027200000,
      "inflows": 340,
      "outflows": 280,
      "value": 10000
    },
    {
      "date": 1717113600000,
      "inflows": 178,
      "outflows": 230,
      "value": 10000
    },
    {
      "date": 1717200000000,
      "inflows": 178,
      "outflows": 200,
      "value": 10000
    },
    {
      "date": 1717286400000,
      "inflows": 470,
      "outflows": 410,
      "value": 10000
    },
    {
      "date": 1717372800000,
      "inflows": 103,
      "outflows": 160,
      "value": 10000
    },
    {
      "date": 1717459200000,
      "inflows": 439,
      "outflows": 380,
      "value": 10000
    },
    {
      "date": 1717545600000,
      "inflows": 88,
      "outflows": 140,
      "value": 10000
    },
    {
      "date": 1717632000000,
      "inflows": 294,
      "outflows": 250,
      "value": 10000
    },
    {
      "date": 1717718400000,
      "inflows": 323,
      "outflows": 370,
      "value": 10000
    },
    {
      "date": 1717804800000,
      "inflows": 385,
      "outflows": 320,
      "value": 10000
    },
    {
      "date": 1717891200000,
      "inflows": 438,
      "outflows": 480,
      "value": 10000
    },
    {
      "date": 1717977600000,
      "inflows": 155,
      "outflows": 200,
      "value": 10000
    },
    {
      "date": 1718064000000,
      "inflows": 92,
      "outflows": 150,
      "value": 10000
    },
    {
      "date": 1718150400000,
      "inflows": 492,
      "outflows": 420,
      "value": 10000
    },
    {
      "date": 1718236800000,
      "inflows": 81,
      "outflows": 130,
      "value": 10000
    },
    {
      "date": 1718323200000,
      "inflows": 426,
      "outflows": 380,
      "value": 10000
    },
    {
      "date": 1718409600000,
      "inflows": 307,
      "outflows": 350,
      "value": 10000
    },
    {
      "date": 1718496000000,
      "inflows": 371,
      "outflows": 310,
      "value": 10000
    },
    {
      "date": 1718582400000,
      "inflows": 475,
      "outflows": 520,
      "value": 10000
    },
    {
      "date": 1718668800000,
      "inflows": 107,
      "outflows": 170,
      "value": 10000
    },
    {
      "date": 1718755200000,
      "inflows": 341,
      "outflows": 290,
      "value": 10000
    },
    {
      "date": 1718841600000,
      "inflows": 408,
      "outflows": 450,
      "value": 10000
    },
    {
      "date": 1718928000000,
      "inflows": 169,
      "outflows": 210,
      "value": 10000
    },
    {
      "date": 1719014400000,
      "inflows": 317,
      "outflows": 270,
      "value": 10000
    },
    {
      "date": 1719100800000,
      "inflows": 480,
      "outflows": 530,
      "value": 10000
    },
    {
      "date": 1719187200000,
      "inflows": 132,
      "outflows": 180,
      "value": 10000
    },
    {
      "date": 1719273600000,
      "inflows": 141,
      "outflows": 190,
      "value": 10000
    },
    {
      "date": 1719360000000,
      "inflows": 434,
      "outflows": 380,
      "value": 10000
    },
    {
      "date": 1719446400000,
      "inflows": 448,
      "outflows": 490,
      "value": 10000
    },
    {
      "date": 1719532800000,
      "inflows": 149,
      "outflows": 200,
      "value": 11000
    },
    {
      "date": 1719619200000,
      "inflows": 103,
      "outflows": 160,
      "value": 11000
    },
    {
      "date": 1719705600000,
      "inflows": 446,
      "outflows": 400,
      "value": 11000
    }
  ] satisfies ChartDataPoint[]
  
  export const chartConfig = {
    value: {
      label: "Treasury",
      color: "red",
    },
    inflows: {
      label: "Inflows",
      color: "hsl(var(--chart-7))",
    },
    outflows: {
      label: "Outflows",
      color: "hsl(var(--chart-8))",
    },
  } satisfies ChartConfig
  