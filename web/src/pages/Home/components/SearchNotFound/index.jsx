import magnifierQuestion from '../../../../assets/images/magnifier-question.svg'
import { Container } from './styles'

export function SearchNotFound({ searchTerm }) {
  return (
    <Container>
      <img src={magnifierQuestion} alt="Magnifier Question" />

      <span>
        Nenhum resultado foi encontrado para <strong>"{searchTerm}"</strong>.
      </span>
    </Container>
  )
}
