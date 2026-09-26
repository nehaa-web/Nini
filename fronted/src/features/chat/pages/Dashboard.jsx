import { useEffect, useMemo, useRef, useState } from 'react'
import { LuMenu, LuMessageCircle, LuMic, LuPaperclip, LuPlus, LuSearch, LuSend, LuSettings, LuSparkles, LuX } from 'react-icons/lu'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat.js'

const conversations = [
  { id: 1, title: 'Ideas for a weekend in Kyoto', date: 'Today' },
  { id: 2, title: 'A better morning routine', date: 'Yesterday' },
  { id: 3, title: 'Understanding neural networks', date: 'Yesterday' },
  { id: 4, title: 'Notes on The Creative Act', date: 'Previous 7 days' },
  { id: 5, title: 'Easy dinners for busy weeks', date: 'Previous 7 days' },
]

const icons = {
  spark: LuSparkles,
  plus: LuPlus,
  search: LuSearch,
  message: LuMessageCircle,
  settings: LuSettings,
  menu: LuMenu,
  send: LuSend,
  paperclip: LuPaperclip,
  mic: LuMic,
  close: LuX,
}

const Icon = ({ name, size = 18, className = '' }) => {
  const IconComponent = icons[name]
  return <IconComponent aria-hidden="true" className={className} size={size} />
}

const suggestions = [
  { title: 'Write something', prompt: 'Help me write something clear and compelling.' },
  { title: 'Explore an idea', prompt: 'I have an idea I want to think through.' },
  { title: 'Plan my day', prompt: 'Help me make a thoughtful plan for today.' },
]

const Dashboard = () => {
  const chat = useChat()
  const { user } = useSelector((state) => state.auth)
  const [search, setSearch] = useState('')
  const [activeConversation, setActiveConversation] = useState(null)
  const [messages, setMessages] = useState([])
  const [draft, setDraft] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    chat.initializeSocket()
  }, [])

  const filteredConversations = useMemo(
    () => conversations.filter((conversation) => conversation.title.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  const startNewChat = () => {
    setActiveConversation(null)
    setMessages([])
    setDraft('')
    setSidebarOpen(false)
    inputRef.current?.focus()
  }

  const openConversation = (conversation) => {
    setActiveConversation(conversation)
    setMessages([])
    setSidebarOpen(false)
  }

  const sendMessage = (event) => {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setMessages((current) => [...current, { id: Date.now(), text }])
    setDraft('')
  }

  const displayName = user?.name || user?.username || 'Your account'
  const initials = displayName === 'Your account' ? 'N' : displayName.slice(0, 1).toUpperCase()

  return (
    <main className="relative flex h-dvh min-h-[540px] w-full overflow-hidden bg-[#090a0c] text-white selection:bg-[#146b74]/40">
      {sidebarOpen && <button aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden" />}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[278px] shrink-0 flex-col border-r border-[#146b74]/30 bg-[#08090b]/95 px-4 pb-4 pt-5 shadow-[12px_0_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-transform duration-300 md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-8 flex h-9 items-center justify-between px-1">
          <button onClick={startNewChat} className="group flex items-center gap-2.5 rounded-lg text-left" aria-label="Nini home">
            <span className="grid size-8 place-items-center rounded-[11px] border border-[#2bb4b7]/25 bg-[#146b74]/15 text-[#75d5d0] shadow-[0_0_22px_rgba(20,107,116,0.16)] transition group-hover:border-[#55c9c3]/50"><Icon name="spark" size={18} /></span>
            <span className="text-[18px] font-semibold tracking-[0.01em]">Nini</span>
          </button>
          <button aria-label="Close navigation" onClick={() => setSidebarOpen(false)} className="grid size-8 place-items-center rounded-lg text-white/45 hover:bg-white/5 hover:text-white md:hidden"><Icon name="close" /></button>
        </div>

        <button onClick={startNewChat} className="mb-3 flex h-10 items-center gap-2.5 rounded-xl border border-[#52c4bf]/20 bg-[#146b74]/20 px-3 text-[13px] font-medium text-[#e4fffc] shadow-[0_4px_20px_rgba(20,107,116,0.08)] transition hover:border-[#52c4bf]/40 hover:bg-[#146b74]/30">
          <Icon name="plus" size={17} /> New chat
          <span className="ml-auto rounded border border-white/10 px-1.5 py-0.5 text-[10px] font-normal text-white/35">⌘ K</span>
        </button>

        <label className="mb-7 flex h-10 items-center gap-2.5 rounded-xl border border-white/[0.055] bg-black/20 px-3 text-white/40 transition focus-within:border-[#51c4bf]/30 focus-within:text-white/70">
          <Icon name="search" size={16} />
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search chats" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-white/35" />
          <span className="text-[10px] text-white/25">⌘ F</span>
        </label>

        <div className="mb-2 flex items-center justify-between px-2">
          <h2 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/35">Chat history</h2>
          <span className="text-[10px] text-white/20">{filteredConversations.length}</span>
        </div>
        <nav aria-label="Chat history" className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.12)_transparent] [scrollbar-width:thin]">
          {filteredConversations.length ? filteredConversations.map((conversation) => (
            <button key={conversation.id} onClick={() => openConversation(conversation)} className={`group mb-1 flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left transition ${activeConversation?.id === conversation.id ? 'bg-[#146b74]/20 text-white' : 'text-white/55 hover:bg-[#146b74]/12 hover:text-white/90'}`}>
              <Icon name="message" size={15} className="shrink-0 text-white/30 group-hover:text-[#74cfca]" />
              <span className="truncate text-[12px]">{conversation.title}</span>
            </button>
          )) : <p className="px-2.5 py-3 text-xs text-white/30">No matching chats</p>}
        </nav>

        <div className="mt-4 border-t border-white/[0.07] pt-3">
          <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-left text-[12px] text-white/50 transition hover:bg-white/[0.04] hover:text-white/85"><Icon name="settings" size={16} /> Settings</button>
          <button className="mt-1 flex w-full items-center gap-2.5 rounded-xl px-2 py-2 transition hover:bg-white/[0.04]">
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#64c7c0]/25 bg-[#146b74]/20 text-[11px] font-medium text-[#b5ece6]">{initials}</span>
            <span className="min-w-0 flex-1 text-left"><span className="block truncate text-[12px] text-white/80">{displayName}</span><span className="mt-0.5 block text-[10px] text-white/35">Personal workspace</span></span>
            <span className="text-white/30">···</span>
          </button>
        </div>
      </aside>

      <section className="relative flex min-w-0 flex-1 flex-col bg-[radial-gradient(ellipse_at_53%_0%,rgba(20,107,116,0.075),transparent_42%)]">
        <header className="z-10 flex h-[62px] shrink-0 items-center justify-between border-b border-white/[0.055] px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button aria-label="Open navigation" onClick={() => setSidebarOpen(true)} className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/[0.07] text-white/55 hover:bg-white/[0.04] md:hidden"><Icon name="menu" /></button>
            <div className="min-w-0">
              <h1 className="truncate text-[13px] font-medium text-white/85">{activeConversation?.title || (messages.length ? 'New conversation' : 'New chat')}</h1>
              <div className="mt-1 flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-[#58c8c1] shadow-[0_0_8px_rgba(88,200,193,0.75)]" /><span className="text-[10px] text-white/35">Nini <span className="text-white/20">·</span> Ready to help</span></div>
            </div>
          </div>
          <button onClick={startNewChat} className="hidden items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[11px] text-white/55 transition hover:border-[#146b74]/40 hover:text-white/85 sm:flex"><Icon name="plus" size={14} /> New chat</button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-8">
            {messages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center pb-8 pt-10 text-center">
                <div className="relative mb-6 grid size-[62px] place-items-center rounded-[21px] border border-[#4dbab4]/25 bg-[#146b74]/[0.13] text-[#8ce0d9] shadow-[0_0_55px_rgba(20,107,116,0.18),inset_0_0_20px_rgba(20,107,116,0.12)]">
                  <span className="absolute inset-[-6px] rounded-[25px] border border-[#4dbab4]/[0.07]" /><Icon name="spark" size={29} />
                </div>
                <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#67c7c0]/75">A little room to think</p>
                <h2 className="text-balance text-[26px] font-medium tracking-[-0.02em] text-white/90 sm:text-[32px]">How can I help you today?</h2>
                <p className="mt-3 max-w-[340px] text-[13px] leading-6 text-white/40">A question, a half-formed idea, or a problem to untangle. We can start anywhere.</p>
                <div className="mt-9 grid w-full max-w-[650px] grid-cols-1 gap-2 sm:grid-cols-3">
                  {suggestions.map((suggestion, index) => (
                    <button key={suggestion.title} onClick={() => { setDraft(suggestion.prompt); inputRef.current?.focus() }} className="group flex min-h-[72px] items-center gap-3 rounded-xl border border-white/[0.07] bg-black/20 px-3.5 text-left transition hover:border-[#4dbab4]/25 hover:bg-[#146b74]/[0.08]">
                      <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.025] text-[#71c9c3]"><Icon name={index === 0 ? 'plus' : index === 1 ? 'spark' : 'message'} size={15} /></span>
                      <span><span className="block text-[11px] font-medium text-white/70 group-hover:text-white/90">{suggestion.title}</span><span className="mt-1 block text-[10px] text-white/35">{index === 0 ? 'Find the right words' : index === 1 ? 'Make sense of a thought' : 'Bring some shape to it'}</span></span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-[760px] flex-1 flex-col gap-7 py-8 sm:py-12">
                {messages.map((message) => (
                  <article key={message.id} className="flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md border border-[#4dbab4]/15 bg-[#146b74]/15 px-4 py-3 text-[13px] leading-6 text-white/85 sm:max-w-[75%]">{message.text}</p>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="shrink-0 px-4 pb-4 pt-2 sm:px-8 sm:pb-6">
            <form onSubmit={sendMessage} className="mx-auto w-full max-w-[760px]">
              <div className="rounded-[20px] border border-[#26777a]/25 bg-[#0e1012]/95 p-2 shadow-[0_16px_50px_rgba(0,0,0,0.48)] backdrop-blur-xl transition focus-within:border-[#3b9997]/50 focus-within:shadow-[0_0_0_3px_rgba(20,107,116,0.12),0_16px_50px_rgba(0,0,0,0.48)]">
                <textarea ref={inputRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(event) } }} rows={2} placeholder="Ask Nini anything…" aria-label="Message Nini" className="block max-h-36 min-h-[54px] w-full resize-none bg-transparent px-3.5 py-3 text-[13px] leading-6 text-white/90 outline-none placeholder:text-white/35" />
                <div className="flex items-center justify-between px-1 pb-0.5">
                  <div className="flex items-center gap-1">
                    <button type="button" aria-label="Attach a file" className="grid size-8 place-items-center rounded-lg text-white/35 transition hover:bg-white/[0.06] hover:text-white/75"><Icon name="paperclip" size={17} /></button>
                    <button type="button" aria-label="Use microphone" className="grid size-8 place-items-center rounded-lg text-white/35 transition hover:bg-white/[0.06] hover:text-white/75"><Icon name="mic" size={16} /></button>
                    <span className="ml-1 hidden text-[10px] text-white/25 sm:inline">Shift + Enter for a new line</span>
                  </div>
                  <button type="submit" disabled={!draft.trim()} aria-label="Send message" className="grid size-9 place-items-center rounded-xl border border-[#63d2c9]/20 bg-[#146b74]/35 text-[#a7eee6] shadow-[0_2px_14px_rgba(20,107,116,0.15)] transition hover:bg-[#146b74]/55 disabled:cursor-not-allowed disabled:opacity-35"><Icon name="send" size={16} /></button>
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] text-white/25">Nini can make mistakes. Consider checking important information.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Dashboard