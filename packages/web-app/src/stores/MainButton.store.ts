import { writable } from "svelte/store";
import type { MainButtonParams } from "../telegram.types";

// Store interface
interface Store {

};

// Store class
class MainButtonStoreClass {
  constructor() {
    // Initializing our Store
    const { subscribe, update } = writable<Store>({

    });

    // Updating public and private variables
    this.subscribe = subscribe;
    this.update = update;
  };

  // Required variables
  public subscribe;

  // Other variables
  private update;

  // Methods
  public setParams(params: MainButtonParams) {
    // Updating button params
    window.Telegram.WebApp.MainButton.setParams(params);
  };

  public onClick(callback: Function) {
    window.Telegram.WebApp.MainButton.onClick(callback);
  };
};

// Exporting store instance
export const MainButtonStore = new MainButtonStoreClass();