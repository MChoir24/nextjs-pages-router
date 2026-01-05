// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUpUser } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === "POST") {
    await signUpUser(req.body, (result: Data) => {
      if (result.status) {
        res.status(200).json({ status: true, message: result.message });
      } else {
        res.status(400).json({ status: false, message: result.message });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "Method Not Allowed" });
  }
}
