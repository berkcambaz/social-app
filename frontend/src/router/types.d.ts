import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    forGuests?: boolean;
    forAny?: boolean;
    showBackButton?: boolean;
  }
}

export { }