import { v4 as uuidv4 } from "uuid";
import { withPrivateRoute } from "@/lib/utils";
import supabase from "@/services/supabase";
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const queryAll = await supabase
      .from("Assets")
      .select("id, title, description, price, owner, image");
    return res.status(200).send(queryAll);
  } else if (req.method === "POST") {
    const decodedToken = await withPrivateRoute(req, res);
    // @ts-ignore
    const { address } = decodedToken;
    const { title, description, price, file, image } = req.body;

    try {
      const response = await supabase.from("Assets").insert({
        id: uuidv4(),
        title,
        description,
        price,
        file,
        image,
        owner: address,
        updatedAt: new Date(),
      });

      return res.status(200).send(response);
    } catch (err: any) {
      console.error(err);
      return res.status(500).send({ error: "Failed to fetch" });
    }
  }
};

export default handler;
