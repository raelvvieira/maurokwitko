/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface Props {
  customerName?: string
  customerEmail?: string
  reason?: string
  invoiceId?: string
  occurredAt?: string
}

const AdminSubscriptionCanceledEmail = ({
  customerName, customerEmail, reason, invoiceId, occurredAt,
}: Props) => (
  <Html lang="pt-BR" dir="ltr">
    <Head />
    <Preview>Cancelamento no Clube de Estudos</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Cancelamento registrado</Heading>
        <Text style={text}>
          Um cliente teve a assinatura encerrada no Clube de Estudos.
        </Text>
        <Section style={card}>
          <Text style={row}><strong>Nome:</strong> {customerName || '—'}</Text>
          <Text style={row}><strong>Email:</strong> {customerEmail || '—'}</Text>
          <Text style={row}><strong>Motivo:</strong> {reason || '—'}</Text>
          {invoiceId && <Text style={row}><strong>Fatura:</strong> {invoiceId}</Text>}
          {occurredAt && <Text style={row}><strong>Quando:</strong> {occurredAt}</Text>}
        </Section>
        <Text style={textMuted}>
          O acesso da pessoa ao Clube foi revogado automaticamente.
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: AdminSubscriptionCanceledEmail,
  subject: (data) => `Cancelamento no Clube — ${data?.customerEmail || 'cliente'}`,
  displayName: 'Admin — cancelamento de assinatura',
  previewData: {
    customerName: 'Maria Silva',
    customerEmail: 'maria@example.com',
    reason: 'subscription_canceled',
    invoiceId: '12345678',
    occurredAt: '2026-05-15 10:30',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }
const container = { padding: '32px 28px', maxWidth: '560px' }
const h1 = { fontSize: '22px', fontWeight: 'bold' as const, color: 'hsl(210, 18%, 26%)', margin: '0 0 16px' }
const text = { fontSize: '15px', color: 'hsl(210, 10%, 35%)', lineHeight: '1.6', margin: '0 0 16px' }
const textMuted = { fontSize: '13px', color: 'hsl(210, 8%, 50%)', margin: '20px 0 0' }
const card = { backgroundColor: 'hsl(210, 16%, 96%)', borderRadius: '12px', padding: '16px 20px', margin: '12px 0 8px' }
const row = { fontSize: '14px', color: 'hsl(210, 18%, 26%)', margin: '4px 0', lineHeight: '1.5' }
