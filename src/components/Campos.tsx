import Message from './Msg'

interface Props {
  id: string
  label: string
  placeholder: string
  min: number
  max: number
  value: number
  handlerChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Campos({
  id,
  label,
  placeholder,
  min,
  max,
  value,
  handlerChange
}: Props) {
  const erro =
    value === 0 ? (
      <Message description='Campo obrigatório' />
    ) : value < min || value > max ? (
      <Message description={`Valor inválido para ${label}`} />
    ) : null

  const invalido = !value || value < min || value > max

  return (
    <div className='w-[88px] flex flex-col gap-y-[5px] font-bold lg:w-40'>
      <label
        htmlFor={id}
        className={`uppercase text-xs tracking-[3px] ${
          invalido ? 'text-red-500' : ''
        } lg:text-base`}
      >
        {label}
      </label>
      <input
        type='number'
        id={id}
        name={id}
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={handlerChange}
        className={`border rounded-md w-full h-[52px] px-2 text-xl focus:outline-none focus:border-[hsl(259,_100%,_65%)] lg:h-16 ${
          invalido ? 'border-red-500' : ''
        }`}
      />
      {erro}
    </div>
  )
}

export default Campos
