import Group from "@/types/Group";
import {
  DemoUser,
  DemoUserB,
  AbsentUser,
  NotUser,
  JBOK,
  MYKANG,
  SUHWPARK,
  JAEYOJUN,
  JNAM,
  JONHAN,
} from "./DemoUser";

const DemoGroup: Group = {
  name: "42seoul",
  id: 1,
  users: [
    JAEYOJUN,
    JBOK,
    JNAM,
    JONHAN,
    MYKANG,
    SUHWPARK,
    DemoUser,
    DemoUserB,
    AbsentUser,
    NotUser,
  ],
  isInEdit: false,
};

export default DemoGroup;
