import { useEffect, useImperativeHandle, useState } from 'react'
import { useErrors } from '../../hooks/useErrors'
import { categoriesService } from '../../services/categoriesService'
import { formatPhone } from '../../utils/formatPhone'
import { isEmailValid } from '../../utils/isEmailValid'

export function useContactForm({ onSubmit, ref }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { setError, removeError, getErrorMessageByFieldName, errors } =
    useErrors()

  const isFormValid = name && !errors.length

  useImperativeHandle(
    ref,
    () => ({
      setFieldsValue: (values) => {
        setName(values.name ?? '')
        setEmail(values.email ?? '')
        setPhone(formatPhone(values.phone ?? ''))
        setCategoryId(values.category.id ?? '')
      },
      resetFields: () => {
        setName('')
        setEmail('')
        setPhone('')
        setCategoryId('')
      },
    }),
    [],
  )

  useEffect(() => {
    const controller = new AbortController()

    async function loadCategories() {
      try {
        const data = await categoriesService.listCategories(controller.signal)

        setCategories(data)
      } catch {
      } finally {
        setIsLoadingCategories(false)
      }
    }

    loadCategories()

    return () => {
      controller.abort()
    }
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

  return {
    name,
    email,
    phone,
    categoryId,
    categories,
    isLoadingCategories,
    isSubmitting,
    isFormValid,
    handleSubmit,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    setCategoryId,
    getErrorMessageByFieldName,
  }
}
