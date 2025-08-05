class ContactController {
  index(_request, response) {
    // Listar todos os registros
    response.send('Send from Contact Controller')
  }

  show() {
    // Obter UM registro
  }

  store() {
    // Criar novo registro
  }

  update() {
    // Editar um registro
  }

  delete() {
    // Deletar um registro
  }
}

export const contactController = new ContactController()
