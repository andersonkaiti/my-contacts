import styled, { css } from 'styled-components'

export const Container = styled.div`
  margin-top: 32px;
`

export const Header = styled.header`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      color: #222;
    }

    a {
      color: ${theme.colors.primary.main};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${theme.colors.primary.main};
      padding: 8px 16px;
      border-radius: 4px;
      transition: all .2s ease-in;
      
      &:hover {
        background-color: ${theme.colors.primary.main};
        color: #fff;
      }
    }
  `}
`
