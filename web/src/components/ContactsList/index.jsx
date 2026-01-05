import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import { Card, Container, Header, ListContainer } from './styles'

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>

        <a href="/">Novo contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button" className="sort-button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>
      </ListContainer>

      {Array.from({ length: 4 }).map((_, index) => (
        <Card key={index}>
          <div className="info">
            <div className="contact-name">
              <strong>Anderson Kaiti</strong>
              <small>Instagram</small>
            </div>

            <span>anderkaiti@gmail.com</span>
            <span>(14) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit" />
            </a>

            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  )
}
