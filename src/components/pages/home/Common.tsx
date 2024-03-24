import "./Common.css";

interface TextBlockProps {
  title: string;
  titleLevel: "h2" | "h3";
  align: "left" | "right" | "center";
  customizedCss?: string;
  description?: string;
}

export function TextBlock({
  title,
  titleLevel,
  description,
  align,
  customizedCss,
}: TextBlockProps) {
  const titleCss = `text-block-title ${titleLevel}`;
  return (
    <div className={`text-block ${align} ${customizedCss}`}>
      <h2 className={titleCss}>{title}</h2>
      {description && (
        <div className="text-block-description">{description}</div>
      )}
    </div>
  );
}
