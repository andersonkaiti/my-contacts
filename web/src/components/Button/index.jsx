import { Spinner } from '../Spinner'
import { StyledButton } from './styles'

export function Button({
  type = 'button',
  disabled = false,
  isLoading = false,
  children,
}) {
  return (
    <StyledButton type={type} disabled={disabled || isLoading}>
      {!isLoading && children}
      {isLoading && <Spinner size={16} />}
    </StyledButton>
  )
}
