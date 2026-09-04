import React, { useState } from 'react';
import {
  Bot,
  Cpu,
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
  UserCheck,
  ShieldCheck,
  Database,
  Check
} from 'lucide-react';

interface AiAgentsSectionProps {
  onOpenAuditModal: () => void;
  onContactClick?: () => void;
}

export const AiAgentsSection: React.FC<AiAgentsSectionProps> = ({
  onOpenAuditModal,
  onContactClick,
}) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState<'whatsapp' | 'web' | 'workflow'>('whatsapp');
  
  // Interactive mini-simulator conversation state
  const [simMessages, setSimMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string; time: string }>>([
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
  ]);
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
      const replies = [
        'He registrado tu consulta. Nuestro agente de IA puede clasificar la urgencia, guardar tus datos en el CRM y derivarte al especialista adecuado al instante.',
        'Entendido. ¿Prefieres que te enviemos un informe preliminar por correo o prefieres que agendemos una llamada de valoración técnica?',
        'Excelente pregunta. La ventaja de nuestros agentes es que se entrenan con tus propios manuales y FAQs, garantizando respuestas 100% certeras sin alucinaciones.',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setSimMessages((prev) => [...prev, { sender: 'agent', text: randomReply, time: replyTime }]);
    }, 700);
  };

  const benefits = [
    {
      icon: Bot,
      title: 'Asistentes virtuales',
      summary: 'Chatbots que responden preguntas y captan leads 24/7.',
      detail: 'Atiende a cualquier visitante en milisegundos. Califica prospectos, recopila datos de contacto y responde consultas frecuentes sin descanso.',
      metric: 'Respuesta < 1.5s · 24/7/365',
    },
    {
      icon: Workflow,
      title: 'Automatización de procesos',
      summary: 'Ahorra tiempo con flujos de trabajo automáticos.',
      detail: 'Conecta tus herramientas (CRM, ERP, hojas de cálculo, calendarios y pasarelas de pago) para que los datos viajen sin intervención manual.',
      metric: '+15 hrs semanales ahorradas',
    },
    {
      icon: Headphones,
      title: 'Atención al cliente inteligente',
      summary: 'Resuelve dudas y agenda citas sin intervención humana.',
      detail: 'Comprende el lenguaje natural con precisión humana. Resuelve problemas comunes y coordina la agenda de tu equipo de forma autónoma.',
      metric: '85% resolución en primer contacto',
    },
    {
      icon: Mail,
      title: 'Integración con WhatsApp y email',
      summary: 'Comunica con tus clientes donde estén.',
      detail: 'Despliega tu agente con la API oficial de WhatsApp Business, bandeja de entrada web y secuencias de correo electrónico automatizadas.',
      metric: 'Omnicanalidad centralizada',
    },
    {
      icon: Sliders,
      title: 'Personalización total',
      summary: 'Adaptamos la IA a las necesidades de tu negocio.',
      detail: 'Entrenamos al agente con tu catálogo de servicios, tono de marca, políticas de precios y protocolos de seguridad estrictos.',
      metric: '100% a medida de tu marca',
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
            <span>INTELIGENCIA ARTIFICIAL APLICADA A NEGOCIOS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            🤖 AGENTES AVANZADOS CON IA
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Lleva tu negocio al siguiente nivel con asistentes virtuales y automatizaciones inteligentes.
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
                        EN LÍNEA
                      </span>
                    </h4>
                    <p className="text-[10px] text-gray-400 font-mono">
                      Modelo especializado · RAG Corporativo
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131B33] text-gray-300 border border-gray-700">
                  LATENCIA: 120ms
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
                    setSimInput('¿Podéis integrar el asistente con mi WhatsApp y Google Calendar?');
                  }}
                  className="px-2 py-1 rounded bg-[#131B33] hover:bg-[#1C2744] text-gray-300 hover:text-white border border-gray-700 transition-colors"
                >
                  📅 "¿Integración WhatsApp + Calendar?"
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSimInput('¿Cómo evita el agente respuestas falsas o errores?');
                  }}
                  className="px-2 py-1 rounded bg-[#131B33] hover:bg-[#1C2744] text-gray-300 hover:text-white border border-gray-700 transition-colors"
                >
                  🛡️ "¿Cómo evita alucinaciones?"
                </button>
              </div>

              {/* Chat Input Field */}
              <form onSubmit={handleSimSend} className="flex gap-2 pt-2 border-t border-gray-800">
                <input
                  type="text"
                  value={simInput}
                  onChange={(e) => setSimInput(e.target.value)}
                  placeholder="Escribe una pregunta al agente de prueba..."
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
              <span>INGENIERÍA DE IA A MEDIDA</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
              Desarrollamos soluciones de IA personalizadas para tu negocio.
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-2xl">
              Desde la conceptualización del flujo y la ingesta de tus bases de conocimiento hasta la integración con tus bases de datos, pasarelas de pago y soporte continuo.
            </p>
          </div>

          <button
            type="button"
            id="btn-descubre-mas-ia"
            onClick={() => setIsDetailModalOpen(true)}
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#004ECC] hover:from-[#0055DD] hover:to-[#003EA8] text-white font-mono text-sm uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(0,102,255,0.4)] hover:shadow-[0_0_35px_rgba(0,102,255,0.6)] transition-all duration-300 group cursor-pointer whitespace-nowrap"
          >
            <span>🔗 DESCUBRE MÁS</span>
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
                  Agentes Avanzados con Inteligencia Artificial
                </h3>
                <p className="text-xs text-gray-400">
                  Automatizaciones cognitivas que liberan a tu equipo del trabajo repetitivo y multiplican tus conversiones comerciales.
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
                  <span>RAG con Datos Corporativos</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Conectamos la IA a tus manuales de producto, FAQs, inventarios y políticas internas para garantizar respuestas fidedignas con cero invenciones.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Business Cloud API</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Integración oficial verificada con WhatsApp: atiende a miles de usuarios concurrentes de forma personalizada desde un solo número corporativo.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <Workflow className="w-4 h-4 text-[#F5A623]" />
                  <span>Llamada a Funciones & Acciones</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  El agente no solo responde texto: puede crear citas en el calendario, emitir presupuestos, enviar correos y registrar oportunidades en tu CRM.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#070B16] border border-gray-800 space-y-2">
                <div className="flex items-center gap-2 text-white font-mono font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Privacidad & RGPD Blindado</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Tus datos empresariales nunca se utilizan para reentrenar modelos públicos. Servidores en la Unión Europea y cifrado de extremo a extremo.
                </p>
              </div>

            </div>

            {/* Implementation Checklist */}
            <div className="p-4 rounded-xl bg-[#131B33]/60 border border-gray-800 space-y-3">
              <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider">
                Fases del Despliegue con Dexvoi:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-300">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. Auditoría de flujos y procesos clave</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Ingesta y vectorización de documentación</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>3. Conexión de APIs (CRM, ERP, Calendario)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>4. Pruebas de seguridad y blindaje de prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>5. Despliegue en producción omnicanal</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>6. Monitorización continua y mejora de precisión</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-800">
              <div className="text-xs font-mono text-gray-400 text-center sm:text-left">
                ¿Hablamos sobre cómo automatizar tu negocio con IA?
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
                  Hablar con un Especialista
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
                  <span>Solicitar Propuesta de IA</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
