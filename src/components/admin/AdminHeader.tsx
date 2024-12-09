import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function AdminHeader({
  isDelete,
  setIsDelete,
}: {
  isDelete: boolean;
  setIsDelete: (value: boolean) => void;
}) {
  const current = isDelete ? '삭제' : '추가';
  return (
    <header className="flex flex-row items-center justify-center p-1">
      <h3 className="w-full text-xl text-darkblue">전체 공지사항 조회</h3>
      <div className="flex w-full flex-row items-center justify-between">
        <h3 className="border-l-2 border-darkblue pl-2 text-xl text-darkblue">
          공지사항 {current}
        </h3>
        <div className="flex flex-row items-center gap-2">
          <Label htmlFor="toggle-delete-mode">{current}</Label>
          <Switch
            id="toggle-delete-mode"
            onCheckedChange={() => setIsDelete(!isDelete)}
            className="data-[state=checked]:bg-red-500"
          />
        </div>
      </div>
    </header>
  );
}
