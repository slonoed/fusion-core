/* @flow */
import type {Context as KoaContext} from 'koa';

declare module 'fusion-core' {
  declare var __NODE__: Boolean;
  declare var __BROWSER__: Boolean;
  declare export type SSRContext = {
    element: any,
    template: {
      htmlAttrs: Object,
      title: string,
      head: Array<string>,
      body: Array<string>,
    },
  } & KoaContext;
  declare export type Context = SSRContext | KoaContext;
  declare export type FusionPlugin<
    Dependencies,
    Service
  > = Dependencies => Service;
  declare export type Middleware = (
    ctx: Context,
    next: () => Promise<void>
  ) => Promise<*>;

  declare export type MiddlewarePlugin = {
    __middleware__: Middleware,
  };

  declare class FusionApp {
    // TODO: More specific types
    constructor<Element>(element: Element, render: (Element) => any): FusionApp;
    registered: Map<any, any>;
    plugins: Array<any>;
    renderer: any;
    // register(middleware: MiddlewarePlugin): void;
    register<A, B>(Plugin: FusionPlugin<A, B>): void;
    register<A, B>(token: B, Plugin: FusionPlugin<A, B>): void;
    configure<A: string>(token: A, val: string): void;
    configure<A: number>(token: A, val: number): void;
    configure<A: Object>(token: A, val: $Exact<A>): void;
    middleware<Deps>(deps: Deps, middleware: (Deps) => Middleware): void;
    middleware(middleware: Middleware): void;
    callback(): () => Promise<void>;
    resolve(): void;
  }

  declare export default typeof FusionApp

  declare export type PluginLoader<Dependencies, Service> = (
    init: FusionPlugin<Dependencies, Service>
  ) => FusionPlugin<Dependencies, Service>;

  declare export function withMiddleware(
    middleware: Middleware
  ): MiddlewarePlugin;

  declare export function withMiddleware<Service>(
    middleware: Middleware,
    service: Service
  ): Service;

  declare export function withDependencies<Dependencies, Service>(
    deps: Dependencies
  ): PluginLoader<Dependencies, Service>;
}