import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import { formatPhone } from '../../utils/formatPhone'
import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListContainer,
} from './styles'

export function Home() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/contacts')
      .then(async (response) => {
        const data = await response.json()
        setContacts(data)
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <Container>
      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar contato..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length} {contacts.length === 1 ? 'contato' : 'contatos'}
        </strong>

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

      {/* Quando um array é adicionado, o React entende que deve renderizar cada item do array. Por conta disso, a transformação de um array de objetos em um array de componentes JSX é feita: */}
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>

              {contact.category_id && <small>{contact.category_name}</small>}
            </div>

            <span>{contact.email}</span>
            <span>{formatPhone(contact.phone)}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
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
