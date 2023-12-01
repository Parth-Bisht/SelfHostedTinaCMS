import { defineConfig, defineStaticConfig, LocalAuthProvider } from "tinacms";
import {
  UsernamePasswordAuthJSProvider,
  TinaUserCollection,
} from "tinacms-authjs/dist/tinacms";
import page from "./collections/page";
import post from "./collections/post";
import { CustomAuthProvider } from "./customAuth";

// const customUserField = TinaUserCollection.fields[0];
// customUserField.fields.push({
//   type: "string",
//   label: "Role",
//   name: "role",
//   options: ["admin", "editor"],
// });

export const config = defineStaticConfig({
  contentApiUrlOverride: "/api/tina/gql",
  authProvider:
    process.env.TINA_PUBLIC_IS_LOCAL === "true"
      ? new LocalAuthProvider()
      : new UsernamePasswordAuthJSProvider(),
  // clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // branch:
  //   process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
  //   process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
  //   process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    loadCustomStore: async () => {
      const pack = await import("next-tinacms-s3");
      return pack.TinaCloudS3MediaStore;
    },
    // this is the config for the tina cloud media store
    // tina: {
    //   publicFolder: "public",
    //   mediaRoot: "uploads",
    // },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [page, post, TinaUserCollection],
  },
});

export default config;
