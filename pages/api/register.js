import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { username, email, password } = req.body;
    const client = await clientPromise;
    const db = client.db("tinacms");
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists. Please choose a different username.",
      });
    }

    try {
      const result = await db.collection("users").insertOne({
        username,
        email,
        password,
      });
      console.log("Signup successful:", result.insertId);
      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
