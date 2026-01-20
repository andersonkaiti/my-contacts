import styled, { css } from 'styled-components'

export const Container = styled.div``

export const InputSearchContainer = styled.div`
  ${({ theme }) => css`
    width: 100%;

    input {
      width: 100%;
      background: #fff;
      border: none;
      border-radius: 25px;
      height: 50px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
      outline: none;
      padding: 0 16px;

      &::placeholder{
        color: ${theme.colors.gray[200]};
      }
    }
  `}
`

export const Header = styled.header`
  ${({ theme, justifyContent }) => css`
    display: flex;
    align-items: center;
    justify-content: ${justifyContent};
    margin-top: 32px;
    border-bottom: 2px solid ${theme.colors.gray[100]};
    padding-bottom: 16px;

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

export const ErrorContainer = styled.div`
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

export const EmptyListContainer = styled.div`
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

export const SearchNotFoundContainer = styled.div`
  ${({ theme }) => css`
    margin-top: 16px;
    display: flex;
    align-items: start;
    gap: 24px;

    span {
      color: ${theme.colors.gray[200]};
      word-break: break-word;
    }
  `}
`
