import { useState } from 'react'
import { isEmailValid } from '../../utils/isEmailValid'
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
  const [errors, setErrors] = useState([])

  function handleNameChange(event) {
    setName(event.target.value)

    if (!event.target.value) {
      setErrors((prevState) => [...prevState, { field: 'name', message: 'Nome é obrigatório' }])
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'name'))
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)

    const { value } = event.target

    if (value && !isEmailValid(value)) {
      const errorAlreadyExists = errors.find((error) => error.field === 'email')

      if (!errorAlreadyExists) {
        setErrors((prevState) => [...prevState, { field: 'email', message: 'E-mail inválido' }])
      }
    } else {
      setErrors((prevState) => prevState.filter((error) => error.field !== 'email'))
    }
  }

  console.log(errors)

  function handleSubmit(event) {
    event.preventDefault()

    console.log({
      name,
      email,
      phone,
      category,
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input placeholder="Nome" value={name} onChange={handleNameChange} />
      </FormGroup>

      <FormGroup>
        <Input placeholder="E-mail" value={email} onChange={handleEmailChange} />
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
