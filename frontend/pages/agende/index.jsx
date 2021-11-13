import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import Image from 'next/image'

const fetcher = async (url) => {
  const data = await fetch(url)
  const json = await data.json()
  return json
}

const friendlyDate = (date) => date.split('-').reverse().join('/')

export default function index() {
  const { data } = useSWR('/api/weeks', fetcher)
  return (
    <div className='md:px-8'>
      <h1 className='font-bold text-pink-700 text-2xl'>Agende</h1>
      <p className='mb-4 text-pink-600'>
        Selecione uma semana para agendar seu horário
      </p>
      {!data && (
        <p className='text-pink-600 font-bold animate-pulse'>Carrengando...</p>
      )}
      {data && (
        <div className='flex flex-wrap justify-evenly items-center'>
          {data.weeks.map((week) => {
            return (
              <div className='mb-4 w-full md:w-auto'>
                <Link href={`/agende/` + week.start.date + '/' + week.end.date}>
                  <a>
                    <h2 class='text-center font-bold text-2xl text-white bg-pink-600 px-2 py-1 rounded-t-lg'>
                      Semana
                    </h2>
                    <div className='flex justify-center px-8 space-x-2 bg-pink-200 rounded-b-lg py-3'>
                      <p className='text-pink-800 text-lg'>
                        {friendlyDate(week.start.date)}
                      </p>
                      <p className='text-xl text-pink-800'>a</p>
                      <p className='text-pink-800 text-lg'>
                        {friendlyDate(week.end.date)}
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
