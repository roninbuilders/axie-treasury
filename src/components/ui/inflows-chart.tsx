"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, LabelList, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { browser: "breeding", inflows: 275, fill: "var(--color-breeding)" },
  { browser: "ryc", inflows: 200, fill: "var(--color-ryc)" },
  { browser: "marketplace", inflows: 187, fill: "var(--color-marketplace)" },
  { browser: "ascension", inflows: 173, fill: "var(--color-ascension)" },
  { browser: "evolution", inflows: 173, fill: "var(--color-evolution)" },
  { browser: "other", inflows: 90, fill: "var(--color-other)" },
]
const chartConfig = {
  inflows: {
    label: "Inflows",
  },
  breeding: {
    label: "Breeding fees",
    color: "hsl(var(--chart-1))",
  },
  ryc: {
    label: "R&C minting fees",
    color: "hsl(var(--chart-2))",
  },
  marketplace: {
    label: "Marketplace fees",
    color: "hsl(var(--chart-3))",
  },
  ascension: {
    label: "Ascension fees",
    color: "hsl(var(--chart-4))",
  },
  evolution: {
    label: "Evolution fees",
    color: "hsl(var(--chart-5))",
  },
  other: {
    label: "Other fees",
    color: "hsl(var(--chart-6))",
  },
} satisfies ChartConfig

export function InflowsChart({ data = chartData }: { data?: typeof chartData }) {
  const totalInflows = data.reduce((acc, { inflows }) => acc + (inflows || 0), 0)
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Cummulative inflows revenue chart</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel  />}
            />
            <Pie
              data={chartData}
              dataKey="inflows"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >

              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalInflows}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          ETH
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing total inflows for the last 3 months
        </div>
      </CardFooter>
    </Card>
  )
}
