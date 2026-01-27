import { useRef } from 'react'
import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

export function NewContact() {
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

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
        ref={contactFormRef}
      />
    </>
  )
}
