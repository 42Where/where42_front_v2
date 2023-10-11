import User from "@/types/User";

export const DemoUser: User = {
  login: "lorem",
  profileImgSrc:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
  location: "개포 어딘가",
  comment: "프론트하지마세요체질이라는게바",
  locationUsageAgreement: true,
  isFriend: true,
};

export const DemoUserB: User = {
  login: "ipsum",
  profileImgSrc:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
  location: "개포 2층 c2r3s8",
  comment: "프론트하지마세요체질이라는게바",
  locationUsageAgreement: true,
  isFriend: false,
};

export const AbsentUser: User = {
  login: "abesnt",
  profileImgSrc:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
  location: undefined,
  comment: "대충 안나온사람",
  locationUsageAgreement: true,
};

export const NotUser: User = {
  login: "notagree",
  profileImgSrc:
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg",
  location: undefined,
  comment: "",
  locationUsageAgreement: false,
};

export const JBOK: User = {
  login: "jbok",
  profileImgSrc:
    "https://cdn.intra.42.fr/users/b59244c3a3cd393c85a5e007636164cf/jbok.jpg",
  location: "개포 2층 c2r3s8",
  comment: "러스트 츄라이 츄라이",
  locationUsageAgreement: true,
  isFriend: true,
};

export const MYKANG: User = {
  login: "mykang",
  profileImgSrc:
    "https://cdn.intra.42.fr/users/7ba3314a458b65fd50c749fd184301da/mykang.jpg",
  location: "개포 어딘가",
  comment: "",
  locationUsageAgreement: true,
  isFriend: true,
};
