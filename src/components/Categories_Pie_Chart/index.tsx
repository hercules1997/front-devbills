import { ResponsivePie } from '@nivo/pie'
import { useMemo } from 'react'
import { theme } from '../../styles/theme'
import { FormatCurrency } from '../../utils/format_currency'

const api_Data = [
  {
    _id: '1',
    title: 'Alimentação',
    amount: 120000,
    color: '#0c90ab',
  },
  {
    _id: '2',
    title: 'Aluguel',
    amount: 90000,
    color: '#13bf10',
  },
  {
    _id: '3',
    title: 'Internet',
    amount: 10000,
    color: '#230076',
  },
  {
    _id: '4',
    title: 'Combustível',
    amount: 50000,
    color: '#c0c90d',
  },
]

type Chart_Data = {
  id: string
  label: string
  externalId: string
  value: number
  color: string
}

export const Categories_Pie_Chart = () => {
  const data = useMemo<Chart_Data[]>(() => {
    const chartData = api_Data.map((item) => ({
      id: item.title,
      label: item.title,
      externalId: item._id,
      value: item.amount,
      color: item.color,
    }))

    return chartData
  }, [])

  return (
    <ResponsivePie
      data={data}
      enableArcLabels={false}
      enableArcLinkLabels={false}
      colors={({ data }) => data.color}
      valueFormat={FormatCurrency}
      margin={{ top: 22 }}
      theme={{
        text: {
          fontFamily: 'Lexend',
          fontSize: 10,
        },
        tooltip: {
          container: {
            backgroundColor: theme.colors.black,
            padding: 16,
            color: theme.colors.white,
            fontFamily: 'Lexend',
            fontSize: 12,
            borderRadius: 4,
          },
        },
      }}
      legends={[
        {
          anchor: 'top',
          direction: 'row',
          justify: false,
          translateX: 0,
          translateY: -20,
          itemWidth: 120,
          itemHeight: 16,
          itemTextColor: theme.colors.white,
          itemDirection: 'left-to-right',
          itemOpacity: 1,
          symbolSize: 10,
          symbolShape: 'circle',
        },
      ]}
    />
  )
}
