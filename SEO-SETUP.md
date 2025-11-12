# Guia de Configuração SEO - WebAzul.pt

## PROBLEMAS ENCONTRADOS

Seu site não está recebendo visitas do Google porque:
1. **Google Search Console NÃO está configurado** - site não está registrado no Google
2. **Google Tag Manager NÃO está configurado** - analytics não funciona
3. **Facebook Pixel com placeholder** - tracking de conversões não funciona

---

## 🚨 PRIORIDADE MÁXIMA: Google Search Console

### Por que é URGENTE?
Sem o Google Search Console, o Google **NÃO sabe que seu site existe**. É literalmente impossível aparecer nas buscas sem isso.

### Configuração Passo a Passo:

#### 1. Acesse o Google Search Console
- URL: https://search.google.com/search-console
- Faça login com sua conta Google (use uma conta empresarial se possível)

#### 2. Adicione a Propriedade
- Clique em **"Adicionar propriedade"**
- Escolha **"Prefixo do URL"**
- Digite: `https://webazul.pt`
- Clique em **"Continuar"**

#### 3. Verificação do Site
- Escolha o método **"Tag HTML"** (já preparado no seu index.html)
- Copie o código que aparece (exemplo: `google-site-verification: abc123xyz`)
- Abra o arquivo `index.html` linha 57
- Substitua `GOOGLE_VERIFICATION_CODE_HERE` pelo código copiado
- Exemplo: `<meta name="google-site-verification" content="abc123xyz" />`

#### 4. Faça Deploy
```bash
npm run build
# Faça commit e push para GitHub
git add .
git commit -m "feat: adicionar verificação Google Search Console"
git push origin main
```

#### 5. Aguarde Deploy (GitHub Actions)
- Acesse: https://github.com/SEU_USUARIO/webazul.pt/actions
- Aguarde o deploy finalizar (geralmente 2-5 minutos)

#### 6. Volte ao Search Console
- Clique em **"Verificar"**
- Se der erro, aguarde mais 5 minutos e tente novamente

#### 7. Submeta o Sitemap
- No Search Console, vá em **"Sitemaps"** (menu lateral)
- Adicione: `sitemap.xml`
- Clique em **"Enviar"**

### ✅ Resultado Esperado
Após 24-48 horas, você verá:
- Site indexado no Google
- Primeiras impressões e cliques
- Palavras-chave que levam ao seu site

---

## 📊 Google Tag Manager + Google Analytics 4

### Por que precisa?
Para saber quantas pessoas visitam seu site, de onde vêm, o que fazem, etc.

### Configuração:

#### 1. Criar Conta Google Tag Manager
- URL: https://tagmanager.google.com
- Clique em **"Criar conta"**
- **Nome da conta**: WebAzul
- **País**: Portugal
- **Nome do contêiner**: webazul.pt
- **Plataforma de destino**: Web
- Aceite os termos

#### 2. Copie o ID do GTM
- Após criar, aparecerá um código
- Copie o ID (formato: `GTM-XXXXXXX`)
- Exemplo: `GTM-W3R2T5Y`

#### 3. Atualize o index.html
- Abra `index.html` linha 15
- Descomente o código (remova `<!--` e `-->`)
- Substitua `YOUR_GTM_ID` pelo ID copiado
- Faça o mesmo na linha 412 (noscript)

#### 4. Configure Google Analytics 4 dentro do GTM
- No GTM, vá em **"Tags"** → **"Nova"**
- Nome: `GA4 - Page View`
- **Tipo de tag**: Google Analytics: GA4 Configuration
- **ID de medição**: Crie uma propriedade GA4 em https://analytics.google.com
- **Acionador**: All Pages
- Clique em **"Salvar"**

#### 5. Publique o Container
- No GTM, clique em **"Enviar"** (canto superior direito)
- **Nome da versão**: "Initial Setup"
- Clique em **"Publicar"**

#### 6. Deploy
```bash
npm run build
git add .
git commit -m "feat: adicionar Google Tag Manager e GA4"
git push origin main
```

### ✅ Verificação
- Acesse seu site
- No GTM, vá em **"Visualizar"** → **"Debug"**
- Recarregue a página
- Você deve ver eventos sendo disparados

---

## 🎯 Facebook Pixel (Opcional - apenas se for usar Meta Ads)

### Quando usar?
Apenas se você planeja fazer anúncios no Facebook/Instagram.

### Configuração:

#### 1. Acesse o Gerenciador de Eventos
- URL: https://business.facebook.com/events_manager
- Faça login com sua conta comercial do Facebook

#### 2. Crie um Pixel
- Clique em **"Conectar origens de dados"** → **"Web"**
- Escolha **"Pixel do Facebook"** → **"Conectar"**
- Nome do pixel: **WebAzul**

#### 3. Configure Manualmente
- Escolha **"Instalar código manualmente"**
- Copie o **ID do Pixel** (número longo)

#### 4. Atualize o index.html
- Abra `index.html` linha 34
- Descomente o código
- Substitua `YOUR_PIXEL_ID` pelo ID copiado

#### 5. Deploy
```bash
npm run build
git add .
git commit -m "feat: adicionar Facebook Pixel"
git push origin main
```

---

## 🔍 Ferramentas Adicionais de SEO

### 1. Google My Business (ESSENCIAL para empresas locais)
- URL: https://business.google.com
- Configure sua empresa com:
  - Endereço (se tiver escritório físico)
  - Telefone: (+351) 910 084 099
  - Website: https://webazul.pt
  - Horário de atendimento
  - Fotos do escritório/equipe

### 2. Bing Webmaster Tools
- URL: https://www.bing.com/webmasters
- Importe os dados do Google Search Console (opção disponível)
- Submeta o sitemap: https://webazul.pt/sitemap.xml

### 3. Backlinks (MUITO IMPORTANTE)
- Liste seu negócio em:
  - Google My Business
  - Páginas Amarelas (Portugal)
  - Yelp Portugal
  - LinkedIn Company Page
  - Diretórios de web design portugueses
  - Startups.pt (se aplicável)

### 4. Redes Sociais
- Crie perfis profissionais:
  - LinkedIn: https://linkedin.com/company/webazul
  - Facebook: https://facebook.com/webazul
  - Instagram: @webazul
- Link todos os perfis no rodapé do site

---

## 📈 Monitoramento

### Após Configurar Tudo (aguarde 7 dias):

#### No Google Search Console:
- **Impressões**: Quantas vezes apareceu nas buscas
- **Cliques**: Quantas pessoas clicaram
- **CTR**: Taxa de cliques (ideal: 2-5%)
- **Posição média**: Posição média nos resultados (ideal: top 10)

#### No Google Analytics:
- **Usuários**: Quantas pessoas visitaram
- **Sessões**: Quantas visitas totais
- **Taxa de rejeição**: Ideal abaixo de 60%
- **Duração média**: Ideal acima de 2 minutos

---

## 🎯 Palavras-chave Alvo (já otimizadas no site)

### Principais:
- AutoAzul
- ImobiAzul
- sistema gestão automóveis
- software stand automóveis
- software imobiliária Portugal
- CRM automóveis
- landing pages Portugal
- desenvolvimento web Portugal

### Long-tail (específicas):
- "sistema completo para concessionárias Portugal"
- "software para stands automóveis com CRM"
- "plataforma gestão imobiliária tour virtual"
- "agência desenvolvimento web Braga"

---

## ⏰ Timeline Esperado

### Semana 1-2 (Configuração)
- [ ] Configurar Google Search Console
- [ ] Configurar Google Tag Manager
- [ ] Configurar Google Analytics 4
- [ ] Submeter sitemap
- [ ] Criar Google My Business

### Semana 2-4 (Indexação)
- Site começa a aparecer no Google
- Primeiras impressões (visualizações nos resultados)
- Primeiros cliques

### Mês 2-3 (Crescimento)
- Aumento gradual de visitas
- Posicionamento melhora para palavras-chave alvo
- 50-200 visitas/mês

### Mês 4-6 (Consolidação)
- 200-500 visitas/mês
- Top 10 para algumas palavras-chave
- Primeiros leads orgânicos

---

## 🚨 Checklist Final

Antes de fazer deploy:
- [ ] Google Search Console verification code configurado
- [ ] Google Tag Manager ID configurado
- [ ] Facebook Pixel configurado (se aplicável)
- [ ] Sitemap atualizado com data de hoje
- [ ] Robots.txt correto
- [ ] Build testado localmente (`npm run build`)
- [ ] Deploy feito para produção
- [ ] Aguardar 5 minutos após deploy
- [ ] Verificar site no Google Search Console
- [ ] Submeter sitemap no Google Search Console

---

## 📞 Dúvidas?

Se precisar de ajuda adicional:
1. Verifique os comentários TODO no `index.html`
2. Consulte a documentação oficial:
   - Search Console: https://support.google.com/webmasters
   - Tag Manager: https://support.google.com/tagmanager
   - Analytics: https://support.google.com/analytics

---

**Data de criação deste guia**: 2025-11-12
**Próxima revisão**: Após configurar todas as ferramentas (7-14 dias)
