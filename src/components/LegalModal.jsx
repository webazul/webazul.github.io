import { useEffect } from 'react'
import './LegalModal.css'
import { FaTimes } from 'react-icons/fa'

function LegalModal({ isOpen, onClose, type }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'

      // ESC key to close
      const handleEsc = (e) => {
        if (e.key === 'Escape') {
          onClose()
        }
      }
      document.addEventListener('keydown', handleEsc)

      // Safety: Auto-close after 60 seconds if stuck
      const autoCloseTimer = setTimeout(() => {
        console.warn('LegalModal auto-closed after 60s timeout')
        onClose()
      }, 60000)

      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEsc)
        clearTimeout(autoCloseTimer)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidade',
          content: (
            <div>
              <h3>1. Identificação do Responsável</h3>
              <p>WebAzul Creative Studio<br />
              Lisboa, Portugal<br />
              Email: contacto@webazul.pt<br />
              Telefone: (+351) 910 084 099</p>

              <h3>2. Dados Pessoais Recolhidos</h3>
              <p>Recolhemos apenas os dados pessoais estritamente necessários para prestar os nossos serviços:</p>
              <ul>
                <li><strong>Dados de identificação:</strong> Nome completo</li>
                <li><strong>Dados de contacto:</strong> Endereço de email, número de telemóvel</li>
                <li><strong>Dados do projeto:</strong> Tipo de serviço solicitado, orçamento, prazo, descrição do projeto</li>
                <li><strong>Dados técnicos:</strong> Endereço IP, tipo de navegador, dados de navegação (cookies essenciais)</li>
              </ul>

              <h3>3. Finalidades do Tratamento</h3>
              <p>Os seus dados pessoais são tratados para:</p>
              <ul>
                <li>Responder às suas solicitações de orçamento e informações</li>
                <li>Prestar os serviços de desenvolvimento web e digitais solicitados</li>
                <li>Gerir a relação comercial estabelecida</li>
                <li>Cumprir obrigações legais e contratuais</li>
                <li>Melhorar a funcionalidade do nosso website</li>
              </ul>

              <h3>4. Base Legal</h3>
              <p>O tratamento dos seus dados baseia-se em:</p>
              <ul>
                <li><strong>Consentimento:</strong> Para contacto comercial e cookies não essenciais</li>
                <li><strong>Execução de contrato:</strong> Para prestação dos serviços solicitados</li>
                <li><strong>Interesse legítimo:</strong> Para melhoria dos nossos serviços</li>
                <li><strong>Cumprimento de obrigação legal:</strong> Para fins fiscais e contabilísticos</li>
              </ul>

              <h3>5. Partilha de Dados</h3>
              <p>Os seus dados pessoais não são vendidos, alugados ou partilhados com terceiros, exceto:</p>
              <ul>
                <li>Prestadores de serviços essenciais (hosting, email) com acordos de proteção de dados</li>
                <li>Autoridades competentes, quando legalmente obrigatório</li>
              </ul>

              <h3>6. Prazo de Conservação</h3>
              <p>Os dados são conservados pelo tempo estritamente necessário:</p>
              <ul>
                <li><strong>Dados de contacto:</strong> Até retirada do consentimento</li>
                <li><strong>Dados contratuais:</strong> 5 anos após conclusão do serviço</li>
                <li><strong>Dados fiscais:</strong> Conforme legislação fiscal aplicável</li>
              </ul>

              <h3>7. Os Seus Direitos</h3>
              <p>Nos termos do RGPD, tem direito a:</p>
              <ul>
                <li><strong>Acesso:</strong> Obter informação sobre os dados que tratamos</li>
                <li><strong>Retificação:</strong> Corrigir dados inexatos ou incompletos</li>
                <li><strong>Apagamento:</strong> Solicitar a eliminação dos seus dados</li>
                <li><strong>Limitação:</strong> Restringir o tratamento dos seus dados</li>
                <li><strong>Portabilidade:</strong> Receber os dados num formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao tratamento baseado em interesse legítimo</li>
                <li><strong>Retirada de consentimento:</strong> A qualquer momento</li>
              </ul>

              <h3>8. Exercício de Direitos</h3>
              <p>Para exercer os seus direitos, contacte-nos através de contacto@webazul.pt</p>
              <p>Tem também direito a apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).</p>

              <h3>9. Alterações</h3>
              <p>Esta política pode ser atualizada. A versão mais recente estará sempre disponível no nosso website.</p>

              <p><small><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}</small></p>
            </div>
          )
        }

      case 'terms':
        return {
          title: 'Termos e Condições de Serviço',
          content: (
            <div>
              <h3>1. Objeto</h3>
              <p>Os presentes termos regulam a prestação de serviços de desenvolvimento web e soluções digitais pela WebAzul Creative Studio.</p>

              <h3>2. Serviços</h3>
              <p>Prestamos os seguintes serviços:</p>
              <ul>
                <li>Desenvolvimento de websites responsivos</li>
                <li>Criação de plataformas e-commerce</li>
                <li>Desenvolvimento de aplicações web</li>
                <li>Otimização SEO</li>
                <li>Gestão de redes sociais</li>
                <li>Serviços de hosting e domínio</li>
                <li>Manutenção e suporte técnico</li>
              </ul>

              <h3>3. Processo de Projeto</h3>
              <p><strong>3.1. Consulta inicial:</strong> Gratuita e sem compromisso</p>
              <p><strong>3.2. Orçamento:</strong> Válido por 30 dias</p>
              <p><strong>3.3. Confirmação:</strong> Mediante assinatura de contrato e pagamento de sinal</p>
              <p><strong>3.4. Desenvolvimento:</strong> Acompanhamento regular e validações com cliente</p>

              <h3>4. Prazos</h3>
              <p><strong>4.1.</strong> Os prazos são acordados individualmente e confirmados por escrito</p>
              <p><strong>4.2.</strong> Websites simples: 2-4 semanas</p>
              <p><strong>4.3.</strong> E-commerce e aplicações: 6-12 semanas</p>
              <p><strong>4.4.</strong> Prazos urgentes sujeitos a suplemento de 25%</p>

              <h3>5. Preços e Pagamento</h3>
              <p><strong>5.1.</strong> Preços acordados individualmente conforme projeto</p>
              <p><strong>5.2.</strong> Sinal de 50% na confirmação da encomenda</p>
              <p><strong>5.3.</strong> Restante valor na entrega da peça</p>
              <p><strong>5.4.</strong> Alterações substanciais podem implicar custos adicionais</p>

              <h3>6. Revisões e Alterações</h3>
              <p><strong>6.1.</strong> Incluímos até 3 revisões no preço base</p>
              <p><strong>6.2.</strong> Revisões adicionais: €50 cada ou 10% do valor do projeto</p>
              <p><strong>6.3.</strong> Cliente deve aprovar mockups e protótipos nas datas acordadas</p>
              <p><strong>6.4.</strong> Alterações substanciais após aprovação podem implicar custos adicionais</p>

              <h3>7. Propriedade e Licenças</h3>
              <p><strong>7.1.</strong> Código desenvolvido fica propriedade do cliente após pagamento integral</p>
              <p><strong>7.2.</strong> Designs e conceitos criativos permanecem propriedade da WebAzul</p>
              <p><strong>7.3.</strong> Cliente recebe licença de uso do website/aplicação desenvolvido</p>

              <h3>8. Cancelamentos</h3>
              <p><strong>8.1.</strong> Até 48h após assinatura: reembolso total</p>
              <p><strong>8.2.</strong> Após início dos trabalhos: sem reembolso</p>
              <p><strong>8.3.</strong> Cancelamento por nossa iniciativa: reembolso total</p>

              <h3>9. Garantias</h3>
              <p><strong>9.1.</strong> Garantimos a qualidade do código e funcionamento por 30 dias</p>
              <p><strong>9.2.</strong> Correção gratuita de bugs nos primeiros 30 dias</p>
              <p><strong>9.3.</strong> Não nos responsabilizamos por danos em hosting não gerido por nós</p>

              <h3>10. Suporte e Manutenção</h3>
              <p><strong>10.1.</strong> Suporte básico gratuito por 30 dias após entrega</p>
              <p><strong>10.2.</strong> Planos de manutenção disponíveis com valores específicos</p>

              <h3>11. Força Maior</h3>
              <p>Não nos responsabilizamos por atrasos devido a circunstâncias imprevistas e inevitáveis.</p>

              <h3>12. Lei Aplicável</h3>
              <p>Estes termos regem-se pela lei portuguesa. Foro competente: Lisboa.</p>

              <p><small><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}</small></p>
            </div>
          )
        }

      case 'cookies':
        return {
          title: 'Política de Cookies',
          content: (
            <div>
              <h3>1. O que são Cookies?</h3>
              <p>Cookies são pequenos ficheiros de texto que são colocados no seu dispositivo quando visita o nosso website. Permitem-nos reconhecer o seu dispositivo e armazenar algumas informações sobre as suas preferências.</p>

              <h3>2. Como Utilizamos os Cookies</h3>
              <p>Utilizamos cookies para:</p>
              <ul>
                <li>Garantir o funcionamento básico do website</li>
                <li>Lembrar as suas preferências de privacidade</li>
                <li>Analisar como o nosso website é utilizado</li>
                <li>Melhorar a experiência do utilizador</li>
              </ul>

              <h3>3. Tipos de Cookies</h3>

              <h4>3.1. Cookies Essenciais</h4>
              <p>Estes cookies são estritamente necessários para o funcionamento do website:</p>
              <ul>
                <li><strong>cookieConsent:</strong> Armazena a sua preferência de cookies</li>
                <li><strong>cookieConsentDate:</strong> Data do consentimento dado</li>
              </ul>
              <p><em>Estes cookies não podem ser desativados pois são essenciais para o funcionamento do site.</em></p>

              <h4>3.2. Cookies Analíticos (Opcionais)</h4>
              <p>Ajudam-nos a compreender como os visitantes interagem com o website:</p>
              <ul>
                <li>Páginas mais visitadas</li>
                <li>Tempo de permanência no site</li>
                <li>Origem do tráfego</li>
              </ul>
              <p><em>Estes cookies apenas são ativados com o seu consentimento.</em></p>

              <h4>3.3. Cookies de Marketing (Opcionais)</h4>
              <p>Atualmente não utilizamos cookies de marketing ou publicidade.</p>

              <h3>4. Cookies de Terceiros</h3>
              <p>Podemos utilizar serviços de terceiros que colocam os seus próprios cookies:</p>
              <ul>
                <li><strong>Google Analytics:</strong> Para análise de tráfego (apenas com consentimento)</li>
                <li><strong>Google Maps:</strong> Para exibição de mapas (apenas quando utilizado)</li>
              </ul>

              <h3>5. Duração dos Cookies</h3>
              <ul>
                <li><strong>Cookies de sessão:</strong> Eliminados quando fecha o navegador</li>
                <li><strong>Cookies persistentes:</strong> Permanecem até expirarem ou serem eliminados</li>
                <li><strong>Consentimento de cookies:</strong> 12 meses</li>
              </ul>

              <h3>6. Gestão de Cookies</h3>

              <h4>6.1. Através do nosso website</h4>
              <p>Pode gerir as suas preferências através do banner de cookies que aparece na primeira visita.</p>

              <h4>6.2. Através do navegador</h4>
              <p>Pode controlar cookies através das definições do seu navegador:</p>
              <ul>
                <li><strong>Chrome:</strong> Definições &gt; Privacidade e segurança &gt; Cookies</li>
                <li><strong>Firefox:</strong> Opções &gt; Privacidade e Segurança</li>
                <li><strong>Safari:</strong> Preferências &gt; Privacidade</li>
                <li><strong>Edge:</strong> Definições &gt; Cookies e permissões do site</li>
              </ul>

              <h3>7. Consequências da Desativação</h3>
              <p>A desativação de cookies essenciais pode afetar o funcionamento do website. Cookies analíticos podem ser desativados sem impacto na funcionalidade.</p>

              <h3>8. Atualizações</h3>
              <p>Esta política pode ser atualizada. Quaisquer alterações significativas serão comunicadas através do website.</p>

              <h3>9. Contacto</h3>
              <p>Para questões sobre cookies, contacte-nos em contacto@webazul.pt</p>

              <p><small><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}</small></p>
            </div>
          )
        }

      default:
        return { title: '', content: '' }
    }
  }

  if (!isOpen) return null

  const { title, content } = getContent()

  return (
    <div className="legal-modal-backdrop" onClick={handleBackdropClick}>
      <div className="legal-modal">
        <div className="legal-modal-header">
          <h2>{title}</h2>
          <button
            className="legal-modal-close"
            onClick={onClose}
            aria-label="Fechar"
          >
            <FaTimes />
          </button>
        </div>
        <div className="legal-modal-content">
          {content}
        </div>
        <div className="legal-modal-footer">
          <button className="legal-modal-btn" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}

export default LegalModal