require('dotenv').config()

const { Client } = require('@notionhq/client')

const read = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: '2eafb7ce3d2c48c88b98fed8f0743fed',
    page_size: 100,
    filter: {
      property: 'Date',
      date: {
        after: new Date()
      }
    }
  })

  const blockedDays = data.results.map(
    (result) => result.properties.Date.date.start
  )

  console.log(blockedDays)

  const agora = new Date()

  //dias possíveis
  // desconsiderando sábados e domingo

  const isWeekend = (dayOfWeek) => dayOfWeek === 0 || dayOfWeek === 6
  const zeroPad = (number) => (number < 10 ? '0' + number : number.toString())
  const toDateString = (date) =>
    `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(
      date.getDate()
    )}`
  const isBlocked = date => blockedDays.indexOf(date) >= 0

  const diasPossiveis = []
  for (let i = 0; i < 60; i++) {
    agora.setDate(agora.getDate() + 1)
    const dayOfWeek = agora.getDay()
    if (!isWeekend(dayOfWeek) && !isBlocked(toDateString(agora))) {
      diasPossiveis.push({
        date: agora.toDateString(),
        dayOfWeek,
      })
    }
  }

  // Dados uma lista de dias, separa em semanas
  let primeiroDia = null
  const semana = []

  diasPossiveis.forEach((dia) => {
    if (primeiroDia == null) {
      primeiroDia = dia
    }
    if (dia.dayOfWeek === 5) {
      semana.push({
        start: primeiroDia,
        end: dia,
      })
      primeiroDia = null
    }
  })
  console.log(semana)
}
read()
