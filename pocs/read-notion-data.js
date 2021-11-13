require('dotenv').config()


const { Client } = require('@notionhq/client')

const read = async () => {
    const notion = new Client({
        auth: process.env.NOTION_SECRET
    })

    const data = await notion.databases.query({
        database_id: '2eafb7ce3d2c48c88b98fed8f0743fed',
        page_size: 100
    })
    data.results.forEach((result) => {
        const blockedDate = result.properties.Date.date.start
        console.log(blockedDate)
    })
}

read()
