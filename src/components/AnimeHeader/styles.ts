import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 70vh;
  background: ${({ theme }) => theme.secundary};
  background-image: linear-gradient(${({ theme }) => theme.primary}, ${({ theme }) => theme.secundaryBackground} 75%);
  position: relative;
`;

export const HeaderWave = styled.img`
  position: absolute;
  align-self: flex-end;
  width: 100%;
  bottom: 0;
`

export const Menu = styled.nav`
  width: 100%;
  padding: 10px 3.5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SearchIcon = styled.div`
  position: absolute;
  background: ${({ theme }) => theme.background};
  border-radius: 50%;
  height: 38px;
  width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  z-index: 100;
  transition: .5s filter;

  &.actived:hover {
    cursor: pointer;
    filter: brightness(200%);
  }

  &.no-actived:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
`

export const ContainerInput = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-end;
`

export const Icon = styled.img`
  width: 48px;
  border-radius: 24px;
`

export const Input = styled.input`
  outline: 0;
  height: 38px;
  font-size: 17px;
  color: ${({ theme }) => theme.text};
  border-radius: 18px;
  border: 0;
  padding-left: 15px;
  padding-right: 25px;
  transition: filter .5s, width 1s ease;
  background: ${({ theme }) => theme.background};

  &:focus {
    filter: brightness(150%);
  }

  &.actived {
    width: 100%;
  }

  &.no-actived {
    width: 0;
  }
`

export const ContainerAnime = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 2;
  padding: 5px 17.5% 75px 10%;
  width: 100%;
  height: 60vh;
`

export const ContainerInfo = styled.div``

export const Title = styled.h1`
  font-size: 38px;
  padding-right: 25%;
`

export const ButtonWatch = styled.button`
  margin: 25px 30px;
  padding: 10px 0;
  width: 25%;
  background: #e66465;
  border: 0;
  border-radius: 7.5px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.text};
  font-weight: bold;
  font-size: 18px;
  outline: none;
  transition: filter .2s;

  &:hover {
    filter: brightness(75%);
  }
`

export const Thumbnail = styled.img`
  border-radius: 10px;
  box-shadow: 0 0 4px ${({ theme }) => theme.secundaryText};
  cursor: pointer;
  transition: transform .2s ease-in-out, box-shadow .2s ease-in-out;

  &:hover {
    box-shadow: 0 0 10px ${({ theme }) => theme.secundaryText};
    transform: scale(1.05);
  }
`