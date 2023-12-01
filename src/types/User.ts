type User = {
  /**
   * 인트라/백엔드에서 사용하는 고유 id입니다.
   */
  id: number; // 사용하지 않을수도 있음
  /**
   * 사용자의 인트라 아이디입니다.
   */
  login: string;
  /**
   * 프로필사진의 URL입니다.
   */
  profileImgSrc: string;
  /**
   * 사용자의 위치입니다.
   * 후에 api 구현에 따라서 오브젝트로 분리될 수 있음
   */
  location?: string;
  /**
   * 사용자의 상태메시지입니다.
   */
  comment?: string;
  /**
   * 사용자의 위치 정보 이용 동의 여부입니다.
   */
  locationUsageAgreement?: boolean;
  /**
   * 사용자의 위치 정보 이용 동의 날자입니다.
   */
  agreedAt?: Date; // 사용하지 않을수도 있음
  /**
   * 사용자의 최근 출석 날자입니다.
   */
  updatedAt?: Date; // 사용하지 않을수도 있음
  /**
   * 나와 사용자의 관계입니다.
   */
  isFriend?: boolean; // 사용하지 않을수도 있음
  /**
   * 사용자의 블랙홀 여부입니다.
   */
  blackhole?: boolean; // 사용하지 않을수도 있음
  // 백엔드 api 구현에 따라서 로그인, 프로필사진을 제외한 정보는 다른 타입으로 분리되어 Optional이 될 수 있음
};

export default User;
