import { useMemo } from 'react'
// import { theme } from '../../styles/theme'
// import { FormatCurrency } from '../../utils/format_currency'
import { ResponsiveBar } from '@nivo/bar'
import dayjs from 'dayjs'
import ptBRlocale from 'dayjs/locale/pt-br'
import { theme } from '../../styles/theme'
import { FormatCurrency } from '../../utils/format_currency'

dayjs.locale(ptBRlocale)

const api_Data = [
  {
    _id: {
      year: 2023,
      month: 1,
    },
    balance: 100000,
    incomes: 107777,
    expenses: 103110,
  },
  {
    _id: {
      year: 2023,
      month: 2,
    },
    balance: 100000,
    incomes: 122200,
    expenses: 107110,
  },
  {
    _id: {
      year: 2023,
      month: 3,
    },
    balance: 100000,
    incomes: 104400,
    expenses: 104450,
  },
  {
    _id: {
      year: 2023,
      month: 4,
    },
    balance: 160000,
    incomes: 134400,
    expenses: 104450,
  },
  {
    _id: {
      year: 2023,
      month: 5,
    },
    balance: 150000,
    incomes: 124400,
    expenses: 104450,
  },
  {
    _id: {
      year: 2023,
      month: 6,
    },
    balance: 200000,
    incomes: 164400,
    expenses: 104450,
  },
]

type Chart_Data = {
  month: string
  Saldo: number
  Entradas: number
  Saidas: number
}

export const Financial_Evolution_Bar_Chart = () => {
  const data = useMemo<Chart_Data[]>(() => {
    const chartData: Chart_Data[] = api_Data.map((item) => ({
      month: dayjs(`${item._id.year}-${item._id.month}-01`).format('MMM'),
      Saldo: item.balance,
      Entradas: item.incomes,
      Saidas: item.expenses,
    }))

    return chartData
  }, [])

  return (
    <ResponsiveBar
      data={data}
      keys={['Saldo', 'Entradas', 'Saidas']}
      colors={[theme.colors.info, theme.colors.primary, theme.colors.error]}
      indexBy={'month'}
      groupMode="grouped"
      enableLabel={false}
      enableGridY={false}
      padding={0.2}
      axisLeft={{
        tickSize: 0,
        format: FormatCurrency,
      }}
      margin={{ left: 80, bottom: 28 }}
      theme={{
        text: {
          fontFamily: 'Lexend',
          fontSize: 10,
          color: theme.colors.white,
        },
        axis: {
          ticks: {
            text: {
              fill: theme.colors.white,
            },
          },
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
      valueFormat={FormatCurrency}
    />
  )
}
