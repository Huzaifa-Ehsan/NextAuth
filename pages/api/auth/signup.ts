import { hash } from "bcryptjs";
import { db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";
import { adminDB } from "@/adminfirebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body)
      return res.status(404).json({ error: "Don't have form data..." });
    const { username, email, password } = req.body;
    const data = { username, email, password };

    const querySnapshot = await adminDB
      .collection("users")
      .where("email", "==", email)
      .get();
    if (querySnapshot.empty) {
      // No matching documents, so add the new document/user
      await addDoc(collection(db, "users"), {
        username,
        email,
        password: await hash(password, 12),
      });
      res.status(201).json({ status: true, user: data });
      return;
    }
    querySnapshot.forEach((doc) => {
      const checkexisting = doc.data();
      if (checkexisting)
        return res.status(422).json({ message: "User Already Exists..." });
    });
  } else {
    res.status(500).json({ message: "HTTP method not valid" });
  }
}
