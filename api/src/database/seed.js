import { db } from './index.js'

async function main() {
  try {
    for (let i = 0; i <= 2000; i++) {
      await db.query(
        `
          INSERT INTO contacts (name)
          VALUES ($1)
        `,
        [`Contact ${i}`],
      )

      console.log(`Contact ${i} inserted`)
    }
  } catch (error) {
    console.log(error)
  }
}

main()
