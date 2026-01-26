import { useEffect, useRef, useState, useTransition } from 'react'
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

  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)

  useEffect(() => {
    async function loadContact() {
      startTransition(async () => {
        try {
          const data = await contactService.getContactById(id)
          contactFormRef.current.setFieldsValue(data)
          setContactName(data.name)
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

      <PageHeader
        title={isLoading ? 'Carregando...' : `Editar ${contactName}`}
      />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        ref={contactFormRef}
      />
    </>
  )
}
