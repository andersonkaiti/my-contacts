import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 24px;

  .details {
    display: flex;
    flex-direction: column;
    gap: 8px;

    strong {
      font-size: 22px;
      color: ${({ theme }) => theme.colors.danger.main};
    }
  }
`
