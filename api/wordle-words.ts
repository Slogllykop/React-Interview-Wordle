import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
    try {
        const response = await axios.get(
            "https://api.frontendexpert.io/api/fe/wordle-words",
        );
        const data = await response.data;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch words" });
    }
}
