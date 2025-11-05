// const express = require("express")
// const cors = require("cors")
// const multer = require("multer")
// const path = require("path"); // for file paths
// const { loadPdf } = require("./pdfLoader"); // your PDF loader module

import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path"; // for file paths
import { loadPdf } from "./pdfLoader.js"; // your PDF loader module
import {getAnswer} from "./controllers/chatController.js"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${uniqueSuffix}-${file.originalname}`)
  }
})

const upload = multer({storage:storage});

const app = express()

const PORT = process.env.PORT || 8000
app.use(cors())
app.use(express.json())

app.post('/upload/pdf', upload.single('pdf'), async(req,res)=>{

try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Full path to the uploaded file
    const filePath = path.join(__dirname, "upload", req.file.filename);

    // Process PDF: split, generate embeddings, add to Qdrant
    const { chunks, vectorStore } = await loadPdf(filePath);

    return res.json({
      message: "PDF uploaded and processed successfully",
      chunks: chunks.length,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error processing PDF", error: err.message });
  }})

  app.get("/chat", getAnswer)

// app.use('/api', apiRoutes);



app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))