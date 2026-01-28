import { useEffect, useRef, useState, useTransition } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'
import { Presentation } from './presentation'

export function Container() {
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

  async function handleSubmit(contact) {
    try {
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
    <Presentation
      isLoading={isLoading}
      contactName={contactName}
      contactFormRef={contactFormRef}
      onSubmit={handleSubmit}
    />
  )
}
