import Link from 'next/link'

import {
  Container,
  Author,
  BorderCustom,
  SocialNetworking,
  Discord,
  FooterContainer,
  ProjectThis,
} from './styles'

const Footer: React.FC = () => {
  return (
    <>
      <BorderCustom />
      <Container>
        <ProjectThis>
          <Author
            style={{
              alignSelf: 'flex-end',
            }}
          >
            Desenvolvido por <a href="https://smcodes.tk">SMCodes</a>
          </Author>
        </ProjectThis>
        <FooterContainer>
          <Author
            style={{
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            Feito com <span>❤️</span> por OtakuTube
          </Author>
          <span>Não hospedamos nenhum vídeo em nossos servidores, apenas os indexamos.</span>
        </FooterContainer>
        <SocialNetworking>
          <Link href="https://discord.gg/SDYmjZG89B">
            <a>
              <Discord title="Link para nosso discord" />
            </a>
          </Link>
        </SocialNetworking>
      </Container>
    </>
  )
}

export default Footer
