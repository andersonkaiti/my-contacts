import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function useEditContact() {
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()

  const navigate = useNavigate()

  const [contactName, setContactName] = useState('')

  const contactFormRef = useRef(null)

  const safeAsyncAction = useSafeAsyncAction()

  useEffect(() => {
    const controller = new AbortController()

    async function loadContact() {
      try {
        const data = await contactService.getContactById(id, controller.signal)

        safeAsyncAction(() => {
          contactFormRef.current.setFieldsValue(data)
          setIsLoading(false)
          setContactName(data.name)
        })
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }

        safeAsyncAction(() => {
          navigate('/', {
            replace: true,
          })

          toast({
            type: 'danger',
            text: 'Contato não encontrado!',
          })
        })
      }
    }

    loadContact()

    return () => {
      controller.abort()
    }
  }, [id, navigate, safeAsyncAction])

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

  return {
    isLoading,
    contactName,
    handleSubmit,
    contactFormRef,
  }
}
