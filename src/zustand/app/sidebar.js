import { create } from 'zustand';
import { getDefaultPath } from '@zeep/lib/helpers/url_sync';
import { isServer } from '@zeep/lib/helpers/isServer';
const preKeys = getDefaultPath();

export function getView(width) {
  let newView = 'MobileView';
  if (width > 1220) {
    newView = 'DesktopView';
  } else if (width > 767) {
    newView = 'TabView';
  }
  return newView;
}

const sideBarStore = create((set) => ({
  collapsed: !isServer && window.innerWidth > 1220 ? true : true,
  view: !isServer && getView(window.innerWidth),
  height: !isServer && window.innerHeight,
  openDrawer: false,
  openKeys: preKeys,
  current: preKeys,
  rerenderDetails: false,
  //open/close the sidebar
  toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),
  toggleAll: (params_width, params_height) => {
    const view = getView(params_width);
    const currentState = sideBarStore.getState();
    const collapsed = view !== 'DesktopView';
    if (currentState.view !== view || params_height !== currentState.height) {
      const height =  params_height ? params_height : currentState.height;
      set((state) => ({ view: view, collapsed: collapsed, height: height }))
    }
  },
  //open/close the sidebar menu
  toggleOpenDrawer: () => set((state) => ({ openDrawer: !state.openDrawer })),
  changeOpenKeys: openKeys => set(() => ({ openKeys: openKeys })),
  changeCurrent: current => {
    localStorage.setItem('activeMenu', current[0]);
    set(() => ({ current: current }))
  },
  clearMenu: () => set(() => ({ openKeys: [], current: [] })),
  toggleDetailsModal: () => set((state) => ({ rerenderDetails: !state.rerenderDetails })),
}));

export default sideBarStore;