import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function useHome() {
  const [contacts, setContacts] = useState([])
  const [orderBy, setOrderBy] = useState('asc')

  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null)

  const [searchTerm, setSearchTerm] = useState('')

  const deferredSearchTerm = useDeferredValue(searchTerm)

  const filteredContacts = useMemo(
    () =>
      contacts.filter((contact) =>
        contact.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()),
      ),
    [contacts, deferredSearchTerm],
  )

  const loadContacts = useCallback(
    async (signal) => {
      try {
        setIsLoading(true)

        const data = await contactService.listContacts(orderBy, signal)

        setContacts(data)
        setHasError(false)
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        setHasError(true)
        setContacts([])
      } finally {
        setIsLoading(false)
      }
    },
    [orderBy],
  )

  useEffect(() => {
    // O AbortController é um construtor nativo que permite abortar/cancelar
    // uma ou mais requisições. Para prevenir a dupla requisição devido ao
    // comportamento causado pelo StrictMode, usamos o AbortController no
    // unmount, na função de cleanup do useEffect
    const controller = new AbortController()

    loadContacts(controller.signal)

    return () => {
      controller.abort()
    }
  }, [loadContacts])

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
  }, [])

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value)
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
