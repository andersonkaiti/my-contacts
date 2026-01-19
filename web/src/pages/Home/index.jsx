import { useEffect, useMemo, useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import sad from '../../assets/images/sad.svg'
import { Button } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { contactService } from '../../services/contactsService'
import { formatPhone } from '../../utils/formatPhone'
import {
  Card,
  Container,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
} from './styles'

/**
  No código-fonte do React, as funções com mount são executadas durante o
  primeiro uso do hook, enquanto as funções com update são executadas durante
  a atualização do hook.

  As funções mount dos hooks useCallback e do useMemo são parecidas:
  Enquanto o useCallback memoiza uma função, o useMemo executa a função
  callback recebida e memoiza o valor retornado. Portanto, é possível utilizar
  o useMemo para memoizar uma função simplesmente passando uma função callback
  que retorna a função que se deseja memoizar.

  É melhor utilizar o useCallback, pois é necessário ter um tempo de espera
  para que o useMemo execute a função callback recebida.
 
  function mountCallback(callback, deps) {
    const hook = mountWorkInProgressHook()
    const nextDeps = deps === undefined ? null : deps
    hook.memoizedState = [callback, nextDeps]
    return callback
  }

  function mountMemo(
    nextCreate,
    deps,
  ) {
    const hook = mountWorkInProgressHook()
    const nextDeps = deps === undefined ? null : deps
    const nextValue = nextCreate()
    hook.memoizedState = [nextValue, nextDeps]
    return nextValue
  }
 */

export function Home() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, startTransition] = useTransition()
  const [hasError, setHasError] = useState(false)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  )

  const loadContacts = useMemo(() => {
    return async () => {
      startTransition(async () => {
        try {
          const data = await contactService.listContacts(orderBy)
          setContacts(data)
          setHasError(false)
        } catch {
          setHasError(true)
        }
      })
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  function handleToggleOrderBy() {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }

  function handleSearchTermChange(event) {
    setSearchTerm(event.target.value)
  }

  function handleTryAgain() {
    loadContacts()
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

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredContacts.length}{' '}
            {filteredContacts.length === 1 ? 'contato' : 'contatos'}
          </strong>
        )}

        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
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

                  {contact.category_id && (
                    <small>{contact.category_name}</small>
                  )}
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
        </>
      )}
    </Container>
  )
}
