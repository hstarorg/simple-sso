type CacheDataItem = {
  expireTime: number;
  data: any;
};

type SessionStoreOptions = {
  expires: number;
};

class SessionStore {
  private sessionMap = new Map<string, CacheDataItem>();

  constructor(private options: SessionStoreOptions) {}

  /**
   *
   * @param sid
   * @param data
   * @param options
   */
  set(sid: string, data: any) {
    const expireTime = Date.now() + this.options.expires;
    const cacheData = { expireTime, data };
    this.sessionMap.set(sid, cacheData);
  }

  get(sid: string) {
    const cacheItem = this.sessionMap.get(sid);
    if (!cacheItem) {
      return null;
    }
    // session 过期
    if (cacheItem.expireTime < Date.now()) {
      this.sessionMap.delete(sid);
      return null;
    }
    // 有效情况，需要延长时间
    cacheItem.expireTime = Date.now() + this.options.expires;
    return cacheItem.data;
  }
}

export const sessionStore = new SessionStore({ expires: 20 * 3600 });
