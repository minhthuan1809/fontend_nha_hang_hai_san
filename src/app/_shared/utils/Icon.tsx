import * as LucideIcons from "lucide-react";

interface IconProps {
  icon?: string;
  className?: string;
  size?: number;
}

export default function Icon({ icon, className, size }: IconProps) {
  const IconComponent = icon ? (LucideIcons as any)[icon] : null;
  return IconComponent ? (
    <IconComponent className={className} size={size} />
  ) : (
    <span className="text-xl text-red-500">lỗi Icon</span>
  );
}
