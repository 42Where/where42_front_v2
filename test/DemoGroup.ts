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
  groupId: 1,
  groupName: "42seoul",
  members: [
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
  isFolded: true,
};

export default DemoGroup;
