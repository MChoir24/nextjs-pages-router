// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res
      .status(401)
      .json({ revalidated: false, message: "Invalid token" });
  }
  try {
    // Add logic to determine which pages to revalidate
    switch (
      req.query.data // Add more cases as needed
    ) {
      case "products":
        await res.revalidate("/products/static");
        return res.json({
          revalidated: true,
          message: "Revalidation successful",
        });
      default:
        return res
          .status(400)
          .json({ revalidated: false, message: "Invalid data parameter" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ revalidated: false, message: `Error revalidating: ${error}` });
  }
}
