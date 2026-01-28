import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { Link } from 'react-router-dom'
import emptyBox from '../../assets/images/empty-box.svg'
import arrow from '../../assets/images/icons/arrow.svg'
import edit from '../../assets/images/icons/edit.svg'
import trash from '../../assets/images/icons/trash.svg'
import magnifierQuestion from '../../assets/images/magnifier-question.svg'
import sad from '../../assets/images/sad.svg'
import { Button } from '../../components/Button'
import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'
import { contactService } from '../../services/contactsService'
import { formatPhone } from '../../utils/formatPhone'
import { toast } from '../../utils/toast'
import {
  Card,
  Container,
  EmptyListContainer,
  ErrorContainer,
  Header,
  InputSearchContainer,
  ListHeader,
  SearchNotFoundContainer,
} from './styles'

export function Home() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const [isLoading, startTransition] = useTransition()
  const [hasError, setHasError] = useState(false)

  const [isDeleting, startDeletingTransition] = useTransition()
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [contacts, searchTerm],
  )

  const loadContacts = useCallback(async () => {
    startTransition(async () => {
      try {
        const data = await contactService.listContacts(orderBy)
        setContacts(data)
        setHasError(false)
      } catch {
        setHasError(true)
      }
    })
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

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
    setContactBeingDeleted(null)
  }

  async function handleConfirmDeleteContact() {
    startDeletingTransition(async () => {
      try {
        await contactService.deleteContact(contactBeingDeleted.id)

        setContacts((prevState) =>
          prevState.filter((contact) => contact.id !== contactBeingDeleted.id),
        )

        handleCloseDeleteModal()

        toast({
          type: 'success',
          text: 'Contato deletado com sucesso!',
        })
      } catch {
        toast({
          type: 'danger',
          text: 'Ocorreu um erro ao deletar contato!',
        })
      }
    })
  }

  return (
    <Container>
      <Modal
        danger
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        visible={isDeleteModalVisible}
        isLoading={isDeleting}
      >
        <p>Esta ação não poderá ser desfeita!</p>
      </Modal>

      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquisar contato..."
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : contacts.length > 0
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && contacts.length > 0 && (
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
          {contacts.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty Box" />

              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
                <strong>"Novo contato"</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {filteredContacts.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier Question" />

              <span>
                Nenhum resultado foi encontrado para{' '}
                <strong>"{searchTerm}"</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>

                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>

                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit" />
                </Link>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
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
