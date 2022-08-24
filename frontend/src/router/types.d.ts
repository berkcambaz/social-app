import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    forGuests?: boolean;
    hideBottomBar?: boolean;
    showBackButton?: boolean;
  }
}

export { }