/**
 * @description 1초 지연 후 콜백 함수 실행하는 비동기 데모 api 함수
 * @param callback () => {실행할 함수;}
 * @returns Promise
 */

const demoApi = async <T>(callback: () => T): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(
      () => {
        try {
          resolve(callback());
        } catch (error) {
          reject(error);
        }
      },
      250 + Math.random() * 750
    );
  });
};

export default demoApi;
