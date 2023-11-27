import { databaseRequest } from "../../lib/databaseConnection";

const nextApiHandler = async (req, res) => {
  const isAuthorized = req.headers.authorization === "Bearer test-token";
  console.log(req.headers.authorization, "ISAUTHORIZED");

  if (isAuthorized) {
    const { query, variables } = req.body;
    const result = await databaseRequest({ query, variables });
    return res.json(result);
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

export default nextApiHandler;
