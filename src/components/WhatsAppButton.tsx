import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5511975858999?text=" + encodeURIComponent("Olá! Gostaria de saber mais sobre os eventos da JR Inovações.");

const WhatsAppButton = () => {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-float"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
};

export default WhatsAppButton;
