// import React, { useState } from "react";

// const ChatBox = () => {
//   const [messages, setMessages] = useState([]); // {sender: "user"|"bot", text: string}
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Add user message to UI immediately
//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);

//     try {
//       const res = await fetch("http://localhost:8000/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query: input }),
//       });

//       const data = await res.json();

//       const botMessage = { sender: "bot", text: data.answer || "No response" };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (err) {
//       console.error(err);
//       setMessages((prev) => [
//         ...prev,
//         { sender: "bot", text: "⚠️ Error connecting to server" },
//       ]);
//     }

//     setInput(""); // clear input box
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div className="flex flex-col h-full w-full bg-slate-800 text-white p-4">
//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto space-y-3 mb-4">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`p-2 rounded-xl max-w-[70%] ${
//               msg.sender === "user"
//                 ? "bg-blue-600 self-end"
//                 : "bg-gray-700 self-start"
//             }`}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex items-center space-x-2">
//         <input
//           className="flex-1 p-2 rounded-lg bg-gray-900 border border-gray-600 outline-none"
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={sendMessage}
//           className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;




import React, { useState, useRef, useEffect } from "react";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: input }),
      });

      const data = await res.json();
      const botMessage = { sender: "bot", text: data.answer || "No response" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server" },
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-900 text-white">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm ${
                msg.sender === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-700 p-4 bg-slate-900">
        <div className="flex items-center space-x-2">
          <input
            className="flex-1 p-3 rounded-xl bg-gray-800 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-600"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

