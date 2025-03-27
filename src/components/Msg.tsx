interface Props {
  description: string
}

function Mensagem({ description }: Props) {
  return (
    <span className='font-poppins font-normal italic text-xs text-red-500 leading-tight lg:text-base'>
      {description}
    </span>
  )
}

export default Mensagem
