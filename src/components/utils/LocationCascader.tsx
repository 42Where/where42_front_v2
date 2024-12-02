import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CascaderOption, DefaultCustomLocation } from '@/types/CascaderOption';

function SingleCascader({
  prevVal,
  data,
  optionList,
  setOptionList,
  selected,
  setSelected,
}: {
  prevVal: string;
  data: CascaderOption;
  optionList: CascaderOption[];
  setOptionList: React.Dispatch<React.SetStateAction<CascaderOption[]>>;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}) {
  function clickHandler() {
    if (selected) {
      setSelected('');
      const temp = optionList.slice(0);
      const idx = temp.findIndex((item) => item.value === prevVal);
      temp.splice(idx + 1);
      setOptionList(temp);
      return;
    }
    setSelected(data.value);
    const temp = optionList.slice(0);
    const idx = temp.findIndex((item) => item.value === prevVal);
    if (idx !== temp.length - 1) temp.splice(idx + 1);
    temp.push(data);
    setOptionList(temp);
  }

  return (
    <Button
      className={`w-24 gap-2 rounded-lg px-3 py-1 text-base md:w-32  md:text-xl ${
        selected
          ? 'bg-darkblue text-white hover:bg-gray-700'
          : 'border-2 border-darkblue bg-white text-darkblue hover:bg-gray-200'
      } border-0 border-darkblue`}
      onClick={() => clickHandler}
    >
      {data.label}
    </Button>
  );
}

function CascaderColumn({
  item,
  optionList,
  setOptionList,
  index,
}: {
  item: CascaderOption;
  optionList: CascaderOption[];
  setOptionList: React.Dispatch<React.SetStateAction<CascaderOption[]>>;
  index: number;
}) {
  const [selected, setSelected] = useState<string>('');
  const [rounded, setRounded] = useState<string>('rounded-lg');

  useEffect(() => {
    if (optionList.length === 1) setRounded('rounded-lg');
    else if (index === 0) setRounded('rounded-l-lg');
    else if (index === optionList.length - 1 || !optionList[optionList.length - 1].children) {
      setRounded('rounded-r-lg');
    } else setRounded('rounded-none');
  }, [optionList]);

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
              selected={selected === child.value}
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
  setLocationValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const data = DefaultCustomLocation;
  const [optionList, setOptionList] = useState<CascaderOption[]>([data]);
  const result = optionList.map((item) => item.label).join(' ');
  useEffect(() => {
    setLocationValue(result);
  }, [result]);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl  ">{result}</p>
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
