import { db } from '../../database/index.js'

class CategoryRepository {
  async create({ name }) {
    const [row] = await db.query(
      `
        INSERT INTO categories(
          name
        ) VALUES (
          $1
        ) RETURNING *
      `,
      [name]
    )

    return row
  }
}

export const categoryRepository = new CategoryRepository()
