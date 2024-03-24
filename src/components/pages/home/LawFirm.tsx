import { Lawyer } from "../../icons/LawFirm";
import "./LawFirm.css";

export function LawFirm() {
  return (
    <div className="lawfirm">
      <div className="lawfirm-text">Cooperative law firm</div>
      <img src="/img/lawfirm.png" width="350" />
      <div className="lawfirm-lawyer">
        <Lawyer />
      </div>
    </div>
  );
}
