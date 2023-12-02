import { useCallback, useState } from "react";

const useToggle: (initialState: boolean) => [boolean, () => void] = (
  initialState: boolean
) => {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(
    () => setState((prevState) => !prevState),
    [setState]
  );
  return [state, toggle];
};

export default useToggle;
