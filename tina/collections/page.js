/**
 * @type {import('tinacms').Collection}
 */
import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";

function getUserData() {
  const test = new UsernamePasswordAuthJSProvider();
  return test
    .getUser()
    .then((user) => {
      let name = user.name;
      return name;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}
let name;
export default {
  label: "Page Content",
  name: "page",
  path: "content/page",
  format: "mdx",
  defaultItem: () => {
    getUserData()
      .then((n) => {
        console.log(n);
        name = n;
      })
      .catch((error) => {
        console.log(error);
      });
    return {
      // username: user.name,
      username: name || "username",
      date: new Date().toISOString(),
    };
  },
  fields: [
    {
      name: "body",
      label: "Main Content",
      type: "rich-text",
      isBody: true,
    },
    {
      name: "date",
      type: "datetime",
    },
    {
      name: "username",
      type: "string",
      ui: {
        parse: (val) => {
          console.log(name, "parse");
          return name;
        },
        format: (val) => val,
      },
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return undefined;
    },
  },
};
