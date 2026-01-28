import { Loader } from '../../components/Loader'
import { Modal } from '../../components/Modal'
import { ContactsList } from './components/ContactsList'
import { EmptyList } from './components/EmptyList'
import { ErrorStatus } from './components/ErrorStatus'
import { Header } from './components/Header'
import { InputSearch } from './components/InputSearch'
import { SearchNotFound } from './components/SearchNotFound'
import { Container } from './styles'
import { useHome } from './useHome'

export function Home() {
  const {
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
  } = useHome()

  return (
    <Container>
      <Loader isLoading={isLoading} />

      {contacts.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleSearchTermChange} />
      )}

      <Header
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
        hasError={hasError}
      />

      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}

      {!hasError && (
        <>
          {contacts.length < 1 && !isLoading && <EmptyList />}

          {contacts.length > 0 && filteredContacts.length < 1 && (
            <SearchNotFound searchTerm={searchTerm} />
          )}

          <ContactsList
            filteredContacts={filteredContacts}
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
          />

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
        </>
      )}
    </Container>
  )
}
