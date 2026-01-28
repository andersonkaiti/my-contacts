import { ContactForm } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'

export function Presentation({
  isLoading,
  contactName,
  onSubmit,
  contactFormRef,
}) {
  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={onSubmit}
        ref={contactFormRef}
      />
    </>
  )
}
