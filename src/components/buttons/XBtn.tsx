import { X } from 'lucide-react';

export function XBtn({ onClick }: { onClick: () => void }) {
  return <X className="size-6 cursor-pointer" onClick={onClick} />;
}
