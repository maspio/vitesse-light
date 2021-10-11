/* eslint-disable no-console */
// import debug from 'debug'

// export const logger = (scope: string) => ({
//   info: debug(`${scope}:info`),
//   warn: debug(`${scope}:warn`),
//   error: debug(`${scope}:error`),
// })

type LogFn = (msg?: any, ...optParams: any[]) => void

const scoped = (logFn: LogFn, ...scopes: string[]) => {
  const prefix = scopes.join(':')
  return (msg?: any, ...optParams: any[]) => logFn(`${prefix} ${msg}`, ...optParams)
}

export const logger = (scope: string) => ({
  info: scoped(console.info, scope),
  warn: scoped(console.warn, scope),
  error: scoped(console.error, scope),
})
