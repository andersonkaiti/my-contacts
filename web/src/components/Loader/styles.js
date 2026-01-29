import styled, { css, keyframes } from 'styled-components'

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  inset: 0;
  position: fixed;
  background-color: rgba(246, 245, 252, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeIn} .3s;

  ${({ isLeaving }) =>
    isLeaving &&
    css`
      animation: ${fadeOut} .3s forwards;
    `}
`
