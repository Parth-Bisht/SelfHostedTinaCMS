import { AbstractAuthProvider } from "tinacms";

const LOCAL_KEY = "tina-test";

export class CustomAuthProvider extends AbstractAuthProvider {
  constructor() {
    super();
  }

  getUser() {
    if (localStorage.getItem(LOCAL_KEY)) {
      return true;
    }
    console.log("OUTSIDE");
    return false;
  }

  async authenticate() {
    window.location.href = "/login";
    // localStorage.setItem(LOCAL_KEY, JSON.stringify("test-token"));
  }

  authorize() {
    return true;
  }

  async getToken() {
    const token = JSON.parse(localStorage.getItem(LOCAL_KEY));
    if (token) {
      return { id_token: token };
    } else {
      return { id_token: "" };
    }
  }

  logout() {
    localStorage.removeItem(LOCAL_KEY);
  }
}
