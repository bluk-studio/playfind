import { writable } from "svelte/store";

// Store interface
interface IAppStateStore {
  isLoading: boolean
};

// Store class
class AppStateStoreClass {
  constructor() {
    // Getting {subscribe} and {update} functions
    const { subscribe, update } = writable<IAppStateStore>({
      isLoading: true
    });
  
    this.subscribe = subscribe;
    this.update = update; 
  }
  
  public subscribe;
  private update;

  // Methods
  public setLoading(isLoading: boolean) {
    this.update((object) => {
      object.isLoading = isLoading;
      return object;
    });
  };
};

// Store instance
export const AppState = new AppStateStoreClass();