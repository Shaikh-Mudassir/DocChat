import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Document } from "@langchain/core/documents";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// import { RecursiveCharacterTextSplitter } from "@langchain/text_splitters";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

import fs from "fs";
import path from "path";

export async function loadPdf(filePath){

if (!fs.existsSync(filePath)) {
    throw new Error("File not found: " + filePath);
  }

    const loader = new PDFLoader(filePath);
    const docs = await loader.load()
    
  console.log(`1 - Loaded ${docs.length} pages`);


    const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});
const chunks = await textSplitter.splitDocuments(docs);
console.log(`2 - Created ${chunks.length} chunks`);


const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY
});

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url:"https://61607f8a-5151-4d4b-b532-fce09ca784ce.us-east4-0.gcp.cloud.qdrant.io",
  collectionName: "pdf-chat",
});

  await vectorStore.addDocuments(chunks);



return {chunks,vectorStore}

}