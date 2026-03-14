
"use client"

import { useEffect, useRef, useState } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"



export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [conversationId, setConversationId] = useState(null)
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user", content: input }

    setInput("")
    setLoading(true)

    setMessages(prev => [...prev, userMessage, { role: "assistant", content: "" }])

    const updatedMessages = [...messages, userMessage]



    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";
    const res = await fetch(`${BACKEND_URL}/dailyAI`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: updatedMessages,
        conversationId
      }),
    })

    if (!res.ok) {
      const err = await res.text()
      console.error(err)
      setLoading(false)
      return
    }

    const newConversationId = res.headers.get("x-conversation-id")

    if (!conversationId && newConversationId) {
      setConversationId(newConversationId)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value)
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (!line.trim()) continue

        try {
          const clean = line.replace(/^data:\s*/, "")
          const json = JSON.parse(clean)

          const token = json?.choices?.[0]?.delta?.content

          if (!token) continue

          setMessages(prev => {
            const last = prev[prev.length - 1]

            return [
              ...prev.slice(0, -1),
              { ...last, content: last.content + token }
            ]
          })

        } catch (err) {
          console.log(err)
        }
      }
    }

    setLoading(false)
  }



  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-black">

      {/* Header */}
      <div className="border-b dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex justify-between items-center">
        <div className="font-semibold text-lg">AI Assistant</div>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md border dark:border-zinc-700"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8 w-full max-w-4xl mx-auto space-y-6">

        {messages.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            Start a conversation...
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm shadow-sm
              ${m.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-zinc-800 dark:text-gray-200 border dark:border-zinc-700"
                }`}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "")
                    return !inline && match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-gray-200 dark:bg-zinc-700 px-1 rounded">
                        {children}
                      </code>
                    )
                  }
                }}
              >
                {m.content}
              </ReactMarkdown>

              {loading && i === messages.length - 1 && (
                <span className="animate-pulse ml-1">▍</span>
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
        <form
          onSubmit={sendMessage}
          className="max-w-4xl mx-auto flex gap-3"
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 resize-none border rounded-xl px-4 py-3 
            focus:outline-none focus:ring-2 focus:ring-blue-500
           bg-white dark:border-zinc-700 overflow:hidden"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>

    </div>
  )
}

