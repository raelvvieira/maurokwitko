/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from 'npm:@react-email/components@0.0.22'

interface RecoveryEmailProps {
  siteName: string
  confirmationUrl: string
}

export const RecoveryEmail = ({
  siteName,
  confirmationUrl,
}: RecoveryEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Crie sua nova senha do Clube de Estudos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img
            src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png"
            alt="Dr. Mauro Kwitko"
            width="120"
            height="120"
            style={logo}
          />
        </Section>
        <Heading style={h1}>Crie sua nova senha</Heading>
        <Text style={text}>
          Olá! Recebemos uma solicitação para criar ou redefinir sua senha do <strong>Clube de Estudos Dr. Mauro Kwitko</strong>.
        </Text>
        <Text style={text}>
          Clique no botão abaixo para escolher sua senha. Você precisará digitá-la duas vezes para confirmar.
        </Text>
        <Section style={buttonWrap}>
          <Button style={button} href={confirmationUrl}>
            Criar nova senha
          </Button>
        </Section>
        <Text style={text}>
          Se o botão não funcionar, copie e cole este link no seu navegador:
        </Text>
        <Text style={linkText}>{confirmationUrl}</Text>
        <Text style={footer}>
          Se você não solicitou isso, pode ignorar este e-mail — sua senha continuará a mesma.
        </Text>
        <Text style={signature}>
          Um abraço,<br />
          Equipe Dr. Mauro Kwitko
        </Text>
      </Container>
    </Body>
  </Html>
)

export default RecoveryEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const logoWrap = { textAlign: 'center' as const, margin: '0 0 24px' }
const logo = { display: 'inline-block', borderRadius: '16px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(210, 18%, 26%)', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '16px', color: 'hsl(210, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const buttonWrap = { textAlign: 'center' as const, margin: '28px 0' }
const button = { backgroundColor: '#506274', color: '#ffffff', fontSize: '16px', fontWeight: 'bold' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const linkText = { fontSize: '13px', color: '#506274', wordBreak: 'break-all' as const, margin: '0 0 24px' }
const footer = { fontSize: '13px', color: '#999999', margin: '28px 0 16px' }
const signature = { fontSize: '14px', color: 'hsl(210, 10%, 35%)', margin: '24px 0 0' }
