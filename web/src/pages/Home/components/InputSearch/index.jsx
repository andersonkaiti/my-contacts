import { Container } from './styles'

export function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type="text"
        placeholder="Pesquisar contato..."
        value={value}
        onChange={onChange}
      />
    </Container>
  )
}
