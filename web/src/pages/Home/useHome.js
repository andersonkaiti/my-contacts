import { useCallback, useEffect, useState, useTransition } from 'react'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

/**
  React 17: a renderização é síncrona, ininterrupta e feita de uma só vez.
  
  React 18:
  Concurrent React: é um mecanismo que roda por baixo dos panos e que permite
  que o React gere múltiplas versões da UI ao mesmo tempo em background,
  de forma assíncrona, sem bloquear a thread principal do navegador.

  Exemplo: Primeiro o React atualiza o input de busca. Em seguida, renderiza
  e atualiza a lista de contatos.

  Urgent update e Transition update

  Urgent update: é uma atualização que precisa ser renderizada imediatamente.
  Transition update: é uma atualização pausada para dar espaço para uma urgent
  update.

  Toda atualização de estado é um urgent update, então não é necessário dizer
  o que é urgente, mas sim o que é uma transição. Para isso, o React introduziu
  o hook useTransition, que retorna um array com duas posições: o primeiro é um
  valor stateful que indica que existe uma transição em progresso, e o segundo
  é uma função que indica quais são as atualizações de UI que são transições a
  partir de uma função de callback.
 */

export function useHome() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)

  const [filteredContacts, setFilteredContacts] = useState([])

  const [isPending, startTransition] = useTransition()

  // const filteredContacts = useMemo(
  //   () =>
  //     contacts.filter((contact) =>
  //       contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //     ),
  //   [contacts, searchTerm],
  // )

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true)

      const data = await contactService.listContacts(orderBy)

      setContacts(data)
      setFilteredContacts(data)
      setHasError(false)
    } catch {
      setHasError(true)
      setContacts([])
    } finally {
      setIsLoading(false)
    }
  }, [orderBy])

  useEffect(() => {
    loadContacts()
  }, [loadContacts])

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }, [])

  function handleChangeSearchTerm(event) {
    const { value } = event.target

    // Neste caso, a cada digitação do usuário, o estado searchTerm é
    // atualizado e, em seguida, o estado filteredContacts é atualizado.
    // No entanto, como a atualização do estado filteredContacts é uma
    // transição, ela é pausada/cancelada caso haja uma nova digitação do
    // usuário, dando prioridade para a atualização do estado searchTerm
    setSearchTerm(value)

    startTransition(() => {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase()),
        ),
      )
    })
  }

  function handleTryAgain() {
    loadContacts()
  }

  const handleDeleteContact = useCallback((contact) => {
    setContactBeingDeleted(contact)
    setIsDeleteModalVisible(true)
  }, [])

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false)
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsDeleting(true)

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
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    contacts,
    orderBy,
    searchTerm,
    filteredContacts,
    isLoading,
    hasError,
    isDeleting,
    isPending,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleToggleOrderBy,
    handleChangeSearchTerm,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  }
}
