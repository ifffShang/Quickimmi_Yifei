export async function retryApi<T>(apiFunc: () => Promise<T>, checkResult: (res: T) => boolean, interval: number): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      apiFunc()
        .then(res => {
          if (checkResult(res)) {
            resolve(res);
          } else {
            retryApi(apiFunc, checkResult, interval)
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
