import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    forGuests?: boolean;
    showBackButton?: boolean;
  }
}

export { }