import { writable } from "svelte/store";

// // Store interface
interface IConfigStore {
  env: "development" | "production",
};

// Store class
class ConfigStoreClass {
  constructor() {
    // Generating store
    const { subscribe, update } = writable<IConfigStore>({
      // Default store
      env: "development"
    });

    this.subscribe = subscribe;
    this.updateFunction = update;
  }

  // Private variables
  public subscribe;
  private updateFunction;
}

export const ConfigStore = new ConfigStoreClass();