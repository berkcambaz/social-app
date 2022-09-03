import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    forGuests?: boolean;
    forAny?: boolean;
    menuType?: boolean;
    showBackButton?: boolean;
  }
}

export { }