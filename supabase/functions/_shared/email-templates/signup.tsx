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

interface SignupEmailProps {
  siteName: string
  siteUrl: string
  recipient: string
  confirmationUrl: string
}

export const SignupEmail = ({ confirmationUrl }: SignupEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Confirme seu e-mail no Clube de Estudos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png" alt="Dr. Mauro Kwitko" width="120" height="120" style={logo} />
        </Section>
        <Heading style={h1}>Bem-vindo ao Clube de Estudos!</Heading>
        <Text style={text}>
          Estamos felizes em ter você conosco. Para começar, confirme seu e-mail clicando no botão abaixo:
        </Text>
        <Section style={buttonWrap}>
          <Button style={button} href={confirmationUrl}>Confirmar meu e-mail</Button>
        </Section>
        <Text style={footer}>Se você não criou esta conta, pode ignorar este e-mail.</Text>
        <Text style={signature}>Um abraço,<br />Equipe Dr. Mauro Kwitko</Text>
      </Container>
    </Body>
  </Html>
)

export default SignupEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const logoWrap = { textAlign: 'center' as const, margin: '0 0 24px' }
const logo = { display: 'inline-block', borderRadius: '16px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(210, 18%, 26%)', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '16px', color: 'hsl(210, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const buttonWrap = { textAlign: 'center' as const, margin: '28px 0' }
const button = { backgroundColor: '#506274', color: '#ffffff', fontSize: '16px', fontWeight: 'bold' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '13px', color: '#999999', margin: '28px 0 16px' }
const signature = { fontSize: '14px', color: 'hsl(210, 10%, 35%)', margin: '24px 0 0' }
