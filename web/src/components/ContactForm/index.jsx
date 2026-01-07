import { useState } from 'react'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { ButtonContainer, Form } from './styles'

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [category, setCategory] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    console.log({
      name,
      email,
      phone,
      category,
    })
  }

  // form.addEventListener('submit', function (event) {})

  // O comportamento padrão do form é enviar os dados via query params para a URL que está no atributo action e recarregar a página. Caso a action não seja definida, ele envia para a URL atual e recarrega a página. Para prevenir isso, é necessário utilizar o event.preventDefault()

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      </FormGroup>

      <FormGroup>
        <Input placeholder="E-mail" value={email} onChange={(event) => setEmail(event.target.value)} />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" value={phone} onChange={(event) => setPhone(event.target.value)} />
      </FormGroup>

      <FormGroup>
        <Select value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="">Categoria</option>
          <option value="instagram">Instagram</option>
          <option value="discord">Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  )
}
