import { useRef } from 'react'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function useNewContact() {
  const contactFormRef = useRef(null)

  async function handleSubmit(contact) {
    try {
      await contactService.createContact(contact)

      contactFormRef.current.resetFields()

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
      })
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
      })
    }
  }

  return {
    contactFormRef,
    handleSubmit,
  }
}
