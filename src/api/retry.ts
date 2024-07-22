export async function retryApi<T>(
  apiFunc: () => Promise<T>,
  checkResult: (res: T, timeout?: boolean) => boolean,
  interval: number,
  timeout: number = 1000 * 60 * 10,
  startTime: number = Date.now(),
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      apiFunc()
        .then(res => {
          if (checkResult(res)) {
            resolve(res);
          } else if (Date.now() - startTime > timeout) {
            checkResult(res, true);
            resolve(res);
          } else {
            retryApi(apiFunc, checkResult, interval, timeout, startTime)
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
          }
        })
        .catch(err => {
          reject(err);
        });
    }, interval);
  });
}
