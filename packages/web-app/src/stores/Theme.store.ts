import type { ThemeParams, WebApp } from "src/telegram.types";
import { writable } from "svelte/store";

// Store class
class ThemeStoreClass {
  constructor() {
    // Default store

    // Generating our store functions
    const { subscribe, update } = writable<ThemeParams>({
      // Default store
      bg_color: "#ffffff",
      button_color: "#5ac8fb",
      button_text_color: "#ffffff",
      hint_color: "#64748b",
      link_color: "#5ac8fb",
      secondary_bg_color: "#f3f2f8",
      text_color: "#0f172a"
    });

    this.subscribe = subscribe;
    this.updateFunction = update;
  };

  public subscribe;
  private updateFunction;

  // Store methods
  public async initialize(sdk: WebApp) {
    // Logger
    console.log(`[playfind-web-app] Updating theme: ${ JSON.stringify(sdk.themeParams) }`);

    // Getting information from sdk
    this._updateTheme(sdk.themeParams);

    // Creating event listener
    sdk.onEvent("themeChanged", () => {
      // Logger
      console.log(`[playfind-web-app] Received {themeChanged} event. Updating store with values: ${ window.Telegram.WebApp.themeParams }`);

      // Initializing new theme settings...
      this._updateTheme(window.Telegram.WebApp.themeParams);
    });
  };

  private _updateTheme(newTheme: ThemeParams) {
    this.updateFunction((object) => {
      object = newTheme;

      return object;
    });
  };
};

export const ThemeStore = new ThemeStoreClass();