import { QdrantVectorStore } from "@langchain/qdrant";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
// import { OpenAI } from "openAI";


export const getAnswer = async(req,res)=>{

    const {query: userQuery} = req.body;

const client = new OpenAI({apiKey: process.env.OPENAI_API_KEY})
    const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY
});

const vectorStore = await QdrantVectorStore.fromExistingCollection(embeddings, {
  url:"https://61607f8a-5151-4d4b-b532-fce09ca784ce.us-east4-0.gcp.cloud.qdrant.io",
  collectionName: "pdf-chat",
});

const retr = vectorStore.asRetriever({
    k:2
})

const result = await retr.invoke(userQuery)


// const system_Prompt = `You are an helpful AI Assistant who asnwers the user query based on available content from the pdf file,
// CONTEXT: 
// ${JSON.stringify(result)}`;

 const system_Prompt = `You are a helpful AI Assistant. Answer the user's query using ONLY the following PDF context:\n\n${result
      .map((doc, i) => `Chunk ${i + 1}: ${doc.pageContent}`)
      .join("\n\n")}`;

const chatResults = await client.chat.completions.create({
    model : 'gpt-4.1',
    messages: [
        {role : 'system', content : system_Prompt},
        {role : 'user', content : userQuery}
    ]

});

return res.json({message: chatResults.choices[0].message.content, docs: result})


}