import { User } from "../models/user.model.js";

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user._id; 

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.credits <= 0) {
      return res.status(400).json({
        message: "No credits left",
        credits: user.credits,
      });
    }

    const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "POST",
      headers: {
        "x-api-key": process.env.CLIPDROP_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(400).json({
        message: "ClipDrop API Error",
        error: errorText,
      });
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const resultImage = `data:image/png;base64,${base64Image}`;


    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { credits: user.credits - 1 },
      { new: true }
    );

    res.status(200).json({
      message: "Image generated successfully",
      credits: updatedUser.credits,
      resultImage, 
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { generateImage };