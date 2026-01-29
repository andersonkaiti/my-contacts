import { useCallback, useEffect, useMemo, useState } from 'react'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function useHome() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [isDeleting, setIsDeleting] = useState(false)
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
    try {
      setIsLoading(true)

      const data = await contactService.listContacts(orderBy)

      setContacts(data)
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
    isDeleteModalVisible,
    contactBeingDeleted,
    handleToggleOrderBy,
    handleSearchTermChange,
    handleTryAgain,
    handleDeleteContact,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
  }
}
