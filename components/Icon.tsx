import React from 'react';
import * as LucideIcons from 'lucide-react';

interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
  name: string;
  className?: string;
}

export function Icon({ name, className, ...props }: IconProps) {
  // Convert kabob-case or lowercase string to PascalCase used by Lucide
  // e.g. "shield-alert" -> "ShieldAlert", "file-text" -> "FileText"
  const pascalName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  // Resolve the component dynamically from LucideIcons
  const IconComponent = (LucideIcons as any)[pascalName] || LucideIcons.HelpCircle;

  return <IconComponent className={className} {...props} />;
}
