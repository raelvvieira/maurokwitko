/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Button, Container, Head, Heading, Html, Img, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props { name?: string }

const CHECKOUT_URL = 'https://chk.eduzz.com/2445141'
const LOGO_URL = 'https://i.ibb.co/RTTwXXSp/39854-45f6772671ed8cf8bc3e9a92d5e5a6f0.png'

const ClubeCartRecoveryEmail = ({ name }: Props) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Sua vaga no Clube de Estudos ainda está esperando</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoWrap}>
          <Img src={LOGO_URL} alt="Dr. Mauro Kwitko" width="240" height="110" style={logo} />
        </Section>
        <Heading style={h1}>{name ? `Olá, ${name}!` : 'Olá!'}</Heading>
        <Text style={text}>
          Vimos que você começou sua inscrição no <strong>Clube de Estudos Dr. Mauro Kwitko</strong>,
          mas ainda não finalizou o pagamento.
        </Text>
        <Text style={text}>
          Lá dentro você encontra os cursos completos, livros, e-books, hinos, rádio
          e toda a comunidade — tudo em um só lugar, com acesso imediato.
        </Text>
        <Section style={buttonWrap}>
          <Button style={button} href={CHECKOUT_URL}>Finalizar minha inscrição</Button>
        </Section>
        <Text style={text}>
          Se tiver qualquer dúvida, é só responder este email que te ajudamos.
        </Text>
        <Text style={signature}>
          Um abraço,<br />Equipe Dr. Mauro Kwitko
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ClubeCartRecoveryEmail,
  subject: 'Sua vaga no Clube ainda está esperando',
  displayName: 'Clube — finalize sua inscrição',
  previewData: { name: 'Maria' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const logoWrap = { textAlign: 'center' as const, margin: '0 0 24px' }
const logo = { display: 'inline-block' }
const h1 = { fontSize: '24px', fontWeight: 'bold' as const, color: 'hsl(210, 18%, 26%)', margin: '0 0 20px', textAlign: 'center' as const }
const text = { fontSize: '16px', color: 'hsl(210, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const buttonWrap = { textAlign: 'center' as const, margin: '28px 0' }
const button = { backgroundColor: '#506274', color: '#ffffff', fontSize: '16px', fontWeight: 'bold' as const, borderRadius: '12px', padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }
const signature = { fontSize: '14px', color: 'hsl(210, 10%, 35%)', margin: '24px 0 0' }
