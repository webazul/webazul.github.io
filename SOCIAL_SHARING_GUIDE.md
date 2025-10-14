# 📱 Guia de Compartilhamento Social - WebAzul

## 🎯 Visão Geral

Guia completo para otimizar previews de links compartilhados no WhatsApp, Facebook, Twitter/X, LinkedIn, Telegram e outras plataformas sociais.

---

## ✅ **O Que Foi Implementado:**

### **1. Open Graph Tags Completas**
```html
✅ og:title - Título otimizado (55-65 caracteres)
✅ og:description - Descrição persuasiva (155-160 caracteres)
✅ og:image - Imagem 1200x630px
✅ og:url - URL canônica
✅ og:type - Tipo de conteúdo
✅ og:site_name - Nome do site
✅ og:locale - Idiomas PT-PT, PT-BR
✅ og:image:width/height - Dimensões
✅ og:image:alt - Texto alternativo
✅ og:image:secure_url - HTTPS
```

### **2. Twitter Cards**
```html
✅ twitter:card - Large image
✅ twitter:title - Título específico
✅ twitter:description - Descrição específica
✅ twitter:image - Imagem otimizada
✅ twitter:site - @webazul
✅ twitter:creator - @webazul
```

### **3. LinkedIn Optimization**
- Dimensões de imagem otimizadas (1200x627px)
- Title e description específicos
- Tags OG completas (LinkedIn usa OG)

---

## 🖼️ **AÇÃO NECESSÁRIA: Criar Imagens Otimizadas**

### **Imagem Principal: `og-image.png`**

**Especificações:**
```
Dimensões: 1200 x 630 pixels (ratio 1.91:1)
Formato: PNG ou JPG (PNG preferível)
Tamanho máximo: 8MB (ideal < 300KB)
Localização: /public/og-image.png
URL final: https://webazul.pt/og-image.png
```

**Conteúdo Sugerido:**
```
┌─────────────────────────────────────────────┐
│                                             │
│        [Logo WebAzul]                       │
│                                             │
│     Desenvolvimento Web & SaaS              │
│     Portugal 🇵🇹 • Brasil 🇧🇷                │
│                                             │
│  🚗 AutoAzul | 🏠 ImobiAzul | 💼 Landing Pages │
│                                             │
│         webazul.pt                          │
│                                             │
└─────────────────────────────────────────────┘

Background: Gradiente escuro (#000 → #1a1a1a)
Destaque: Azul WebAzul (#2563eb)
Fonte: Inter, bold para títulos
```

**Ferramentas para Criar:**
- Figma (recomendado)
- Canva Pro
- Adobe Photoshop
- Sketch
- https://www.opengraph.xyz/ (gerador online)

---

### **Imagens Específicas por Seção (Opcional mas Recomendado):**

#### **`og-autoazul.png`** (1200x630px)
```
Conteúdo:
- Logo AutoAzul em destaque
- Screenshot do sistema
- Texto: "Sistema de Gestão para Stands Automóveis"
- CTA: "Experimente Grátis"
- Ícones: 🚗 CRM • 📊 Inventário • 💰 Vendas
```

#### **`og-imobiazul.png`** (1200x630px)
```
Conteúdo:
- Logo ImobiAzul em destaque
- Screenshot do sistema
- Texto: "Plataforma Completa para Imobiliárias"
- CTA: "Demo Gratuita"
- Ícones: 🏠 Propriedades • 360° Tours • 📈 CRM
```

#### **`og-landing-pages.png`** (1200x630px)
```
Conteúdo:
- Mockups de landing pages
- Texto: "Landing Pages que Convertem"
- Estatísticas: "+150% Conversão"
- Ícones: 📱 Responsivo • ⚡ Rápido • 🎯 SEO
```

#### **`og-social-media.png`** (1200x630px)
```
Conteúdo:
- Posts de redes sociais
- Texto: "Gestão de Social Media"
- Plataformas: Instagram, Facebook, LinkedIn
- Ícones: 📱 Conteúdo • 📊 Analytics • 🚀 Crescimento
```

---

## 📐 **Especificações por Plataforma:**

### **WhatsApp**
```
Formato: Usa Open Graph tags
Tamanho ideal: 1200x630px
Aspect ratio: 1.91:1
Tamanho max: 300KB (carrega mais rápido)
Formato: JPG ou PNG

Dica: WhatsApp cacheía previews por ~7 dias
```

**Teste WhatsApp:**
- Envie link para você mesmo
- Se não aparecer, aguarde 5-10 minutos
- Cache pode levar até 24h para atualizar

---

### **Facebook**
```
Tamanho recomendado: 1200x630px
Tamanho mínimo: 600x315px
Aspect ratio: 1.91:1
Tamanho max: 8MB
Formato: JPG, PNG, GIF

⚠️ Evite mais de 20% texto na imagem (Facebook penaliza)
```

**Teste Facebook:**
https://developers.facebook.com/tools/debug/

**Forçar atualização:**
1. Cole https://webazul.pt no debugger
2. Clique "Scrape Again"
3. Verifique preview

---

### **Twitter/X**
```
Summary Large Image Card:
- Tamanho: 1200x628px (não 630!)
- Aspect ratio: 1.91:1
- Tamanho max: 5MB
- Formato: JPG, PNG, WEBP, GIF

Summary Card (pequeno):
- Tamanho: 120x120px
- Usado se large image falhar
```

**Teste Twitter:**
https://cards-dev.twitter.com/validator

---

### **LinkedIn**
```
Tamanho recomendado: 1200x627px (não 630!)
Tamanho mínimo: 1200x627px
Aspect ratio: 1.91:1
Tamanho max: 5MB
Formato: JPG ou PNG

⚠️ LinkedIn é mais restritivo com dimensões
```

**Teste LinkedIn:**
https://www.linkedin.com/post-inspector/

**Como testar:**
1. Cole URL
2. Clique "Inspect"
3. Verifique preview

---

### **Telegram**
```
Usa Open Graph (mesmo que WhatsApp)
Tamanho ideal: 1200x630px
Formato: JPG ou PNG
Cache: Atualiza mais rápido que WhatsApp
```

---

### **Discord**
```
Usa Open Graph
Tamanho ideal: 1200x630px
Formato: JPG, PNG, GIF
Aceita vídeos: MP4
Tamanho max embed: 8MB
```

---

### **iMessage (iOS)**
```
Usa Open Graph
Apple-specific tags (opcional):
<meta property="al:ios:app_name" content="WebAzul">
<meta property="al:ios:app_store_id" content="APP_ID">
```

---

## 🧪 **Como Testar Previews:**

### **1. Ferramentas Online:**
```
🔧 Facebook Debugger:
https://developers.facebook.com/tools/debug/

🔧 Twitter Card Validator:
https://cards-dev.twitter.com/validator

🔧 LinkedIn Post Inspector:
https://www.linkedin.com/post-inspector/

🔧 OG Image Previewer:
https://www.opengraph.xyz/url/https://webazul.pt/

🔧 Meta Tags Checker:
https://metatags.io/
```

### **2. Teste Real (Recomendado):**
```
WhatsApp:
1. Envie link para você mesmo
2. Aguarde preview aparecer
3. Clique para abrir

Facebook:
1. Cole link em post privado
2. Verifique preview antes de publicar

Twitter:
1. Crie tweet privado/draft
2. Cole link
3. Verifique preview
```

---

## 🔄 **Atualizar Cache de Previews:**

### **Facebook:**
```
1. https://developers.facebook.com/tools/debug/
2. Cole URL
3. Clique "Scrape Again"
4. Cache atualizado instantaneamente
```

### **LinkedIn:**
```
1. https://www.linkedin.com/post-inspector/
2. Cole URL
3. Clique "Inspect"
4. Cache atualizado
```

### **WhatsApp:**
```
❌ Não tem ferramenta oficial
⏰ Cache leva 24h-7 dias para expirar
💡 Solução: Adicione ?v=2 na URL (webazul.pt/?v=2)
```

### **Twitter:**
```
❌ Não tem botão de forçar update
⏰ Cache atualiza automaticamente em 1-7 dias
💡 Solução: Use query parameter diferente
```

---

## 🎨 **Template de Imagem OG (Figma/Canva):**

### **Layout Sugerido:**
```css
Container: 1200x630px
Padding: 80px horizontal, 60px vertical

Elementos:
┌─────────────────────────────────────┐
│  [Logo]                             │  ← 60px do topo
│                                     │
│  [Título Principal]                 │  ← Font 60-72px, bold
│  [Subtítulo]                        │  ← Font 32-40px, regular
│                                     │
│  [Elementos visuais/ícones]         │
│                                     │
│  [CTA ou URL]                       │  ← 60px do fundo
└─────────────────────────────────────┘

Cores:
- Background: Gradiente #000 → #1a1a1a
- Primary: #2563eb (azul WebAzul)
- Text: #ffffff
- Accent: #3b82f6

Fontes:
- Título: Inter Bold 60-72px
- Corpo: Inter Regular 32-40px
- URL: Inter Medium 24px
```

---

## 💻 **Uso do Componente Dinâmico:**

```javascript
// Importar utility
import { updateSocialMeta, SocialMetaData } from './utils/socialMeta'

// Atualizar meta tags ao mudar de seção
useEffect(() => {
  // Usar dados pré-definidos
  const meta = SocialMetaData.autoazul
  updateSocialMeta(meta)

  // Ou customizar
  updateSocialMeta({
    title: 'AutoAzul | Sistema para Stands Automóveis',
    description: '🚗 Sistema completo com CRM integrado',
    image: 'https://webazul.pt/og-autoazul.png',
    url: 'https://webazul.pt/#systems'
  })
}, [])
```

### **Botões de Compartilhamento:**
```javascript
import { shareTo, nativeShare } from './utils/socialMeta'

// Compartilhar em plataforma específica
<button onClick={() => shareTo('facebook')}>
  Compartilhar no Facebook
</button>

// Usar Web Share API (mobile)
<button onClick={() => nativeShare()}>
  Compartilhar
</button>
```

---

## 📊 **Checklist de Implementação:**

### **Concluído:**
- [x] Open Graph tags completas
- [x] Twitter Cards implementados
- [x] LinkedIn tags otimizados
- [x] Meta tags dimensões de imagem
- [x] Locale PT-PT e PT-BR
- [x] Utility para atualização dinâmica
- [x] Documentação completa

### **Pendente (VOCÊ precisa fazer):**
- [ ] Criar `og-image.png` (1200x630px) - **PRIORITÁRIO**
- [ ] Upload para `/public/og-image.png`
- [ ] Opcional: Criar imagens específicas por seção
- [ ] Testar no Facebook Debugger
- [ ] Testar no Twitter Card Validator
- [ ] Testar no LinkedIn Post Inspector
- [ ] Enviar link no WhatsApp para testar
- [ ] Verificar preview em diferentes plataformas

---

## 🎯 **Imagem PRIORITÁRIA a Criar:**

### **`og-image.png` - Especificações Finais:**
```
📐 Dimensões: 1200 x 630 pixels (EXATO!)
📦 Formato: PNG (melhor qualidade) ou JPG (menor tamanho)
📏 Tamanho: < 300KB para WhatsApp rápido, max 8MB
📍 Local: /public/og-image.png
🔗 URL: https://webazul.pt/og-image.png

Conteúdo DEVE incluir:
✅ Logo WebAzul
✅ Texto "Desenvolvimento Web & SaaS"
✅ Bandeiras 🇵🇹🇧🇷 ou texto "Portugal • Brasil"
✅ Serviços principais (AutoAzul, ImobiAzul)
✅ URL webazul.pt
✅ Design profissional com brand colors

❌ EVITAR:
- Muito texto (máx 20% da imagem no Facebook)
- Elementos importantes nas bordas (podem ser cortados)
- Imagens de baixa resolução
- Logos muito pequenos (mínimo 180x180px)
```

---

## 🆘 **Troubleshooting:**

### **Preview não aparece no WhatsApp:**
```
1. Aguarde 5-10 minutos após publicar
2. Verifique se imagem existe: https://webazul.pt/og-image.png
3. Teste em navegador: deve abrir a imagem
4. WhatsApp cache leva até 24h
5. Tente adicionar ?v=2 na URL
```

### **Preview quebrado no Facebook:**
```
1. Use Facebook Debugger
2. Clique "Scrape Again"
3. Verifique erros reportados
4. Dimensões devem ser EXATAS (1200x630)
5. Tamanho < 8MB
```

### **Twitter não mostra imagem:**
```
1. Verifique dimensões: 1200x628 (não 630!)
2. Tamanho < 5MB
3. Use Twitter Card Validator
4. twitter:card deve ser "summary_large_image"
5. Imagem deve ser HTTPS
```

---

## 📚 **Recursos Adicionais:**

### **Geradores de Imagem OG:**
- https://www.opengraph.xyz/
- https://og-playground.vercel.app/
- https://socialsharepreview.com/

### **Documentação Oficial:**
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Facebook Sharing](https://developers.facebook.com/docs/sharing/webmasters)
- [LinkedIn Share](https://www.linkedin.com/help/linkedin/answer/46687)

---

## ✅ **Status Atual:**

```
✅ Tags implementadas corretamente
✅ Utility functions criadas
✅ Documentação completa

⚠️ AGUARDANDO:
📸 Criação da imagem og-image.png (1200x630px)
🚀 Deploy com nova imagem
🧪 Testes em todas as plataformas
```

---

**Última atualização:** 2025-10-14
**Versão:** 1.0.0
**Próximo passo:** Criar imagem `og-image.png` e fazer upload
