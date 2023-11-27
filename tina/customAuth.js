import { AbstractAuthProvider } from "tinacms";

const LOCAL_KEY = "tina-test";

export class CustomAuthProvider extends AbstractAuthProvider {
  constructor() {
    super();
  }

  async authenticate() {
    localStorage.setItem(LOCAL_KEY, JSON.stringify("test-token"));
  }

  async getToken() {
    const token = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (token) {
      return { id_token: token };
    } else {
      return { id_token: "" };
    }
  }

  getUser() {
    if (localStorage.getItem(LOCAL_KEY)) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(LOCAL_KEY);
  }
}
