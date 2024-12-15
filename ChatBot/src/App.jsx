import React, { useState, useRef, useEffect } from 'react'
import { Send, Moon, Sun } from 'lucide-react'

const GirlyChatbot = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const messagesEndRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: 'user', content: input }])
      setInput('')

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'This is a simulated response.' }])
      }, 1000)
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`font-sans ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex items-center justify-center min-h-screen bg-pink-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="w-full max-w-md mx-auto shadow-lg bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between p-4 bg-pink-200 dark:bg-gray-700">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-pink-200">FlowCare Chatbot</h2>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-purple-100 dark:bg-gray-600 text-purple-800 dark:text-pink-200 hover:bg-purple-200 dark:hover:bg-gray-500 transition-colors duration-200"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="p-4 h-[60vh] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                } mb-4`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-gray-600 flex items-center justify-center text-purple-800 dark:text-pink-200 mr-2">
                    AI
                  </div>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-pink-400 text-white'
                      : 'bg-purple-100 text-purple-800 dark:bg-gray-700 dark:text-pink-100'
                  }`}
                >
                  {message.content}
                </div>
                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-pink-300 dark:bg-gray-600 flex items-center justify-center text-purple-800 dark:text-pink-200 ml-2">
                    U
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-pink-100 dark:bg-gray-700">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 rounded-md bg-white dark:bg-gray-600 text-purple-800 dark:text-pink-100 placeholder-purple-400 dark:placeholder-pink-300 border border-pink-300 dark:border-gray-500 focus:outline-none focus:border-purple-500 dark:focus:border-pink-400"
              />
              <button
                type="submit"
                className="p-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white dark:bg-pink-400 dark:hover:bg-pink-500 dark:text-purple-900 transition-colors duration-200"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GirlyChatbot

