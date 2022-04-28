import 'react';

declare module 'react' {
  interface CSSProperties {
    /** customRequest: async ({ file, onSuccess, onError } 回调 */
    '--noticeScorllerTxtLen'?: number;
    '--noticeScorllerScrollXStayTime'?: number;
    '--noticeScorllerListlen'?: number;
    '--noticeScorlleScrollYStayTime'?: number;
  }
}

declare global {
  interface Window {
    vant: any;
  }
  interface Math {
    easeout: any;
    animation: any;
  }
  interface String {
    firstUpperCase: () => string;
  }
  interface Date {
    Format: (param?: string) => string;
  }
}

export interface AxiosResponse {
  status: number;
  message: string;
  data: object;
}

export interface ILoginUserInfo {
  userName: string;
}

export interface IGlobalData {
  loginUserInfo: ILoginUserInfo;
}
