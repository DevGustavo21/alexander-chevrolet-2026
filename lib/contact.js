// Centralized contact helpers so every CTA across the site points to
// the same WhatsApp number with a context-appropriate prefill. Change
// the number in one place and every link updates.
export const WHATSAPP_PHONE = '50557218727';

export function waUrl(message) {
  const base = `https://wa.me/${WHATSAPP_PHONE}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function waVehicleMessage(vehicleName) {
  return `Hola Alexander, vi tu sitio y me interesa el Chevrolet ${vehicleName}. ¿Podrías enviarme más información y una cotización?`;
}

export const WA_MESSAGES = {
  general:
    'Hola Alexander, vi tu sitio y me gustaría conversar sobre las opciones Chevrolet disponibles.',
  catalog:
    'Hola Alexander, me gustaría conocer el catálogo Chevrolet completo y recibir asesoría.',
  financing:
    'Hola Alexander, me interesa una cotización con opciones de financiamiento Chevrolet.',
  community:
    'Hola Alexander, quiero sumarme al círculo de clientes para acceder a unidades y promociones.',
};
