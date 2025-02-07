export type CascaderOption = {
  readonly label: string;
  readonly value: string;
  readonly children?: readonly CascaderOption[];
};
