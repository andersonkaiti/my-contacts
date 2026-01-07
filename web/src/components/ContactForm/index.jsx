import { useState } from 'react'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { ButtonContainer, Form } from './styles'

// Controlled components: todo o fluxo de informação e renderização depende do React
// A partir do momento em que a prop value é usada, o componente se torna controlado

export function ContactForm({ buttonLabel }) {
  // one-way data binding = o estado é a única fonte de verdade
  const [name, setName] = useState('')

  // Ainda que ele re-renderize toda vez, o custo é mínimo por conta do algoritmo de reconciliação, que só atualiza os pontos que mudaram
  console.log('rendered')

  return (
    <Form>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      </FormGroup>

      <FormGroup error="O formato do e-mail é inválido.">
        <Input placeholder="E-mail" error />
      </FormGroup>

      <FormGroup>
        <Input placeholder="Telefone" />
      </FormGroup>

      <FormGroup>
        <Select>
          <option value="instagram">Instagram</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit">{buttonLabel}</Button>
      </ButtonContainer>
    </Form>
  )
}
