import { useState } from 'react'
import iconArrow from './assets/icon-arrow.svg'
import CamposData from './components/CamposData'
import Campos from './components/Campos'

import {
  diffYears,
  diffMonths,
  diffDays,
  addYear,
  addMonth,
  format
} from '@formkit/tempo'
import { validarData } from './schemas/data'

function App() {
  const [data, setData] = useState({ dia: 4, mes: 6, ano: 2004 })
  const [idade, setIdade] = useState({
    anos: '- -',
    meses: '- -',
    dias: '- -'
  })
  const [mensagemErro, setMensagemErro] = useState('')
  const [dataFuturaErro, setDataFuturaErro] = useState('')

  const aoAlterar = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((estadoAnterior) => ({
      ...estadoAnterior,
      [e.target.name]: Number(e.target.value)
    }))
  }

  const calcularIdade = (ano: string, mes: string, dia: string) => {
    const hoje = new Date()
    const dataNascimento = format(`${ano}-${mes}-${dia}`, 'YYYY-MM-DD')

    const anos = diffYears(hoje, dataNascimento)
    let dataTemp = addYear(dataNascimento, anos)

    const meses = diffMonths(hoje, dataTemp)
    dataTemp = addMonth(dataTemp, meses)

    const dias = diffDays(hoje, dataTemp)

    return { anos, meses, dias }
  }

  const aoEnviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    let dia = formData.get('dia')!.toString()
    let mes = formData.get('mes')!.toString()
    const ano = formData.get('ano')!.toString()

    if (dia.length === 1) dia = `0${dia}`
    if (mes.length === 1) mes = `0${mes}`

    const resultado = validarData({ year: ano, month: mes, day: dia })

    if (!resultado.success) {
      setMensagemErro('Formato de data incorreto')
      setTimeout(() => setMensagemErro(''), 5000)
      return
    }

    const dataInserida = new Date(`${ano}-${mes}-${dia}`)
    const hoje = new Date()

    if (dataInserida > hoje) {
      setDataFuturaErro('Data não pode ser no futuro.')
      setIdade({ anos: '- -', meses: '- -', dias: '- -' })
      setTimeout(() => setDataFuturaErro(''), 5000)
      return
    }

    setDataFuturaErro('') 

    const { anos, meses, dias } = calcularIdade(ano, mes, dia)
    setIdade({
      anos: String(anos),
      meses: String(meses),
      dias: String(dias)
    })
  }

  const botaoDesativado =
    Object.values(data).some((val) => !val) ||
    data.dia < 1 ||
    data.dia > 31 ||
    data.mes < 1 ||
    data.mes > 12 ||
    data.ano < 1900 ||
    data.ano > new Date().getFullYear()

  return (
    <main className='min-h-screen px-4 grid items-center bg-[hsl(0,_0%,_94%)]'>
      <form
        onSubmit={aoEnviar}
        className='mx-auto w-[343px] py-12 rounded-3xl rounded-br-[100px] bg-white font-poppins lg:w-[840px]'
      >
        <div className='w-full flex justify-between gap-x-1 px-6 lg:px-12 lg:justify-start lg:gap-x-8'>
          <Campos
            id='dia'
            label='dia'
            placeholder='DD'
            min={1}
            max={31}
            value={data.dia}
            handlerChange={aoAlterar}
          />
          <Campos
            id='mes'
            label='mês'
            placeholder='MM'
            min={1}
            max={12}
            value={data.mes}
            handlerChange={aoAlterar}
          />
          <Campos
            id='ano'
            label='ano'
            placeholder='AAAA'
            min={1900}
            max={new Date().getFullYear()}
            value={data.ano}
            handlerChange={aoAlterar}
          />
        </div>

        {mensagemErro && (
          <p className='mt-4 px-6 font-poppins font-normal italic text-xs text-red-500 leading-tight lg:px-12 lg:text-base'>
            {mensagemErro}
          </p>
        )}

        {dataFuturaErro && (
          <p className='mt-4 px-6 font-poppins font-normal italic text-xs text-red-500 leading-tight lg:px-12 lg:text-base'>
            {dataFuturaErro}
          </p>
        )}

        <div className='mt-[66px] relative px-6 lg:px-12'>
          <hr />
          <button
            disabled={botaoDesativado}
            className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-16 h-16 bg-[hsl(259,_100%,_65%)] rounded-full flex items-center justify-center hover:bg-slate-900 ${
              botaoDesativado ? 'opacity-80' : ''
            } lg:left-auto lg:right-0`}
          >
            <img src={iconArrow} alt='Ícone de seta' className='w-[26px]' />
          </button>
        </div>

        <div className='mt-16 pl-6 grid lg:px-12'>
          <CamposData name='Anos' value={idade.anos} />
          <CamposData name='Meses' value={idade.meses} />
          <CamposData name='Dias' value={idade.dias} />
        </div>
      </form>
    </main>
  )
}

export default App
