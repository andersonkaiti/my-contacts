import { db } from '../../database/index.js'

class CategoryRepository {
  async findAll() {
    const rows = await db.query(
      `
        SELECT * FROM
          categories
        ORDER BY
          name
      `
    )

    return rows
  }

  async findById(id) {
    const rows = await db.query(
      `
        SELECT * FROM
          categories
        WHERE
          id = $1
        ORDER BY
          name
      `,
      [id]
    )

    return rows
  }

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
