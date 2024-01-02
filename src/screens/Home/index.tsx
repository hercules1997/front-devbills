import { InputMask } from '@react-input/mask'
import { Input } from '../../components/Input'
import { Logo } from '../../components/Logo'
import { Title } from '../../components/Title'
import {
  Aside,
  Balance,
  ChartAction,
  ChartContainer,
  ChartContent,
  Filters,
  Header,
  InputGroup,
  Main,
  SearchTransaction,
  Section,
  TransactionGroup,
} from './styles'
import { ButtonIcon } from '../../components/Button_Icon'
import { Card } from '../../components/Card'
import { Transaction } from '../../components/Transaction'
import { CreateCategoryDialog } from '../../components/Create_Category_Dialog'
import { CreateTransactionDialog } from '../../components/Create_Transaction_Dialog'
import { Categories_Pie_Chart } from '../../components/Categories_Pie_Chart'
import { Financial_Evolution_Bar_Chart } from '../../components/Financial_Evolution_Bar_Chart'

export const Home = () => {
  return (
    <>
      <Header>
        <Logo />
        <div>
          <CreateTransactionDialog />
          <CreateCategoryDialog />
        </div>
      </Header>

      <Main>
        <Section>
          <Filters>
            <Title title="Saldo" subtitle="Entradas e saídas no período" />

            <InputGroup>
              <InputMask
                type="date"
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Início"
                placeholder="dd/mm/aaaa"
              />
              <InputMask
                type="date"
                component={Input}
                mask="dd/mm/aaaa"
                replacement={{ d: /\d/, m: /\d/, a: /\d/ }}
                variant="dark"
                label="Fim"
                placeholder="dd/mm/aaaa"
              />
              <ButtonIcon />
            </InputGroup>
          </Filters>

          <Balance>
            <Card title="Saldo" amount={300000} />
            <Card title="Entradas" amount={10000} variant="incomes" />
            <Card title="Saídas" amount={90000} variant="expenses" />
          </Balance>

          <ChartContainer>
            <header>
              <Title
                title="Gastos"
                subtitle="Despesas por categorias no período"
              />
            </header>
            <ChartContent>
              <Categories_Pie_Chart />
            </ChartContent>
          </ChartContainer>
          <ChartContainer>
            <header>
              <Title
                title="Evolução financeira"
                subtitle="Saldo, Entradas e Gastos no ano"
              />
              <ChartAction>
                <InputMask
                  component={Input}
                  mask="aaaa"
                  replacement={{ a: /\d/ }}
                  variant="black"
                  label="Ano"
                  placeholder="aaaa"
                />
                <ButtonIcon />
              </ChartAction>
            </header>
            <ChartContent>
              <Financial_Evolution_Bar_Chart />
            </ChartContent>
          </ChartContainer>
        </Section>
        <Aside>
          <header>
            <Title title="Transações" subtitle="Entradas e Saídas" />

            <SearchTransaction>
              <Input variant="black" placeholder="Buscar transação..." />
              <ButtonIcon />
            </SearchTransaction>
          </header>

          <TransactionGroup>
            <Transaction
              id={1}
              title="Casa"
              amount={20000}
              date="04/12/2023"
              category={{ title: 'Aluguel', color: '#ff33dd' }}
            />
            <Transaction
              id={1}
              title="Casa"
              amount={20000}
              date="04/12/2023"
              category={{ title: 'Aluguel', color: '#ff33dd' }}
            />
            <Transaction
              id={1}
              title="Casa"
              amount={20000}
              date="04/12/2023"
              category={{ title: 'Aluguel', color: '#ff33dd' }}
            />
            <Transaction
              id={1}
              title="Casa"
              amount={20000}
              date="04/12/2023"
              category={{ title: 'Aluguel', color: '#ff33dd' }}
            />
          </TransactionGroup>
        </Aside>
      </Main>
    </>
  )
}
