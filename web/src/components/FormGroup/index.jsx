import { Container } from './styles'

export function FormGroup({ children, error, isLoading = false }) {
  return (
    <Container>
      <div className="form-item">
        {children}

        {isLoading && <div className="loader" />}
      </div>

      {error && <small>{error}</small>}
    </Container>
  )
}
