# 🖼️ Como Converter og-image.svg → og-image.png

## ✅ Situação Atual

Você JÁ TEM uma imagem SVG perfeita em `/public/og-image.svg`!

**Problema:** Redes sociais (WhatsApp, Facebook, Twitter) **NÃO suportam SVG**.
**Solução:** Converter SVG → PNG (1200x630px)

---

## 🚀 Solução Rápida (3 Métodos)

### **Método 1: Online (Mais Rápido) ⚡**

1. **CloudConvert** (Recomendado)
   ```
   https://cloudconvert.com/svg-to-png

   1. Upload: og-image.svg
   2. Set width: 1200px
   3. Set height: 630px
   4. Quality: 100%
   5. Download: og-image.png
   ```

2. **SVG to PNG Converter**
   ```
   https://svgtopng.com/

   1. Upload og-image.svg
   2. Set size: 1200x630
   3. Download PNG
   ```

3. **Vercel OG Image**
   ```
   https://og-playground.vercel.app/

   (Pode usar como alternativa)
   ```

---

### **Método 2: Figma (Profissional) 🎨**

1. Abra Figma: https://figma.com
2. Criar novo arquivo
3. **Import:** Arraste `og-image.svg`
4. Ajustar para 1200x630px exato
5. **Export:**
   - Format: PNG
   - Scale: 1x ou 2x
   - Download

---

### **Método 3: Terminal (Se tiver ImageMagick/Inkscape) 💻**

#### **Com ImageMagick:**
```bash
# Instalar (se não tiver)
brew install imagemagick

# Converter
magick convert -density 300 -background none \
  public/og-image.svg \
  -resize 1200x630! \
  public/og-image.png
```

#### **Com Inkscape:**
```bash
# Instalar (se não tiver)
brew install inkscape

# Converter
inkscape public/og-image.svg \
  --export-type=png \
  --export-filename=public/og-image.png \
  --export-width=1200 \
  --export-height=630
```

#### **Com Node.js (sharp):**
```bash
# Criar script rápido
npm install sharp

# converter.js
const sharp = require('sharp');
const fs = require('fs');

const svg = fs.readFileSync('./public/og-image.svg');

sharp(svg)
  .resize(1200, 630)
  .png()
  .toFile('./public/og-image.png')
  .then(() => console.log('✅ Converted!'))
  .catch(err => console.error('❌ Error:', err));

# Executar
node converter.js
```

---

## ✅ Após Converter

### **1. Verificar a imagem:**
```bash
# Ver dimensões
file public/og-image.png
# Deve mostrar: PNG image data, 1200 x 630
```

### **2. Otimizar tamanho (opcional):**
```bash
# TinyPNG (online)
https://tinypng.com/

# ou ImageOptim (Mac)
# ou Squoosh (online)
https://squoosh.app/
```

### **3. Atualizar index.html:**
```html
<!-- Trocar isto: -->
<meta property="og:image" content="https://webazul.pt/webazul-white.png">
<meta property="og:image:width" content="625">
<meta property="og:image:height" content="313">

<!-- Por isto: -->
<meta property="og:image" content="https://webazul.pt/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

### **4. Testar:**
```
1. Deploy do site
2. Facebook Debugger: https://developers.facebook.com/tools/debug/
3. Twitter Validator: https://cards-dev.twitter.com/validator
4. Enviar no WhatsApp para você mesmo
```

---

## 🎯 Solução SUPER Rápida (Recomendada)

### **Use CloudConvert Agora:**

1. **Acesse:** https://cloudconvert.com/svg-to-png
2. **Upload:** `/public/og-image.svg`
3. **Configurar:**
   - Width: `1200`
   - Height: `630`
   - Quality: `100%`
4. **Convert & Download**
5. **Salvar como:** `og-image.png` em `/public/`
6. **Commit & Push**

**Tempo total: 2 minutos** ⏱️

---

## 📊 Checklist

- [ ] Converter `og-image.svg` → `og-image.png`
- [ ] Verificar dimensões: 1200x630px
- [ ] Otimizar tamanho (< 300KB ideal)
- [ ] Salvar em `/public/og-image.png`
- [ ] Atualizar `index.html` (linhas 69-73)
- [ ] Fazer deploy
- [ ] Testar no Facebook Debugger
- [ ] Testar no WhatsApp

---

## 🆘 Problemas?

### **SVG não converte bem:**
- Use Figma (sempre funciona)
- Ou use ferramenta online CloudConvert

### **PNG ficou muito grande:**
- Comprimir em https://tinypng.com/
- Ou https://squoosh.app/
- Meta: < 300KB

### **Imagem distorcida:**
- Certifique-se: EXATAMENTE 1200x630px
- Não use "auto" ou "maintain aspect ratio"
- Forçar dimensões exatas

---

## ✨ Resultado Final

Depois da conversão, quando compartilhar `https://webazul.pt`:

```
✅ WhatsApp: Preview rico com imagem bonita
✅ Facebook: Preview perfeito
✅ Twitter: Large Image Card
✅ LinkedIn: Preview profissional
✅ Telegram: Preview completo
```

---

**Tempo estimado:** 2-5 minutos
**Dificuldade:** Fácil
**Prioridade:** Alta (para previews sociais funcionarem)
