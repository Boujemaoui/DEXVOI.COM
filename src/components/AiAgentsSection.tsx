import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  Zap,
  Workflow,
  Headphones,
  Mail,
  Sliders,
  X,
  Send,
  ShieldCheck,
  Database,
  Check
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface AiAgentsSectionProps {
  onOpenAuditModal: () => void;
  onContactClick?: () => void;
}

export const AiAgentsSection: React.FC<AiAgentsSectionProps> = ({
  onOpenAuditModal,
  onContactClick,
}) => {
  const { t, language } = useLanguage();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState<'whatsapp' | 'web' | 'workflow'>('whatsapp');
  
  // Interactive mini-simulator conversation state
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>(() => {
    if (language === 'fr') {
      return [
        {
          sender: 'user',
          text: 'Bonjour, que proposez-vous pour accélérer le site et capter plus de réservations pour ma clinique ?',
          time: '12:14',
        },
        {
          sender: 'agent',
          text: 'Bonjour ! Chez Dexvoi, nous déployons une architecture web avec temps de chargement < 1s et des systèmes de réservation automatique 24/7 synchronisés avec votre calendrier et WhatsApp. Souhaitez-vous planifier une démo de 10 min ?',
          time: '12:14',
        },
      ];
    }
    if (language === 'en') {
      return [
        {
          sender: 'user',
          text: 'Hello, what services do you offer to increase speed and booking conversions for my clinic?',
          time: '12:14',
        },
        {
          sender: 'agent',
          text: 'Hi! At Dexvoi, we build sub-second web architectures and 24/7 automated booking agents synced with Google Calendar and WhatsApp. Would you like to schedule a 10-minute live demonstration?',
          time: '12:14',
        },
      ];
    }
    return [
      {
        sender: 'user',
        text: 'Hola, ¿qué servicios tenéis para mejorar la velocidad y captar más reservas en mi clínica?',
        time: '12:14',
      },
      {
        sender: 'agent',
        text: '¡Hola! En Dexvoi implementamos optimización web de carga <1s y sistemas de reservas automáticas 24/7 sincronizados con tu agenda y WhatsApp. ¿Te gustaría agendar una demostración en vivo de 10 minutos?',
        time: '12:14',
      },
    ];
  });
  const [simInput, setSimInput] = useState('');

  const handleSimSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simInput.trim()) return;

    const userText = simInput.trim();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    setSimMessages((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setSimInput('');

    // Automated smart agent response simulation
    setTimeout(() => {
      const repliesFr = [
        'Votre demande a été enregistrée. Notre agent IA peut évaluer l’urgence, enregistrer vos données dans le CRM et vous orienter vers l’architecte adéquat.',
        'Bien compris. Souhaitez-vous recevoir un audit préliminaire par e-mail ou réserver un appel stratégique de 15 minutes ?',
        'Excellente question. Nos agents sont entraînés exclusivement sur vos documentations et protocoles, garantissant 0 hallucination.',
      ];
      const repliesEn = [
        'I have recorded your request. Our AI agent can instantly score lead priority, update your CRM, and connect you with a digital architect.',
        'Understood. Would you prefer an executive technical report sent by email or a 15-minute diagnostic walkthrough?',
        'Great question. Our agents are strictly grounded on your proprietary manuals and FAQs, ensuring 100% truthful, hallucination-free answers.',
      ];
      const repliesEs = [
        'He registrado tu consulta. Nuestro agente de IA puede clasificar la urgencia, guardar tus datos en el CRM y derivarte al especialista adecuado al instante.',
        'Entendido. ¿Prefieres que te enviemos un informe preliminar por correo o prefieres que agendemos una llamada de valoración técnica?',
        'Excelente pregunta. La ventaja de nuestros agentes es que se entrenan con tus propios manuales y FAQs, garantizando respuestas 100% certeras sin alucinaciones.',
      ];
      const replies = language === 'fr' ? repliesFr : language === 'en' ? repliesEn : repliesEs;
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSimMessages((prev) => [...prev, { sender: 'agent', text: randomReply, time: replyTime }]);
    }, 700);
  };

  const benefits = [
    {
      icon: Bot,
      title: t.aiAgents.feature1Title,
      summary: language === 'fr' ? 'Agents conversationnels 24h/24 qualifiant vos prospects.' : language === 'en' ? 'Smart chatbots resolving inquiries and capturing leads 24/7.' : 'Chatbots que responden preguntas y captan leads 24/7.',
      detail: t.aiAgents.feature1Desc,
      metric: 'Response < 1.5s · 24/7/365',
    },
    {
      icon: Workflow,
      title: t.aiAgents.feature2Title,
      summary: language === 'fr' ? 'Gagnez du temps avec des flux opérationnels automatisés.' : language === 'en' ? 'Save hours each week with autonomous CRM & database workflows.' : 'Ahorra tiempo con flujos de trabajo automáticos.',
      detail: t.aiAgents.feature2Desc,
      metric: language === 'fr' ? '+15h gagnées / semaine' : language === 'en' ? '+15 hrs saved weekly' : '+15 hrs semanales ahorradas',
    },
    {
      icon: Headphones,
      title: t.aiAgents.feature3Title,
      summary: language === 'fr' ? 'Résolution immédiate et prise de rendez-vous sans friction.' : language === 'en' ? 'Human-grade natural language parsing for instant bookings.' : 'Resuelve dudas y agenda citas sin intervención humana.',
      detail: t.aiAgents.feature3Desc,
      metric: language === 'fr' ? '85% résolu dès le 1er contact' : language === 'en' ? '85% first-contact resolution' : '85% resolución en primer contacto',
    },
    {
      icon: Mail,
      title: language === 'fr' ? 'Intégration WhatsApp & E-mail' : language === 'en' ? 'WhatsApp & Email Cloud Integration' : 'Integración con WhatsApp y email',
      summary: language === 'fr' ? 'Communiquez avec vos clients sur leurs canaux favoris.' : language === 'en' ? 'Engage clients directly where they already are.' : 'Comunica con tus clientes donde estén.',
      detail: language === 'fr'
        ? 'Déployez votre agent avec l’API officielle WhatsApp Business Cloud, un widget web et des séquences d’e-mails intelligentes.'
        : language === 'en'
        ? 'Deploy your AI agent across official WhatsApp Business Cloud API, website chat and automated email follow-up sequences.'
        : 'Despliega tu agente con la API oficial de WhatsApp Business, bandeja de entrada web y secuencias de correo electrónico automatizadas.',
      metric: language === 'fr' ? 'Omnicanal unifié' : language === 'en' ? 'Unified Omnichannel' : 'Omnicanalidad centralizada',
    },
    {
      icon: Sliders,
      title: language === 'fr' ? 'Personnalisation Sur-Mesure' : language === 'en' ? 'Total Brand Customization' : 'Personalización total',
      summary: language === 'fr' ? 'L’IA adaptée fidèlement aux exigences de votre entreprise.' : language === 'en' ? 'Fine-tuned to your tone of voice and technical catalogs.' : 'Adaptamos la IA a las necesidades de tu negocio.',
      detail: language === 'fr'
        ? 'Nous entraînons l’agent sur vos documentations techniques, votre grille tarifaire, votre identité de marque et vos règles de confidentialité.'
        : language === 'en'
        ? 'We ground the model in your service catalog, corporate voice, pricing models, and strict zero-trust data protection policies.'
        : 'Entrenamos al agente con tu catálogo de servicios, tono de marca, políticas de precios y protocolos de seguridad estrictos.',
      metric: language === 'fr' ? '100% sur-mesure' : language === 'en' ? '100% Bespoke' : '100% a medida de tu marca',
    },
  ];

  return (
    <section
      id="agentes-ia"
      className="py-24 bg-[#080C17] relative border-t border-b border-gray-800/80 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#0066FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#F5A623]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#0066FF] font-mono text-xs uppercase tracking-wider">
            <Bot className="w-3.5 h-3.5 text-[#F5A623]" />
            <span>{t.aiAgents.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            {t.aiAgents.title} <span className="text-[#0066FF]">{t.aiAgents.titleHighlight}</span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            {t.aiAgents.subtitle}
          </p>
        </div>

        {/* Core Layout: The 5 Capabilities (Left) + Interactive Live Agent Demonstration (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          
          {/* Left Column: The 5 Benefits */}
          <div className="lg:col-span-7 space-y-3.5">
            {benefits.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#0C1326]/90 border border-gray-800/90 hover:border-[#0066FF]/50 transition-all duration-300 group shadow-md"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center shrink-0 group-hover:bg-[#0066FF]/20 group-hover:scale-105 transition-all">
                      <IconComp className="w-5 h-5 text-[#0066FF] group-hover:text-[#F5A623] transition-colors" />
                    </div>

                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{item.title}</span>
                        </h3>
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#0066FF]">
                          {item.metric}
                        </span>
                      </div>

                      <div className="text-xs font-mono font-medium text-[#F5A623]">
                        {item.summary}
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Agent Simulator */}
          <div className="lg:col-span-5">
            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-[#0066FF]/40 bg-[#0E1528] shadow-2xl relative flex flex-col h-[560px]">
              
              {/* Agent Status Bar */}
              <div className="flex items-center justify-between pb-3.5 border-b border-gray-800">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066FF] to-[#004ECC] flex items-center justify-center text-white">
                      <Bot className="w-4 h-4" />
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0E1528]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                      <span>Dexvoi AI Agent</span>
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-normal">
                        {language === 'fr' ? 'EN LIGNE' : language === 'en' ? 'ONLINE' : 'EN LÍNEA'}
                      </span>
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono">
                      {language === 'fr' ? 'Modèle spécialisé · RAG Entreprise' : language === 'en' ? 'Specialized Engine · Corporate RAG' : 'Modelo especializado · RAG Corporativo'}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131B33] text-gray-300 border border-gray-700">
                  {language === 'fr' ? 'LATENCE: 120ms' : language === 'en' ? 'LATENCY: 120ms' : 'LATENCIA: 120ms'}
                </span>
              </div>

              {/* Channel Selector Pills */}
              <div className="grid grid-cols-3 gap-1.5 py-3 border-b border-gray-800/80 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveDemoTab('whatsapp')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeDemoTab === 'whatsapp'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold'
                      : 'text-gray-400 hover:text-white bg-[#131B33]/60'
                  }`}
                >
                  <MessageSquare className="w-3 h-3" />
                  <span>WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDemoTab('web')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeDemoTab === 'web'
                      ? 'bg-[#0066FF]/20 text-[#0066FF] border border-[#0066FF]/40 font-bold'
                      : 'text-gray-400 hover:text-white bg-[#131B33]/60'
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  <span>Web Chat</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveDemoTab('workflow')}
                  className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeDemoTab === 'workflow'
                      ? 'bg-[#F5A623]/20 text-[#F5A623] border border-[#F5A623]/40 font-bold'
                      : 'text-gray-400 hover:text-white bg-[#131B33]/60'
                  }`}
                >
                  <Workflow className="w-3 h-3" />
                  <span>CRM Flow</span>
                </button>
              </div>

              {/* Chat Simulation Conversation Feed */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3 font-mono text-xs pr-1">
                {simMessages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-3.5 py-2.5 leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#0066FF] text-white rounded-br-none'
                          : 'bg-[#131B33] text-gray-200 border border-gray-700/80 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-gray-500 mt-1 px-1">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fast Prompt Suggestions */}
              <div className="flex flex-wrap gap-1.5 py-2 border-t border-gray-800/80 text-[10px] font-mono">
                <button
                  type="button"
                  onClick={() => {
                    setSimInput(language === 'fr' ? 'Pouvez-vous connecter l’assistant avec WhatsApp et Google Agenda ?' : language === 'en' ? 'Can you integrate this agent with WhatsApp and Google Calendar?' : '¿Podéis integrar el asistente con mi WhatsApp y Google Calendar?');
                  }}
                  className="px-2 py-1 rounded bg-[#131B33] hover:bg-[#1C2744] text-gray-300 hover:text-white border border-gray-700 transition-colors cursor-pointer"
                >
                  📅 {language === 'fr' ? '« WhatsApp + Agenda ? »' : language === 'en' ? '"WhatsApp + Calendar sync?"' : '"¿Integración WhatsApp + Calendar?"'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSimInput(language === 'fr' ? 'Comment l’agent évite-t-il les réponses erronées ou fausses ?' : language === 'en' ? 'How does the agent avoid hallucinations or wrong pricing?' : '¿Cómo evita el agente respuestas falsas o errores?');
                  }}
                  className="px-2 py-1 rounded bg-[#131B33] hover:bg-[#1C2744] text-gray-300 hover:text-white border border-gray-700 transition-colors cursor-pointer"
                >
                  🛡️ {language === 'fr' ? '« Zéro hallucination ? »' : language === 'en' ? '"Zero hallucinations?"' : '"¿Cómo evita alucinaciones?"'}
                </button>
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSimSend} className="flex gap-2 pt-2 border-t border-gray-800">
                <input
                  type="text"
                  value={simInput}
                  onChange={(e) => setSimInput(e.target.value)}
                  placeholder={language === 'fr' ? 'Posez une question à l’agent de test...' : language === 'en' ? 'Type a question for the live demo agent...' : 'Escribe una pregunta al agente de prueba...'}
                  className="flex-1 bg-[#131B33] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#0066FF]"
                />
                <button
                  type="submit"
                  disabled={!simInput.trim()}
                  className="px-3.5 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0055DD] text-white transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* Value Proposition Callout Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0C1630] via-[#101F42] to-[#0C1630] border border-[#0066FF]/40 shadow-xl mb-12 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#F5A623]/20 border border-[#F5A623]/40 text-[#F5A623] font-mono text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'INGÉNIERIE IA SUR MESURE' : language === 'en' ? 'BESPOKE AI ENGINEERING' : 'INGENIERÍA DE IA A MEDIDA'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              {language === 'fr' ? 'Nous concevons des solutions IA sur-mesure pour votre entreprise.' : language === 'en' ? 'We build custom AI agent architectures tailored to your business.' : 'Desarrollamos soluciones de IA personalizadas para tu negocio.'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              {language === 'fr'
                ? 'De la modélisation du flux et l’indexation de vos connaissances jusqu’à l’intégration avec vos logiciels CRM et le suivi régulier.'
                : language === 'en'
                ? 'From conversational workflow mapping and knowledge vectorization to enterprise database APIs and continuous monitoring.'
                : 'Desde la conceptualización del flujo y la ingesta de tus bases de conocimiento hasta la integración con tus bases de datos, pasarelas de pago y soporte continuo.'}
            </p>
          </div>

          <button
            type="button"
            id="btn-descubre-mas-ia"
            onClick={() => setIsDetailModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#004ECC] hover:from-[#0055DD] hover:to-[#003EA8] text-white font-mono text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] transition-all duration-300 group cursor-pointer whitespace-nowrap"
          >
            <span>🔗 {t.aiAgents.cta}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* "Descubre Más" Comprehensive AI Agents Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0E1528] border border-[#0066FF]/50 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-gray-800 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#0066FF] font-mono text-[11px] font-bold">
                  <Bot className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>DEXVOI AI SUITE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                  {t.aiAgents.title} {t.aiAgents.titleHighlight}
                </h3>
                <p className="text-xs text-gray-400">
                  {t.aiAgents.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDetailModalOpen(false)}
                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Architecture Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <Database className="w-4 h-4 text-[#0066FF]" />
                  <span>{language === 'fr' ? 'RAG avec Données Privées' : language === 'en' ? 'Enterprise Grounded RAG' : 'RAG con Datos Corporativos'}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'fr'
                    ? 'Nous connectons l’IA à vos documentations, tarifs et manuels pour garantir des réponses certifiées sans fausses affirmations.'
                    : language === 'en'
                    ? 'Ground your model on internal docs, service catalogs, and pricing sheets to deliver 100% accurate responses with zero guesswork.'
                    : 'Conectamos la IA a tus manuales de producto, FAQs, inventarios y políticas internas para garantizar respuestas fidedignas con cero invenciones.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Business Cloud API</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'fr'
                    ? 'Intégration officielle certifiée avec WhatsApp : servez des centaines de prospects simultanément depuis un numéro vérifié.'
                    : language === 'en'
                    ? 'Verified official WhatsApp Cloud API integration: serve hundreds of prospects concurrently with your official business number.'
                    : 'Integración oficial verificada con WhatsApp: atiende a miles de usuarios concurrentes de forma personalizada desde un solo número corporativo.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <Workflow className="w-4 h-4 text-[#F5A623]" />
                  <span>{language === 'fr' ? 'Appel de Fonctions & Actions' : language === 'en' ? 'Autonomous Function Calling' : 'Llamada a Funciones & Acciones'}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'fr'
                    ? 'L’agent ne fait pas que chatter : il crée des créneaux dans l’agenda, envoie des devis, transmet des e-mails et met à jour votre CRM.'
                    : language === 'en'
                    ? 'The agent acts directly: books appointments, creates CRM opportunities, generates invoices, and schedules automatic follow-ups.'
                    : 'El agente no solo responde texto: puede crear citas en el calendario, emitir presupuestos, enviar correos y registrar oportunidades en tu CRM.'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>{language === 'fr' ? 'Confidentialité & RGPD Blindé' : language === 'en' ? 'Hardened GDPR & Privacy' : 'Privacidad & RGPD Blindado'}</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {language === 'fr'
                    ? 'Vos données confidentielles ne servent jamais à entraîner des modèles publics. Hébergement UE et chiffrement de bout en bout.'
                    : language === 'en'
                    ? 'Your private business data is never used to train public LLMs. European Union servers with full end-to-end encryption.'
                    : 'Tus datos empresariales nunca se utilizan para reentrenar modelos públicos. Servidores en la Unión Europea y cifrado de extremo a extremo.'}
                </p>
              </div>

            </div>

            {/* Implementation Checklist */}
            <div className="p-4 rounded-xl bg-[#131B33]/60 border border-gray-800 space-y-3">
              <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                {language === 'fr' ? 'Étapes du Déploiement Dexvoi :' : language === 'en' ? 'Dexvoi Deployment Roadmap:' : 'Fases del Despliegue con Dexvoi:'}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? '1. Audit des processus & questions fréquentes' : language === 'en' ? '1. Workflow and FAQ business audit' : '1. Auditoría de flujos y procesos clave'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? '2. Ingestion et vectorisation documentaire' : language === 'en' ? '2. Documentation vectorization & RAG setup' : '2. Ingesta y vectorización de documentación'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? '3. Connexion des APIs (CRM, Calendrier, ERP)' : language === 'en' ? '3. API integration (CRM, Calendar, ERP)' : '3. Conexión de APIs (CRM, ERP, Calendario)'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? '4. Tests de sécurité et blindage des invites' : language === 'en' ? '4. Security testing & prompt firewalling' : '4. Pruebas de seguridad y blindaje de prompts'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? '5. Déploiement omnicanal en production' : language === 'en' ? '5. Omnichannel live production deployment' : '5. Despliegue en producción omnicanal'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{language === 'fr' ? '6. Monitoring permanent et amélioration continue' : language === 'en' ? '6. Continuous monitoring & accuracy fine-tuning' : '6. Monitorización continua y mejora de precisión'}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
              <div className="text-xs font-mono text-gray-400 text-center sm:text-left">
                {language === 'fr' ? 'Discutons de l’automatisation de votre activité avec l’IA :' : language === 'en' ? 'Ready to automate key operational bottlenecks with AI?' : '¿Hablamos sobre cómo automatizar tu negocio con IA?'}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    if (onContactClick) onContactClick();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  {t.nav.contact}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    onOpenAuditModal();
                  }}
                  className="w-full sm:w-auto metallic-btn px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                  <span>{t.pricing.freeAuditBtn}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

