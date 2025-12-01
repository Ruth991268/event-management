// frontend/server/utils/h3.d.ts
declare module 'h3' {
  export function defineEventHandler<T = any>(handler: (event: any) => T): any
  export function readBody(event: any): Promise<any>
  export function getHeader(event: any, name: string): string | undefined
  export function createError(options: { statusCode?: number; statusMessage?: string; data?: any }): any
  export function getQuery(event: any): any
  export function setResponseStatus(event: any, status: number): void
  export function sendError(event: any, error: any): void
}