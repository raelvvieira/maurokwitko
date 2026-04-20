/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import { Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Text } from 'npm:@react-email/components@0.0.22'

interface InviteEmailProps { siteName: string; siteUrl: string; confirmationUrl: string }

export const InviteEmail = ({ confirmationUrl }: InviteEmailProps) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Você foi convidado para o Clube de Estudos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src="https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png" alt="Dr. Mauro Kwitko" width="120" height="120" style={logo} />
        </Section>
        <Heading style={h1}>Você foi convidado</Heading>
        <Text style={text}>Você recebeu um convite para participar do <strong>Clube de Estudos Dr. Mauro Kwitko</strong>. Clique no botão abaixo para aceitar e criar sua conta.</Text>
        <Section style={buttonWrap}>
          <Button style={button} href={confirmationUrl}>Aceitar convite</Button>
        </Section>
        <Text style={footer}>Se você não esperava este convite, pode ignorar este e-mail.</Text>
      </Container>
    </Body>
  </Html>
)

export default InviteEmail

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const logoWrap = { textAlign: 'center' as const, margin: '0 0 24px' }
const logo = { display: 'inline-block', borderRadius: '16px' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(210, 18%, 26%)', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '16px', color: 'hsl(210, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const buttonWrap = { textAlign: 'center' as const, margin: '28px 0' }
const button = { backgroundColor: '#506274', color: '#ffffff', fontSize: '16px', fontWeight: 'bold' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const footer = { fontSize: '13px', color: '#999999', margin: '28px 0 0' }
