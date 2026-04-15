import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

const ROUTES = ['/'];

function createStaticServer(port) {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const urlPath = req.url.split('?')[0];
      let filePath = join(distPath, urlPath === '/' ? 'index.html' : urlPath);

      if (!existsSync(filePath) || !filePath.includes('.')) {
        filePath = join(distPath, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = filePath.split('.').pop();
        const contentTypes = {
          html: 'text/html',
          js: 'application/javascript',
          css: 'text/css',
          json: 'application/json',
          png: 'image/png',
          jpg: 'image/jpeg',
          svg: 'image/svg+xml',
          ico: 'image/x-icon',
        };
        res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });

    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
      resolve(server);
    });
  });
}

async function prerender() {
  const port = 3456;
  const server = await createStaticServer(port);

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    for (const route of ROUTES) {
      const url = `http://localhost:${port}${route}`;
      console.log(`Prerendering: ${route}`);

      const page = await browser.newPage();

      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for main content
      await page.waitForSelector('#inicio', { timeout: 10000 });

      const html = await page.content();

      const outputPath = route === '/'
        ? join(distPath, 'index.html')
        : join(distPath, route.slice(1), 'index.html');

      const dir = dirname(outputPath);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }

      writeFileSync(outputPath, html);
      console.log(`  Saved: ${outputPath}`);

      await page.close();
    }

    console.log('\nPrerendering complete!');
  } catch (error) {
    console.error('Prerender error:', error);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
  }
}

prerender();
