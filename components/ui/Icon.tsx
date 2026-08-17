import {
  Beef,
  GlassWater,
  HeartHandshake,
  Leaf,
  Nut,
  PackageOpen,
  Recycle,
  Sprout,
  TreeDeciduous,
  type LucideIcon,
} from "lucide-react";

/**
 * The icon registry.
 *
 * Data files store an icon by name rather than importing a component, so the
 * mock data stays serialisable. Keeping the registry explicit — instead of
 * indexing all of lucide by string — means an unknown name is a type error
 * rather than a blank space at runtime.
 */
export const icons = {
  Beef,
  GlassWater,
  HeartHandshake,
  Leaf,
  Nut,
  PackageOpen,
  Recycle,
  Sprout,
  TreeDeciduous,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function Icon({
  name,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Glyph = icons[name];
  return <Glyph className={className} strokeWidth={strokeWidth} aria-hidden />;
}
