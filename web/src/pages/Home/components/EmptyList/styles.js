import styled, { css } from 'styled-components'

export const Container = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    p {
      color: ${theme.colors.gray[200]};
      text-align: center;

      strong {
        color: ${theme.colors.primary.main};
      }
    }
  `}
`
