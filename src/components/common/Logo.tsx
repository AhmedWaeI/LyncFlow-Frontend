interface LogoProps {
  src: string;
  alt?: string;
  height?: number;
  className?: string;
}

export default function Logo({ src, alt = "LynkFlow", height = 22, className = "" }: LogoProps) {
  return <img src={src} alt={alt} style={{ height }} className={className} />;
}
