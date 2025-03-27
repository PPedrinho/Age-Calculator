import { z } from 'zod'

interface DataNascimento {
  year: string
  month: string
  day: string
}

const esquemaData = z.string().date()

export const validarData = ({ year, month, day }: DataNascimento) => {
  return esquemaData.safeParse(`${year}-${month}-${day}`)
}
