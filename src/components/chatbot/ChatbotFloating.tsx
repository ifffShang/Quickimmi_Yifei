import { BrandQ } from "../icons/Logo";
import "./ChatbotFloating.css";

export function ChatbotFloating() {
  return (
    <div className="chatbot-floating">
      <div className="chatbot-floating-wrapper">
        <div className="chatbot-floating-content">
          <div className="chatbot-floating-button">
            <BrandQ />
          </div>
          Ask AI
        </div>
      </div>
    </div>
  );
}
