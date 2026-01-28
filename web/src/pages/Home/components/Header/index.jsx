import { Link } from 'react-router-dom'
import { Container } from './styles'

export function Header({
  quantityOfContacts,
  quantityOfFilteredContacts,
  hasError,
}) {
  const alignment = hasError
    ? 'flex-end'
    : quantityOfContacts > 0
      ? 'space-between'
      : 'center'

  return (
    <Container justifyContent={alignment}>
      {!hasError && quantityOfContacts > 0 && (
        <strong>
          {quantityOfFilteredContacts}{' '}
          {quantityOfFilteredContacts === 1 ? 'contato' : 'contatos'}
        </strong>
      )}

      <Link to="/new">Novo contato</Link>
    </Container>
  )
}
