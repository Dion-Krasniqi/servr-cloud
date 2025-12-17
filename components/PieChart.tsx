"use client"
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
import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

export const description = "A donut chart"



const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Document",
    color: "#6366F1",
  },
  all: {
    label: "Image",
    color: "var(--chart-2)",
  },
  
} satisfies ChartConfig

const PChart = ({item1,item2}:{item1:number;item2:number;}) => {
  const chartData = [
  { type: "used", size: item1, fill: "#6366F1" },
  { type: "all", size: item2, fill: "#e1e1e1ff" },
  
]
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Storage</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="size"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          <p>Storage left: {Math.round(item2 - item1)}KB</p>
        </div>
        
      </CardFooter>
    </Card>
  )
}

export default PChart
