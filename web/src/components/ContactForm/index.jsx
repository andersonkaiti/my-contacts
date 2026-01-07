import { useRef, useState } from 'react'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { ButtonContainer, Form } from './styles'

// Uncontrolled components: todo o fluxo de informação e renderização depende da DOM

export function ContactForm({ buttonLabel }) {
  const [name, setName] = useState('')

  // O React tem acesso ao virtual DOM, e não ao DOM real. Com o .getElementById(), o DOM real é acessado e alterado e, consequentemente, o virtual DOM e o DOM real se desincronizam
  // const emailInput = document.getElementById('input-email')
  const emailInput = useRef(null)

  function handleClick() {
    console.log(emailInput.current.value)
  }

  console.log('rendered')

  return (
    <Form>
      <button type="button" onClick={handleClick}>
        Loga emailInput
      </button>

      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={(event) => setName(event.target.value)} />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="E-mail"
          defaultValue="anderkaiti@gmail.com"
          ref={emailInput}
          // É possível utilizar eventos em uncontrolled components sem causar re-renderização, pois quem causa ela é o estado
          onChange={(event) => console.log(event.target.value)}
        />
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
