import { Client }  from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

export const getBlockedDays = async () => {

  const data = await notion.databases.query({
    database_id: process.env.BLOCKED_DB,
    page_size: 100,
    filter: {
      property: 'Date',
      date: {
        after: new Date(),
      },
    },
  })

  const blockedDays = data.results.map(
    (result) => result.properties.Date.date.start
  )
  return blockedDays
}

export const getCountEventsByDay = async (start, end) => {

  const data = await notion.databases.query({
    database_id: 'c9592caf3fd24ec18192dc0b3027f960',
    page_size: 100,
    filter: {
      and: [
        {
          property: 'Date',
          date: {
            on_or_after: start,
          },
        },
        {
          property: 'Date',
          date: {
            on_or_before: end,
          },
        },
      ],
    },
  })
  const countings = data.results
    .map((result) => result.properties.Date.date.start)
    .map((date) => date.split('T')[0])
    .reduce((prev, curr) => {
      if (!prev[curr]) {
        prev[curr] = 0
      }
      prev[curr]++
      return prev
    }, {})
  
    return countings
}
 