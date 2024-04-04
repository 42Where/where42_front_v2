type User = {
  /**
   * 42api/백엔드에서 사용하는 고유 id
   */
  intraId: number;
  /**
   *  사용자의 인트라 아이디(api에서는 login)
   */
  intraName: string;
  /**
   * 42api 프로필 사진 url
   */
  image?: string;
  /**
   * 사용자의 위치정보
   * 후에 api 구현에 따라서 오브젝트로 분리될 수 있음
   */
  location?: string;
  /**
   * 사용자의 상태 메세지
   */
  comment?: string;
  /**
   * 사용자의 클러스터 출입여부
   */
  inCluster: boolean;
  /**
   * 사용자의 위치정보 이용 동의 여부
   */
  agree: boolean;
  /**
   * 사용자의 기본 친구 그룹 id
   */
  defaultGroupId: number;
  /**
   * 멤버가 아닐경우 날짜
   * 멤버일 경우 ??
   */
  grade?: string;
};

export default User;
