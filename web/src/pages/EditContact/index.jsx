import { useEffect, useRef, useTransition } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ContactForm } from '../../components/ContactForm'
import { Loader } from '../../components/Loader'
import { PageHeader } from '../../components/PageHeader'
import { contactService } from '../../services/contactsService'
import { toast } from '../../utils/toast'

// Maneiras de popular o formulário com os dados do contato:
// 1. State lifting (elevação de estado): traz os dados do contato para o componente pai e passa como props para o formulário do componente filho.
// 2. Derived state: o formulário deriva os dados do componente pai passando os dados via props para o formulário do componente filho. O problema é que ele não monitora alterações na propriedade, ele apenas utiliza o valor inicial. Para contornar isso, podemos usar a propriedade key, que força o React a recriar o componente quando a chave muda (a propriedade key identifica na virtual DOM, durante a execução do algoritmo de reconciliação, quais componentes ela precisa adicionar, remover ou recriar).
// 3. Imperative handle: permite que o componente pai envie uma ref para o componente filho, que implementará métodos no ref para serem acessados pelo componente pai.

export function EditContact() {
  const [isLoading, startTransition] = useTransition()
  const { id } = useParams()
  const history = useHistory()

  const contactFormRef = useRef(null)

  useEffect(() => {
    async function loadContact() {
      startTransition(async () => {
        try {
          const data = await contactService.getContactById(id)
          contactFormRef.current.setFieldsValue(data)
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

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
        ref={contactFormRef}
      />
    </>
  )
}
