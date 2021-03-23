import styled from 'styled-components'
import { BiPlayCircle } from 'react-icons/bi'

export const ContainerCurtain = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: 0.4s opacity;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & svg:hover {
    cursor: pointer;
  }
`

export const IconPlay = styled(BiPlayCircle)`
  transition: 0.4s filter;
  filter: brightness(80%);

  &:hover {
    filter: brightness(150%);
  }
`

export const ContainerAnime = styled.div`
  position: relative;
  margin: 0;

  &:hover img {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    filter: brightness(35%);
  }

  &:hover ${ContainerCurtain} {
    opacity: 1;
  }
  
  & * {
    user-select: none;
  }
`

export const Image = styled.img`
  width: 100%;
  height: 300px;
  margin: 0;
  user-select: none;
  transition: 0.4s filter, 0.4s border-bottom-left-radius, 0.4s border-bottom-right-radius;
  filter: brightness(85%);
`

export const More = styled.div`
  width: 100%;
  padding: 15px 5px;
  background: ${({ theme }) => theme.secundary};
  opacity: 0.65;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  transition: .4s opacity;

  &:hover {
    opacity: 1;
  }
  & a {
    cursor: pointer;
  }
  & a:hover {
    text-decoration: underline;
  }
`