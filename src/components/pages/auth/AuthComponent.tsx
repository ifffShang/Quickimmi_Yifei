import { Logo } from "../../icons/Logo";
import "./AuthComponent.css";

export interface SignInProps {
  formHeader: string;
  form: React.ReactNode;
  actions: React.ReactNode;
  error: React.ReactNode;
  bottomTop: React.ReactNode;
  bottomBottom: React.ReactNode;
}

export function AuthComponent(props: SignInProps) {
  return (
    <div className="auth-container signin">
      <div className="auth-brand">
        <Logo />
      </div>

      <div className="auth-form">
        <div className="auth-title">{props.formHeader}</div>
        {props.form}
        <div className="auth-actions">{props.actions}</div>
        {props.error}
      </div>

      <div className="auth-bottom single-line">
        <div className="auth-bottom-top">{props.bottomTop}</div>
        {props.bottomBottom}
      </div>
    </div>
  );
}
