import { keyboard, Key } from "@nut-tree/nut-js";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { value } = req.query;
  const grams = (parseFloat(value as string) / 59.99).toString();
  const gramsString = grams.replace(".", ",");
  keyboard.config.autoDelayMs = 100;
  await keyboard.pressKey(Key.RightSuper, Key.Num3);
  await keyboard.releaseKey(Key.RightSuper, Key.Num3);
  await keyboard.type(Key.Insert);
  await keyboard.type(gramsString.slice(0, 7));
  await keyboard.type(Key.Enter);
  await keyboard.type(Key.Num3);
  await keyboard.type(Key.Enter);
  await new Promise((r) => setTimeout(r, 1000));
  await keyboard.type(Key.F12);
  await new Promise((r) => setTimeout(r, 5000));
  await keyboard.pressKey(Key.LeftAlt, Key.Tab);
  await keyboard.releaseKey(Key.LeftAlt, Key.Tab);
  res.status(200).json({ message: "OK" });
};

export default handler;
