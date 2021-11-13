import useSWR from 'swr'
import { useRouter } from 'next/router'
import Link from 'next/link'

const fetcher = async (url) => {
  const data = await fetch(url)
  const json = await data.json()
  return json
}

const friendlyDate = (date) => (date ? date.split('-').reverse().join('/') : '')

const daysOfWeekNames = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

export default function Agende() {
  const router = useRouter()
  const { data } = useSWR(
    router.query.startDate
      ? '/api/days?start=' +
          router.query.startDate +
          '&end=' +
          router.query.endDate
      : null,
    fetcher
  )
  return (
    <div className='md:px-8'>
      <h1 className=' font-bold text-pink-700 text-2xl'>Agende</h1>
      <p className='mb-4 text-pink-600'>
        Selecione um dia para agendar seu horário (Semana selecionada:{' '}
        {friendlyDate(router.query.startDate)} a{' '}
        {friendlyDate(router.query.endDate)})
      </p>
      {!data && <p>Carrengando...</p>}
      {data && (
        <div className='flex flex-wrap justify-evenly items-center'>
          {data.possibleDaysRange.map((day) => {
            if (day.available) {
              return (
                <div className='m-2 w-1/3 md:w-auto'>
                  <Link href={`/agende/` + day.date + '/' + day.date}>
                    <a>
                      <h2 class='text-center font-bold text-2xl text-white bg-pink-600 px-2 py-1 rounded-t-lg tracking-wide'>
                        Dia
                      </h2>
                      <div className='flex flex-col justify-center items-center px-4 space-x-2 bg-pink-200 rounded-b-lg py-3'>
                        <p className='text-pink-800 text-lg'>
                          {friendlyDate(day.date)}
                        </p>
                        <p className='text-pink-800 text-xs'>
                          {daysOfWeekNames[day.dayOfWeek]}
                        </p>
                      </div>
                    </a>
                  </Link>
                </div>
              )
            }
            return (
              <span className='cursor-not-allowed opacity-30'>
                <h2 class='text-center font-bold text-2xl text-white bg-pink-600 px-2 py-1 rounded-t-lg tracking-wide'>
                  Dia
                </h2>
                <div className='flex flex-col justify-center px-4 space-x-2 bg-pink-200 rounded-b-lg py-3'>
                  <p className='text-pink-800 text-lg'>
                    {friendlyDate(day.date)}
                  </p>
                  <p className='text-pink-800 text-xs'>
                    {daysOfWeekNames[day.dayOfWeek]}
                  </p>
                </div>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}
