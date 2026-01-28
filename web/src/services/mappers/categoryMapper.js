class CategoryMapper {
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    }
  }
}

export const categoryMapper = new CategoryMapper()
