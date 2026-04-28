/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as clubeWelcomeAccess } from './clube-welcome-access.tsx'
import { template as clubePaymentOverdue } from './clube-payment-overdue.tsx'
import { template as clubeAccessRevoked } from './clube-access-revoked.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'clube-welcome-access': clubeWelcomeAccess,
  'clube-payment-overdue': clubePaymentOverdue,
  'clube-access-revoked': clubeAccessRevoked,
}
