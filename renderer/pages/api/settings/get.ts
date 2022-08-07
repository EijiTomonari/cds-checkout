import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch("http://127.0.0.1:5000/settings/read");
  const data = await response.json();
  res.status(200).json(data);
};

export default handler;
