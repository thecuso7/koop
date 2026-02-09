declare module 'vue3-virtual-scroller' {
  import { Component, Plugin } from 'vue'
  
  export const RecycleScroller: Component
  export const DynamicScroller: Component
  export const DynamicScrollerItem: Component
  export const IdState: any
  
  const plugin: Plugin
  export default plugin
}