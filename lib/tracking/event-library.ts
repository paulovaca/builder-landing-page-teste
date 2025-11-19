import type { TrackingEventOption } from './types';

export type TrackingBlockType =
  | 'button'
  | 'link'
  | 'form'
  | 'video'
  | 'countdown'
  | 'pricingTable'
  | 'hero'
  | 'custom';

export const EVENT_LIBRARY: Record<TrackingBlockType, TrackingEventOption[]> = {
  button: [
    { value: 'click', label: '👆 Clique' },
    { value: 'purchase', label: '💳 Compra/Pagamento' },
    { value: 'add_to_cart', label: '🛒 Adicionar ao carrinho' },
    { value: 'begin_checkout', label: '🏁 Iniciar checkout' },
    { value: 'sign_up', label: '✍️ Cadastro' },
    { value: 'generate_lead', label: '📧 Gerar lead' },
  ],
  link: [
    { value: 'click', label: '🔗 Clique no link' },
    { value: 'outbound_click', label: '🌐 Link externo' },
    { value: 'file_download', label: '📥 Download de arquivo' },
  ],
  form: [
    { value: 'form_start', label: '▶️ Início do formulário' },
    { value: 'form_submit', label: '📨 Envio do formulário' },
    { value: 'generate_lead', label: '📧 Gerar lead' },
  ],
  video: [
    { value: 'video_start', label: '▶️ Início do vídeo' },
    { value: 'video_progress', label: '⏩ Progresso do vídeo' },
    { value: 'video_complete', label: '✅ Vídeo completo' },
  ],
  countdown: [
    { value: 'countdown_view', label: '👁️ Visualização' },
    { value: 'countdown_end', label: '⏰ Fim da contagem' },
  ],
  pricingTable: [
    { value: 'view_item_list', label: '🧾 Visualizar planos' },
    { value: 'select_item', label: '✅ Selecionar plano' },
  ],
  hero: [
    { value: 'view_promotion', label: '🎯 Visualização do banner' },
    { value: 'cta_click', label: '✨ Clique no CTA' },
  ],
  custom: [{ value: 'custom_event', label: '✨ Evento personalizado' }],
};
