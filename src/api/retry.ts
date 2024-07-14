export async function retryApi<T>(
  apiPromise: Promise<T>,
  checkResult: (res: T) => boolean,
  interval: number,
): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      apiPromise
        .then(res => {
          if (checkResult(res)) {
            resolve(res);
          } else {
            retryApi(apiPromise, checkResult, interval * 2)
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
