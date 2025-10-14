# 📊 WebAzul Analytics & Tracking - Guia de Implementação

## 🎯 Visão Geral

Este documento detalha a implementação completa de analytics e tracking no site WebAzul Creative Studio, incluindo Google Tag Manager, Meta Pixel, event tracking, e GDPR compliance.

---

## 🛠 O Que Foi Implementado

### 1. **Google Tag Manager (GTM)**
- ✅ Script GTM adicionado no `<head>` e `<body>` do index.html
- ✅ DataLayer configurado para receber eventos customizados
- ✅ Consent Mode v2 implementado para GDPR

**Localização**: `index.html:4-10` e `index.html:204-207`

**IDs Necessários**:
```javascript
// Substituir GTM-XXXXXXX pelo seu ID real do GTM
GTM-XXXXXXX → GTM-XXXXX (seu container ID)
```

---

### 2. **Meta Pixel (Facebook Ads)**
- ✅ Pixel instalado com PageView automático
- ✅ Eventos de conversão configurados (Lead, Contact, ViewContent)
- ✅ Integrado com consent mode

**Localização**: `index.html:12-28`

**IDs Necessários**:
```javascript
// Substituir YOUR_PIXEL_ID pelo seu ID real do Meta Pixel
YOUR_PIXEL_ID → 123456789012345 (seu pixel ID)
```

---

### 3. **Enhanced Schema.org**
- ✅ WebPage schema com breadcrumbs
- ✅ FAQPage schema para SEO
- ✅ Organization, Service, e SoftwareApplication schemas

**Localização**: `index.html:187-249`

**Benefícios**: Rich snippets no Google, melhor indexação, FAQ cards

---

### 4. **Analytics Utility (`src/utils/analytics.js`)**

Sistema centralizado de tracking com funções para:

#### Eventos Disponíveis:

| Função | Uso | Exemplo |
|--------|-----|---------|
| `trackEvent()` | Evento genérico | `trackEvent('custom_event', { data })` |
| `trackFormSubmit()` | Submissão de formulários | `trackFormSubmit('Contact Form', { ... })` |
| `trackCTAClick()` | Cliques em CTAs | `trackCTAClick('Começar Projeto', 'Hero')` |
| `trackServiceInteraction()` | Interações com serviços | `trackServiceInteraction('AutoAzul', 'click')` |
| `trackContactClick()` | Cliques em contatos | `trackContactClick('whatsapp', '+351...')` |
| `trackSectionView()` | Visualização de seções | `trackSectionView('Services')` |
| `trackScrollDepth()` | Profundidade de scroll | `trackScrollDepth(50)` |
| `trackError()` | Erros e exceções | `trackError('form_error', 'message')` |

---

### 5. **Event Tracking Implementado**

#### 🏠 **HeroSection.jsx**
```javascript
✅ CTA "Começar Projeto" → trackCTAClick()
✅ Section view → trackSectionView()
```

#### 📋 **ContactForm.jsx**
```javascript
✅ Form submission → trackFormSubmit() + Meta Pixel Lead
✅ Email click → trackContactClick('email')
✅ Phone click → trackContactClick('phone')
✅ Form errors → trackError()
✅ Section view → trackSectionView()
```

#### 💬 **WhatsAppWidget.jsx**
```javascript
✅ WhatsApp button → trackContactClick('whatsapp') + Meta Pixel Contact
```

#### 🎨 **ServicesSection.jsx**
```javascript
✅ Service card clicks → trackServiceInteraction()
✅ Section view → trackSectionView()
```

#### 📏 **ScrollDepthTracker.jsx**
```javascript
✅ Scroll tracking automático em 25%, 50%, 75%, 100%
✅ Throttled para performance
```

---

### 6. **Cookie Consent com GDPR Compliance**

#### Funcionalidades:
- ✅ **3 categorias de cookies**: Essenciais, Analytics, Marketing
- ✅ **Consent Mode v2** integrado com GTM
- ✅ **3 opções**: Aceitar Todos, Essenciais, Personalizar
- ✅ Preferências salvas em localStorage
- ✅ Update automático do consent mode

#### Como Funciona:
```javascript
// Estado padrão (tudo negado exceto essenciais)
analytics_storage: 'denied'
ad_storage: 'denied'
functionality_storage: 'granted' // sempre ativo
security_storage: 'granted'      // sempre ativo

// Quando o usuário aceita
updateConsentMode(analytics, marketing)
```

**Localização**: `src/components/CookieConsent.jsx`

---

## 🚀 Próximos Passos - Configuração

### **Passo 1: Configurar Google Tag Manager**

1. Acesse [tagmanager.google.com](https://tagmanager.google.com)
2. Crie um container (se ainda não existe)
3. Copie o ID do container (formato: `GTM-XXXXXX`)
4. Substitua em `index.html`:
   ```html
   GTM-XXXXXXX → GTM-SEU_ID
   ```

#### Tags a Criar no GTM:

**Tag 1: Google Analytics 4**
- Tipo: Google Analytics: GA4 Configuration
- Measurement ID: G-RBGNLH2FKC (já configurado)
- Trigger: All Pages
- Consent: Analytics Storage Required

**Tag 2: Google Analytics Events**
- Tipo: Google Analytics: GA4 Event
- Event Name: `{{Event}}`
- Parameters: configurar conforme eventos
- Trigger: Custom Events

**Tag 3: Meta Pixel Base Code**
- Já implementado via código direto
- Considerar mover para GTM para melhor controle

---

### **Passo 2: Configurar Meta Pixel**

1. Acesse [business.facebook.com/events_manager](https://business.facebook.com/events_manager)
2. Crie um Pixel (se ainda não existe)
3. Copie o Pixel ID (número de 15 dígitos)
4. Substitua em `index.html`:
   ```html
   YOUR_PIXEL_ID → 123456789012345
   ```

#### Eventos do Meta Pixel Configurados:
- ✅ PageView (automático)
- ✅ Lead (form submission)
- ✅ Contact (WhatsApp/phone/email)
- ✅ ViewContent (visualização de serviços)

---

### **Passo 3: Configurar Eventos no GTM**

Criar os seguintes **Triggers** no GTM:

1. **Form Submit**
   - Type: Custom Event
   - Event name: `form_submit`

2. **CTA Clicks**
   - Type: Custom Event
   - Event name: `cta_click`

3. **Service Interaction**
   - Type: Custom Event
   - Event name: `service_interaction`

4. **Contact Clicks**
   - Type: Custom Event
   - Event name: `contact_click`

5. **Scroll Depth**
   - Type: Custom Event
   - Event name: `scroll_depth`

---

### **Passo 4: Testar a Implementação**

#### No Google Tag Manager:
1. Ative o modo "Preview"
2. Navegue pelo site
3. Verifique se os eventos estão disparando corretamente

#### No Google Analytics:
1. Acesse Realtime → Events
2. Realize ações no site
3. Confirme que os eventos aparecem

#### No Meta Pixel:
1. Instale a extensão "Meta Pixel Helper"
2. Navegue pelo site
3. Verifique se os eventos estão disparando

---

## 📈 Eventos Rastreados por Ação

| Ação do Usuário | Evento Disparado | Plataformas |
|-----------------|------------------|-------------|
| Página carrega | `page_view` | GA4, Meta |
| Clica "Começar Projeto" | `cta_click` | GA4 |
| Visualiza seção | `section_view` | GA4 |
| Clica em serviço | `service_interaction` | GA4, Meta (ViewContent) |
| Envia formulário | `form_submit` | GA4, Meta (Lead) |
| Clica WhatsApp | `contact_click` | GA4, Meta (Contact) |
| Clica telefone | `contact_click` | GA4, Meta (Contact) |
| Clica email | `contact_click` | GA4, Meta (Contact) |
| Scroll 25% | `scroll_depth` | GA4 |
| Scroll 50% | `scroll_depth` | GA4 |
| Scroll 75% | `scroll_depth` | GA4 |
| Scroll 100% | `scroll_depth` | GA4 |
| Erro no formulário | `error` | GA4 |

---

## 🎛 Conversões Recomendadas

### No Google Analytics 4:
1. `form_submit` → Lead
2. `contact_click` (whatsapp) → Contact
3. `contact_click` (phone) → Contact
4. `contact_click` (email) → Contact

### No Meta Ads:
1. Lead (form submission)
2. Contact (WhatsApp/phone/email)
3. ViewContent (service views)

---

## 🔍 Debug e Troubleshooting

### Ver eventos no console:
Todos os eventos logam no console com o prefixo `📊 Event tracked:`

```javascript
// Exemplo no console do navegador
📊 Event tracked: cta_click {cta_name: 'Começar Projeto', cta_location: 'Hero Section'}
```

### Verificar DataLayer:
```javascript
// No console do navegador
console.log(window.dataLayer)
```

### Verificar Consent Mode:
```javascript
// No console do navegador
window.gtag('get', 'G-RBGNLH2FKC', 'analytics_storage', console.log)
```

---

## 📊 Métricas Importantes para Acompanhar

### Conversões:
- Form submissions
- WhatsApp clicks
- Phone clicks
- Email clicks

### Engagement:
- Scroll depth médio
- Section views
- Service interaction rate
- Time on site

### Funil:
```
Página Inicial (100%)
    ↓
Visualização de Serviços (X%)
    ↓
Início de Contacto (Y%)
    ↓
Lead Gerado (Z%)
```

---

## 🛡 GDPR & Privacy

### Implementado:
- ✅ Consent Mode v2 (Google)
- ✅ Cookie banner com categorias
- ✅ Opt-in para analytics e marketing
- ✅ localStorage para preferências
- ✅ Scripts bloqueados até consentimento

### Dados NÃO coletados sem consentimento:
- Analytics
- Remarketing
- Advertising IDs

### Dados sempre coletados (essenciais):
- Funcionamento básico do site
- Security & Fraud prevention

---

## 📝 Checklist de Implementação

- [x] GTM instalado
- [x] Meta Pixel instalado
- [x] Enhanced Schema.org
- [x] Analytics utility criado
- [x] Event tracking nos componentes
- [x] Scroll depth tracking
- [x] Cookie consent com GDPR
- [ ] Substituir GTM-XXXXXXX pelo ID real
- [ ] Substituir YOUR_PIXEL_ID pelo ID real
- [ ] Configurar tags no GTM
- [ ] Configurar conversões no GA4
- [ ] Configurar conversões no Meta Ads
- [ ] Testar todos os eventos
- [ ] Configurar Data Studio dashboards

---

## 🎓 Recursos Adicionais

- [Google Tag Manager Docs](https://developers.google.com/tag-platform/tag-manager)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [Meta Pixel Setup](https://developers.facebook.com/docs/meta-pixel)
- [Consent Mode v2](https://developers.google.com/tag-platform/security/guides/consent)

---

## 🆘 Suporte

Para questões sobre a implementação:
1. Verificar este documento
2. Testar no modo Preview do GTM
3. Consultar logs do console do navegador
4. Verificar documentação oficial das plataformas

---

**Última atualização**: 2025-10-14
**Versão**: 1.0.0
**Autor**: Claude Code (Anthropic)
