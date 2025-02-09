import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CascaderOption } from '@/types/CascaderOption';
import { CustomLocationSchema } from '@/lib/schemas';

type SingleCascaderProps = {
  prevVal: string;
  data: CascaderOption;
  optionList: CascaderOption[];
  setOptionList: (state: CascaderOption[]) => void;
  isSelected: boolean;
  setSelected: (state: string) => void;
};

function SingleCascader({
  prevVal,
  data,
  optionList,
  setOptionList,
  isSelected,
  setSelected,
}: SingleCascaderProps) {
  function clickHandler() {
    const buf = optionList.slice(0);
    const idx = buf.findIndex((item) => item.value === prevVal);
    if (isSelected) {
      setSelected('');
      buf.splice(idx + 1);
      setOptionList(buf);
      return;
    }
    setSelected(data.value);
    if (idx !== buf.length - 1) buf.splice(idx + 1);
    buf.push(data);
    setOptionList(buf);
  }

  return (
    <Button
      className={`w-24 gap-2 rounded-lg px-3 py-1 text-base md:w-32 md:text-xl ${
        isSelected
          ? 'bg-darkblue text-white hover:bg-gray-700'
          : 'bg-white text-darkblue hover:bg-gray-200'
      }`}
      onClick={() => clickHandler()}
    >
      {data.label}
    </Button>
  );
}

type CascaderColumnProps = {
  item: CascaderOption;
  optionList: CascaderOption[];
  setOptionList: (state: CascaderOption[]) => void;
  index: number;
};

function CascaderColumn({ item, optionList, setOptionList, index }: CascaderColumnProps) {
  const [selected, setSelected] = useState<string>('');
  const [rounded, setRounded] = useState<string>('rounded-lg');

  useEffect(() => {
    if (optionList.length === 1) setRounded('rounded-lg');
    else if (index === 0) setRounded('rounded-l-lg');
    else if (index === optionList.length - 1 || !optionList[optionList.length - 1].children)
      setRounded('rounded-r-lg');
    else setRounded('rounded-none');
  }, [optionList, setRounded, index]);

  return (
    <span className={`flex flex-col border ${rounded}`} key={item.value}>
      {item.children?.map(
        (child) =>
          child.label && (
            <SingleCascader
              key={child.value}
              prevVal={item.value}
              data={child}
              optionList={optionList}
              setOptionList={setOptionList}
              isSelected={selected === child.value}
              setSelected={setSelected}
            />
          ),
      )}
    </span>
  );
}

export default function LocationCascader({
  setLocationValue,
}: {
  setLocationValue: (state: string) => void;
}) {
  const data = CustomLocationSchema;
  const [optionList, setOptionList] = useState<CascaderOption[]>([data]);
  const result = optionList.map((item) => item.label).join(' ');

  useEffect(() => {
    setLocationValue(result);
  }, [result, setLocationValue]);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl">{result}</p>
      <div className="flex flex-row">
        {optionList.map(
          (item, index) =>
            item.children &&
            item.children.length > 1 && (
              <CascaderColumn
                key={item.value}
                item={item}
                optionList={optionList}
                setOptionList={setOptionList}
                index={index}
              />
            ),
        )}
      </div>
    </div>
  );
}
