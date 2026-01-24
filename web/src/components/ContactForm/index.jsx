import { useEffect, useState, useTransition } from 'react'
import { useErrors } from '../../hooks/useErrors'
import { categoriesService } from '../../services/categoriesService'
import { formatPhone } from '../../utils/formatPhone'
import { isEmailValid } from '../../utils/isEmailValid'
import { Button } from '../Button'
import { FormGroup } from '../FormGroup'
import { Input } from '../Input'
import { Select } from '../Select'
import { ButtonContainer, Form } from './styles'

export function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, startCategoriesTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors()

  const isFormValid = name && !errors.length

  useEffect(() => {
    async function loadCategories() {
      startCategoriesTransition(async () => {
        try {
          const data = await categoriesService.listCategories()

          setCategories(data)
        } catch {}
      })
    }

    loadCategories()
  }, [])

  function handleNameChange(event) {
    setName(event.target.value)

    if (!event.target.value) {
      setError({
        field: 'name',
        message: 'Nome é obrigatório',
      })
    } else {
      removeError('name')
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value)

    const { value } = event.target

    if (value && !isEmailValid(value)) {
      setError({
        field: 'email',
        message: 'E-mail inválido',
      })
    } else {
      removeError('email')
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setIsSubmitting(true)

    await onSubmit({
      name,
      email,
      phone,
      categoryId,
    })

    setIsSubmitting(false)
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          placeholder="Nome *"
          value={name}
          onChange={handleNameChange}
          error={getErrorMessageByFieldName('name')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={handleEmailChange}
          error={getErrorMessageByFieldName('email')}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid} isLoading={isSubmitting}>
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  )
}
