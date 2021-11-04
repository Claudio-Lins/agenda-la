require('dotenv').config()

const { Client } = require('@notionhq/client')

const registro = {
  Confirmado: { id: '%3Bnko', type: 'checkbox', checkbox: false },
  Paciente: {
    id: 'IaNt',
    type: 'rich_text',
    rich_text: [{ text: { content: 'Catarina Hermann' } }],
  },
  Date: {
    id: 'hQyS',
    type: 'date',
    date: { start: '2021-11-12T13:00:00.000+00:00', end: null },
  },
  Name: {
    id: 'title',
    type: 'title',
    title: [{ text: { content: 'Karen Hermann' } }],
  },
}

const insert = async () => {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  })

  const inserted = await notion.pages.create({
    parent: {
      database_id: 'c9592caf3fd24ec18192dc0b3027f960',
    },
    properties: registro,
  })

  console.log(inserted)

  //   const data = await notion.databases.query({
  //     database_id: 'c9592caf3fd24ec18192dc0b3027f960',
  //     page_size: 100,
  //   })
  //   data.results.forEach((result) => {
  //     const properties = result.properties
  //     console.log(properties)
  //     console.log(properties.Name)
  //     console.log(properties.Paciente)
  //   })
}

insert()
