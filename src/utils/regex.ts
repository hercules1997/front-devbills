
type RegexProps = Record<'date' | 'color' | 'categoryId', RegExp>  

export const allRegex: RegexProps = {
  date: /^(0[1-9]|[12][0-9]|3[01]\/0[0-9]|1[0-2]\/\d{4}$)/,
  color: /^#[A-Fa-f0-9]{6}$/,
  categoryId: /^(?!null$)/g,
} 