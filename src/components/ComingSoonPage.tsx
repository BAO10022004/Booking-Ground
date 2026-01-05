import { Construction } from "lucide-react";
import "../assets/styles/ComingSoonPage.css";

interface ComingSoonPageProps {
  title?: string;
  message?: string;
}

export default function ComingSoonPage({
  title = "Tính năng đang phát triển",
  message = "Chức năng này đang được phát triển và sẽ sớm có mặt.",
}: ComingSoonPageProps = {}) {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-content">
        <Construction className="coming-soon-icon" size={64} />
        <h2 className="coming-soon-title">{title}</h2>
        <p className="coming-soon-message">{message}</p>
      </div>
    </div>
  );
}
