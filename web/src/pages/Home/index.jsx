import { useEffect, useMemo, useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import { Loader } from '../../components/Loader'
import { formatPhone } from '../../utils/formatPhone'
import {
  Card,
  Container,
  Header,
  InputSearchContainer,
  ListHeader,
} from './styles'

export function Home() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, startTransition] = useTransition()

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  )

  // A função de efeito sempre deve ser síncrona, pois se ela for assíncrona a execução do cleanup também será assíncrona, o que pode levar a problemas de memória, pois o React não espera que a função de cleanup seja assíncrona
  useEffect(() => {
    // Mas é possível chamar uma função assíncrona dentro da função de efeito
    async function loadContacts() {
      try {
        const url = new URL('http://localhost:3001/contacts')
        url.searchParams.set('orderBy', orderBy)

        startTransition(async () => {
          const response = await fetch(url)
          const data = await response.json()
          setContacts(data)
        })
      } catch (error) {
        console.error(error)
      }
    }

    loadContacts()
  }, [orderBy])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value)
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          type="text"
          placeholder="Pesquisar contato..."
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}{' '}
          {filteredContacts.length === 1 ? 'contato' : 'contatos'}
        </strong>

        <Link to="/new">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader orderBy={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
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
