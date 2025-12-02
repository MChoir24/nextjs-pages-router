// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveData, retrieveDataById } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

export type Product = {
  id: number;
  name: string;
  price: number;
  size: string;
  image: string;
};

type Data = {
  status: string;
  statusCode: number;
  data: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.query.products![1]) {
    const data = await retrieveDataById(
      "products",
      req.query.products![1] as string
    );
    res.status(200).json({ status: "true", statusCode: 200, data: data });
  } else {
    const data = await retrieveData("products");
    res.status(200).json({ status: "true", statusCode: 200, data: data });
  }
}
