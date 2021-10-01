export interface RespMeta {
  timestamp: string
  expires?: string
  ttls?: number
}

export interface BaseResp<M extends RespMeta = RespMeta> {
  meta: M
  error?: string
}

export interface BaseListResp<M extends RespMeta = RespMeta> extends BaseResp<M> {
  total: number
}

export interface HitsResponse<T, M extends RespMeta = RespMeta> extends BaseListResp<M> {
  hits: T[]
}

export interface ItemsResponse<T, M extends RespMeta = RespMeta> extends BaseListResp<M> {
  items: T[]
}
