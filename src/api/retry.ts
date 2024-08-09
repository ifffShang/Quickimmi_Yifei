export interface retryParams<T> {
  apiFunc: () => Promise<T>;
  checkResult: (res: T, timeout?: boolean) => boolean;
  interval: number;
  timeout?: number;
  startTime?: number;
  retryOnError?: (error: any) => boolean;
}

export async function retryApi<T>(params: retryParams<T>): Promise<T> {
  params.startTime = params.startTime || Date.now();
  params.timeout = params.timeout || 1000 * 60 * 5;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      params
        .apiFunc()
        .then(res => {
          if (params.checkResult(res)) {
            resolve(res);
          } else if (Date.now() - params.startTime! > params.timeout!) {
            params.checkResult(res, true);
            resolve(res);
          } else {
            retryApi(params)
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
          }
        })
        .catch(err => {
          if (params.retryOnError && !params.retryOnError(err)) {
            retryApi(params)
              .then(res => {
                resolve(res);
              })
              .catch(err => {
                reject(err);
              });
            return;
          }
          reject(err);
        });
    }, params.interval);
  });
}
