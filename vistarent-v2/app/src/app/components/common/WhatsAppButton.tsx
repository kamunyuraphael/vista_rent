import { MessageCircle } from "lucide-react";

// Placeholder number — matches the one already shown in the Footer and Fleet
// page. Swap for the real WhatsApp Business number before launch.
const WHATSAPP_NUMBER = "254700123456";
const DEFAULT_MESSAGE = "Hi VistaRent, I'd like to know more about your fleet.";

function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(DEFAULT_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with VistaRent on WhatsApp"
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform duration-150"
    >
      <MessageCircle size={26} fill="currentColor" className="text-white" strokeWidth={0} />
    </a>
  );
}
