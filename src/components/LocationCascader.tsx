import React, { useEffect } from 'react';
import { Button } from './ui/button';

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

function CascaderColumn({
  item,
  optionList,
  setOptionList,
}: {
  item: CascaderOption;
  optionList: CascaderOption[];
  setOptionList: React.Dispatch<React.SetStateAction<CascaderOption[]>>;
}) {
  const [selected, setSelected] = React.useState<string>('');
  return (
    <span className='flex flex-col border rounded-r-lg' key={item.value}>
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
          )
      )}
    </span>
  );
}

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
      className={`rounded-lg w-32 ${
        selected
          ? 'bg-[#132743] text-white hover:bg-gray-700'
          : 'bg-white border-2 border-[#132743] text-[#132743] hover:bg-gray-200'
      } border-0 border-[#132743] py-1 px-3 text-xl font-gsansMd gap-2`}
      onClick={() => {
        if (selected) {
          setSelected('');
          const temp = optionList.slice(0);
          const idx = temp.findIndex((item) => item.value === prevVal);
          temp.splice(idx + 1);
          setOptionList(temp);
          return;
        }
        const temp = optionList.slice(0);
        const idx = temp.findIndex((item) => item.value === prevVal);
        if (idx !== temp.length - 1) {
          temp.splice(idx + 1);
        }
        temp.push(data);
        setOptionList(temp);
        setSelected(data.value);
      }}
    >
      {data.label}
    </Button>
  );
}

export default function LocationCascader({
  setSeatValue,
}: {
  setSeatValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const data = DefaultCustomLocation;
  const [optionList, setOptionList] = React.useState<CascaderOption[]>([data]);
  const result = optionList.map((item) => item.label).join(' / ');
  React.useEffect(() => {
    setSeatValue(result);
  }, [result, setSeatValue]);

  return (
    <>
      <p>{result}</p>
      <div className='flex flex-row'>
        {optionList.map(
          (item) =>
            item.children &&
            item.children.length > 1 && (
              <CascaderColumn
                key={item.value}
                item={item}
                optionList={optionList}
                setOptionList={setOptionList}
              />
            )
        )}
      </div>
    </>
  );
}
