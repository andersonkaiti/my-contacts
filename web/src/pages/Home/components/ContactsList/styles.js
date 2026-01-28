import styled, { css } from 'styled-components'

export const ListHeader = styled.header`
  ${({ theme, orderBy }) => css`
    margin-top: 24px;
    margin-bottom: 8px;

    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;
      cursor: pointer;

      span {
        margin-right: 8px;
        font-weight: bold;
        color: ${theme.colors.primary.main}
      }

      img {
        transform: ${orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)'};
        transition: transform .2s ease-in;
      }
    }
  `}
`

export const Card = styled.div`
  ${({ theme }) => css`
    background: #fff;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);;
    padding: 16px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & ~ & {
      margin-top: 16px;
    }

    .info {
      .contact-name {
        display: flex;
        align-items: center;
        gap: 8px;
        
        small {
          background: ${theme.colors.primary.lighter};
          color: ${theme.colors.primary.main};
          font-weight: bold;
          text-transform: uppercase;
          padding: 4px;
          border-radius: 4px;
        }
      }

      span {
        display: block;
        font-size: 14px;
        color: ${theme.colors.gray[200]};
      }
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 8px;

      button {
        background: transparent;
        border: none;
        cursor: pointer;
      }
    }
  `}
`
