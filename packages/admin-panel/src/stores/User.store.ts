import { Client } from "../client";
import { writable } from "svelte/store";
import { string } from "yup";

// Store interface
type IUserStore = Authorized | UnAuthorized;

interface Authorized {
  isAuthorized: true,
  token: String,
};

interface UnAuthorized {
  isAuthorized: false,
};

// Store as a class
class UserStoreClass {
  constructor() {
    const { subscribe, update } = writable<IUserStore>({
      isAuthorized: false,
    });

    // Saving required functions
    this.subscribe = subscribe;
    this.update = update;
  };

  public subscribe;
  private update;

  // 
  // Methods

  // > Authorize user
  public async authorize(token: string): Promise<boolean> {
    // Making client request
    const doTokenExists = await Client.query("admin.checkAdminToken", token);
    if (doTokenExists) {
      // Saving this token
      localStorage.setItem("token", token);

      // Updating our store
      this.update(() => {
        return {
          isAuthorized: true,
          token: token
        } as Authorized;
      });

      return true;
    };

    return false;
  };
};

// Initialized store
export const User = new UserStoreClass();