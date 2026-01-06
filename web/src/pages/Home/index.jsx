import { Link } from 'react-router-dom'
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import { Modal } from '../../components/Modal'
import { Card, Container, Header, InputSearchContainer, ListContainer } from './styles'

export function Home() {
  return (
    <Container>
      <Modal danger />

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>3 contatos</strong>

        <Link to="/new">Novo contato</Link>
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
            <Link to="/edit/123">
              <img src={edit} alt="Edit" />
            </Link>

            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  )
}
