import { useEffect, useRef, useState, useTransition } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ContactForm } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function EditContact() {
  const [isLoading, startTransition] = useTransition()
  const { id } = useParams()
  const history = useHistory()

  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)

  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    async function loadContact() {
      startTransition(async () => {
        try {
          const data = await contactService.getContactById(id)

          safeAsyncAction(() => {
            contactFormRef.current.setFieldsValue(data)
            setContactName(data.name)
          })
        } catch {
          safeAsyncAction(() => {
            toast({
              type: 'danger',
              text: 'Contato não encontrado!',
            })
            history.push('/')
          })
        }
      })
    }

    loadContact()
  }, [id, history, safeAsyncAction])

  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        category_id: formData.categoryId,
      }

      const data = await contactService.updateContact(id, contact)

      setContactName(data.name)

      toast({
        type: 'success',
        text: 'Contato editado com sucesso!',
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao editar o contato!',
      })
    }
  }

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
