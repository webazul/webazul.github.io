import { useEffect } from 'react'
import './LegalModal.css'
import { FaTimes } from 'react-icons/fa'

function LegalModal({ isOpen, onClose, type }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handleEsc)
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEsc)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Política de Privacidade',
          content: (
            <div>
              <h3>1. Identificação do Responsável</h3>
              <p>WebAzul<br />
              R. de Santa Margarida 42, Braga<br />
              NIF 518109739<br />
              Email: contacto@webazul.pt</p>

              <h3>2. Dados Pessoais Recolhidos</h3>
              <p>Recolhemos apenas os dados estritamente necessários ao funcionamento dos nossos produtos:</p>
              <ul>
                <li><strong>Dados de identificação:</strong> Nome, email</li>
                <li><strong>Dados técnicos:</strong> Endereço IP, tipo de navegador, dados de navegação</li>
                <li><strong>Dados de utilização:</strong> Informações de uso dos nossos produtos (WebGym, WebGym Personal, WebAgenda, WebScan, WebContas, Datun AI)</li>
              </ul>

              <h3>3. Finalidades do Tratamento</h3>
              <ul>
                <li>Prestação e melhoria dos nossos produtos de software</li>
                <li>Gestão de contas e autenticação de utilizadores</li>
                <li>Comunicação sobre atualizações e suporte</li>
                <li>Cumprimento de obrigações legais</li>
              </ul>

              <h3>4. Base Legal</h3>
              <ul>
                <li><strong>Execução de contrato:</strong> Para prestação dos serviços subscritos</li>
                <li><strong>Consentimento:</strong> Para comunicações e cookies não essenciais</li>
                <li><strong>Interesse legítimo:</strong> Para melhoria dos produtos</li>
                <li><strong>Cumprimento legal:</strong> Para fins fiscais e regulamentares</li>
              </ul>

              <h3>5. Partilha de Dados</h3>
              <p>Os dados não são vendidos nem partilhados com terceiros, exceto:</p>
              <ul>
                <li>Prestadores de infraestrutura (Firebase, Google Cloud) com acordos de proteção de dados</li>
                <li>Autoridades competentes, quando legalmente exigido</li>
              </ul>

              <h3>6. Prazo de Conservação</h3>
              <ul>
                <li><strong>Dados de conta:</strong> Enquanto a conta estiver ativa</li>
                <li><strong>Dados contratuais:</strong> 5 anos após término</li>
                <li><strong>Dados fiscais:</strong> Conforme legislação aplicável</li>
              </ul>

              <h3>7. Os Seus Direitos</h3>
              <p>Nos termos do RGPD, tem direito a acesso, retificação, apagamento, limitação, portabilidade e oposição ao tratamento dos seus dados.</p>
              <p>Para exercer os seus direitos: contacto@webazul.pt</p>
              <p>Pode apresentar reclamação à Comissão Nacional de Proteção de Dados (CNPD).</p>

              <p><small><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-PT')}</small></p>
            </div>
          )
        }

      case 'terms':
        return {
          title: 'Termos e Condições',
          content: (
            <div>
              <h3>1. Identificação</h3>
              <p>WebAzul<br />
              R. de Santa Margarida 42, Braga<br />
              NIF 518109739</p>

              <h3>2. Objeto</h3>
              <p>Os presentes termos regulam o acesso e utilização dos produtos de software desenvolvidos pela WebAzul, nomeadamente WebGym, WebGym Personal, WebAgenda, WebScan, WebContas e Datun AI.</p>

              <h3>3. Acesso aos Produtos</h3>
              <p><strong>3.1.</strong> O acesso a cada produto é regido pelos termos específicos de cada plataforma.</p>
              <p><strong>3.2.</strong> O registo implica a aceitação dos termos do respetivo produto.</p>
              <p><strong>3.3.</strong> A WebAzul reserva-se o direito de suspender o acesso em caso de violação dos termos.</p>

              <h3>4. Propriedade Intelectual</h3>
              <p><strong>4.1.</strong> Todo o software, design e conteúdo dos produtos são propriedade da WebAzul.</p>
              <p><strong>4.2.</strong> Os utilizadores recebem uma licença de uso não exclusiva e intransmissível.</p>
              <p><strong>4.3.</strong> É proibida a cópia, modificação ou distribuição do software sem autorização.</p>

              <h3>5. Responsabilidade</h3>
              <p><strong>5.1.</strong> A WebAzul esforça-se por manter os produtos disponíveis e funcionais.</p>
              <p><strong>5.2.</strong> Não garantimos disponibilidade ininterrupta dos serviços.</p>
              <p><strong>5.3.</strong> Não nos responsabilizamos por perdas decorrentes de uso inadequado.</p>

              <h3>6. Alterações</h3>
              <p>Estes termos podem ser atualizados. Alterações significativas serão comunicadas com antecedência.</p>

              <h3>7. Lei Aplicável</h3>
              <p>Estes termos regem-se pela lei portuguesa. Foro competente: Braga.</p>

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
              <p>Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita o nosso website.</p>

              <h3>2. Cookies Utilizados</h3>

              <h4>Essenciais</h4>
              <p>Necessários para o funcionamento do website:</p>
              <ul>
                <li><strong>cookieConsent:</strong> Regista a sua preferência de cookies</li>
                <li><strong>cookieConsentDate:</strong> Data do consentimento</li>
              </ul>

              <h4>Analíticos (opcionais)</h4>
              <p>Ajudam-nos a compreender como o website é utilizado. Apenas ativados com o seu consentimento.</p>

              <h3>3. Gestão de Cookies</h3>
              <p>Pode controlar cookies através das definições do seu navegador. A desativação de cookies essenciais pode afetar o funcionamento do website.</p>

              <h3>4. Contacto</h3>
              <p>Para questões sobre cookies: contacto@webazul.pt</p>

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
          <button className="legal-modal-close" onClick={onClose} aria-label="Fechar">
            <FaTimes />
          </button>
        </div>
        <div className="legal-modal-content">
          {content}
        </div>
        <div className="legal-modal-footer">
          <button className="legal-modal-btn" onClick={onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default LegalModal
