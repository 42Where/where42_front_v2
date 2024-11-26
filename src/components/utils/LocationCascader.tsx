import React from 'react';
import { Button } from '@/components/ui/button';

interface CascaderOption {
  label: string;
  value: string;
  children?: CascaderOption[];
}

const DefaultCustomLocation: CascaderOption = {
  label: '개포',
  value: '개포',
  children: [
    {
      label: '지하',
      value: '지하',
    },
    {
      label: '1층',
      value: '1층',
      children: [
        { label: '오픈스튜디오', value: '오픈스튜디오' },
        { label: '회의실', value: '회의실' },
      ],
    },
    {
      label: '2층',
      value: '2층',
      children: [
        {
          label: '1클러스터',
          value: 'c1',
          children: [
            { label: '회의실', value: '회의실' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: '2클러스터',
          value: 'c2',
          children: [
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
      ],
    },
    {
      label: '3층',
      value: '3층',
      children: [
        {
          label: 'x1클러스터',
          value: 'cx1',
          children: [
            { label: '회의실', value: '회의실' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: 'x2클러스터',
          value: 'cx2',
          children: [
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
      ],
    },
    {
      label: '4층',
      value: '4층',
      children: [
        {
          label: '3클러스터',
          value: 'c3',
          children: [
            { label: '회의실', value: '회의실' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: '4클러스터',
          value: 'c4',
          children: [
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
      ],
    },
    {
      label: '5층',
      value: '5층',
      children: [
        {
          label: '5클러스터',
          value: 'c5',
          children: [
            { label: '집현전', value: '집현전' },
            { label: '테이블', value: '테이블' },
            { label: '테라스', value: '테라스' },
          ],
        },
        {
          label: '6클러스터',
          value: '개포 5층 c6',
          children: [
            { label: '테이블', value: '개포 5층 c6 테이블' },
            { label: '테라스', value: '개포 5층 c6 테라스' },
          ],
        },
      ],
    },
    { label: '옥상', value: '옥상' },
  ],
};

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
  return (
    <Button
      className={`w-24 gap-2 rounded-lg px-3 py-1 text-base md:w-32  md:text-xl ${
        selected
          ? 'bg-darkblue text-white hover:bg-gray-700'
          : 'border-2 border-darkblue bg-white text-darkblue hover:bg-gray-200'
      } border-0 border-darkblue`}
      onClick={() => {
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
      }}
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
  const [selected, setSelected] = React.useState<string>('');
  const [rounded, setRounded] = React.useState<string>('rounded-lg');

  React.useEffect(() => {
    if (optionList.length === 1) setRounded('rounded-lg');
    else if (index === 0) setRounded('rounded-l-lg');
    else if (
      index === optionList.length - 1 ||
      !optionList[optionList.length - 1].children
    ) {
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
  const [optionList, setOptionList] = React.useState<CascaderOption[]>([data]);
  const result = optionList.map((item) => item.label).join(' ');
  React.useEffect(() => {
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
