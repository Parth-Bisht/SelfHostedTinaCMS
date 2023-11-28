import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { email, password } = req.body;
    const client = await clientPromise;
    const db = client.db("tinacms");
    const user = await db.collection("users").findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "Please Login First!" });
    }
    if (user.password != password) {
      return res.status(400).json({ error: "Please enter a valid password" });
    }
    return res
      .status(200)
      .json({ message: "Welcome", user, token: "tina-token" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
