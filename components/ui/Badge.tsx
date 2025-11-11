import { cn } from "@/lib/utils";
export default function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-pb-lilac/50 text-pb-grape", className)}>{children}</span>;
}
