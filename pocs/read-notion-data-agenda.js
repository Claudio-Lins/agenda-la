require('dotenv').config()

const { Client } = require('@notionhq/client')

const read = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const data = await notion.databases.query({
    database_id: '8fa5729224ff44608d5d671775dad957',
    page_size: 100,
  })
  data.results.forEach((result) => {
    const properties = result.properties
    console.log(properties)
})
console.log(properties.Dia[0])
}

read()
