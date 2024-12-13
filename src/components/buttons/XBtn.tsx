import { X } from 'lucide-react';

export default function XBtn({ onClick }: { onClick: () => void }) {
  return <X className="size-6 cursor-pointer" onClick={onClick} />;
}
