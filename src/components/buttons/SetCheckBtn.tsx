import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCheckedStore } from '@/lib/stores';

export default function SetCheckBtn() {
  const { checked, setChecked } = useCheckedStore();

  useEffect(() => {
    if (localStorage.getItem('checked') === 'true') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [setChecked]);

  return (
    <Button
      className="text-l h-8 w-40 gap-1 rounded-full
     border-2 border-darkblue bg-white
     p-2 text-darkblue hover:bg-gray-200  lg:h-10 lg:w-52 lg:gap-2 lg:p-4 lg:text-xl"
      onClick={() => {
        setChecked(!checked);
        localStorage.setItem('checked', JSON.stringify(!checked));
      }}
    >
      <Checkbox checked={checked} className="size-4 border-2" size={12} />
      출근한 친구만 보기
    </Button>
  );
}
