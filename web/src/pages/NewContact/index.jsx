import { ContactForm } from '../../components/ContactForm'
import { PageHeader } from '../../components/PageHeader'
import { contactService } from '../../services/contactsService'

export function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        category_id: formData.categoryId,
      }

      await contactService.createContact(contact)
    } catch {
      alert('Ocorreu um erro ao cadastrar o contato')
    }
  }

  return (
    <>
      <PageHeader title="Novo contato" />

      <ContactForm buttonLabel="Cadastrar" onSubmit={handleSubmit} />
    </>
  )
}
