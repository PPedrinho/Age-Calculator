interface Props {
  value?: string
  name: string
}

function CamposData({ value = '- -', name }: Props) {
  return (
    <div className='italic font-extrabold text-[54px] leading-[62px] lg:text-8xl'>
      <span className='text-[hsl(259,_100%,_65%)]'>{value}</span>{' '}
      <span>{name}</span>
    </div>
  )
}

export default CamposData
