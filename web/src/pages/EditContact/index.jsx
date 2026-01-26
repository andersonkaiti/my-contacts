import { useEffect, useTransition } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ContactForm } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function EditContact() {
  const [isLoading, startTransition] = useTransition()
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    async function loadContact() {
      startTransition(async () => {
        try {
          await contactService.getContactById(id)
        } catch {
          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          })
          history.push('/')
        }
      })
    }

    loadContact()
  }, [id, history])

  function handleSubmit() {}

  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader title="Editar contato" />

      <ContactForm buttonLabel="Salvar alterações" onSubmit={handleSubmit} />
    </>
  )
}
