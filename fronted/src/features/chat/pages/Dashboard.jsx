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

const chats = useSelector((state)=> state.chat.chats)
const currentChatId = useSelector((state)=> state.chat.currentChatId)


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
    // Main wrapper — full-screen container, deep dark background theme
    <main className="relative flex h-dvh min-h-[540px] w-full overflow-hidden bg-[#050607] text-white selection:bg-[#1c8f86]/40">

      {/* Dark overlay shown behind the sidebar on mobile when it's open.
          Clicking it closes the sidebar. Hidden on desktop (md:hidden). */}
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/65 backdrop-blur-sm md:hidden"
        />
      )}

      {/* ===================== SIDEBAR (left panel) ===================== */}
      {/* Contains: logo, "New chat" button, search box, chat history list, settings/profile.
          On mobile it slides in/out using translate-x; on desktop (md:) it's always visible. */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[272px] shrink-0 flex-col border-r border-white/[0.06] bg-gradient-to-b from-[#0a0c0d] to-[#060708] px-3.5 pb-4 pt-[18px] shadow-[12px_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* --- Top row: App logo/name + mobile close button --- */}
        <div className="mb-[22px] flex h-9 items-center justify-between px-0.5">
          {/* Clicking the logo/name starts a new chat (acts like "home") */}
          <button
            onClick={startNewChat}
            className="group flex items-center gap-2.5 rounded-lg text-left"
            aria-label="Nini home"
          >
            <span className="grid size-[34px] place-items-center rounded-[10px] bg-[radial-gradient(circle_at_30%_20%,#2fb5a8,#0d4f49)] text-[#e9fffb] shadow-[inset_0_0_0_1px_rgba(95,232,216,0.25),0_6px_18px_rgba(28,143,134,0.25)] transition group-hover:shadow-[inset_0_0_0_1px_rgba(95,232,216,0.5),0_6px_18px_rgba(28,143,134,0.35)]">
              <Icon name="spark" size={17} />
            </span>
            <span className="text-[17px] font-semibold tracking-[-0.01em]">Nini</span>
          </button>

          {/* Close (X) button — only visible on mobile (md:hidden), closes the sidebar */}
          <button
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="grid size-8 place-items-center rounded-[9px] text-white/50 hover:bg-white/[0.06] hover:text-white md:hidden"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* --- "New chat" button --- */}
        {/* Clicking this starts a brand-new conversation (clears current chat) */}
        <button
          onClick={startNewChat}
          className="mb-3 flex h-10 items-center gap-2.5 rounded-[11px] border border-[#5fe8d8]/20 bg-gradient-to-b from-[#1f998f]/20 to-[#1f998f]/10 px-3.5 text-[13px] font-semibold text-[#dcfffa] transition hover:border-[#5fe8d8]/45 hover:bg-[#1f998f]/30"
        >
          <Icon name="plus" size={16} /> New chat
          {/* Keyboard shortcut hint (Cmd+K) shown on the right side */}
          <span className="ml-auto rounded-[5px] border border-white/[0.08] px-1.5 py-0.5 text-[10px] font-normal text-white/30">⌘ K</span>
        </button>

        {/* --- Search box --- */}
        {/* Lets the user filter/search through chat history.
            "search" is the current typed text, stored in state via setSearch */}
        <label className="mb-[22px] flex h-[38px] items-center gap-2.5 rounded-[11px] border border-white/[0.06] bg-white/[0.03] px-3 text-white/30 transition focus-within:border-[#5fe8d8]/35">
          <Icon name="search" size={15} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search chats"
            className="min-w-0 flex-1 bg-transparent text-[12.5px] text-white outline-none placeholder:text-white/30"
          />
          {/* Keyboard shortcut hint (Cmd+F) */}
          <span className="text-[10px] text-white/25">⌘ F</span>
        </label>

        {/* --- "Chat history" section heading + count of matching chats --- */}
        <div className="mb-2 flex items-center justify-between px-2">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/30">Chat history</h2>
          <span className="text-[10px] text-white/25">{filteredConversations.length}</span>
        </div>

        {/* --- Scrollable list of past conversations --- */}
        {/* filteredConversations = conversations matching the search text.
            Clicking one opens that conversation. Highlights the currently active one. */}
        <nav
          aria-label="Chat history"
          className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin]"
        >
          {filteredConversations.length ? (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => openConversation(conversation)}
                className={`group mb-0.5 flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2.5 text-left text-[12.5px] transition ${
                  activeConversation?.id === conversation.id
                    ? 'bg-[#1c8f86]/16 text-white' // highlighted style for the active chat
                    : 'text-white/50 hover:bg-[#1c8f86]/10 hover:text-white/90'
                }`}
              >
                <Icon
                  name="message"
                  size={15}
                  className={`shrink-0 ${
                    activeConversation?.id === conversation.id ? 'text-[#5fe8d8]' : 'text-white/35 group-hover:text-[#5fe8d8]/70'
                  }`}
                />
                <span className="truncate">{conversation.title}</span>
              </button>
            ))
          ) : (
            // Shown when search finds no matching chats
            <p className="px-2.5 py-3 text-xs text-white/25">No matching chats</p>
          )}
        </nav>

        {/* --- Bottom section: Settings + user profile --- */}
        <div className="mt-2.5 border-t border-white/[0.06] pt-2.5">
          <button className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-2.5 text-left text-[12.5px] text-white/50 transition hover:bg-white/[0.04] hover:text-white">
            <Icon name="settings" size={16} /> Settings
          </button>
          {/* User avatar (initials), name, and workspace label */}
          <button className="mt-0.5 flex w-full items-center gap-2.5 rounded-[11px] px-2 py-2 transition hover:bg-white/[0.04]">
            <span className="grid size-[30px] shrink-0 place-items-center rounded-full border border-[#5fe8d8]/25 bg-gradient-to-br from-[#1c8f86] to-[#0a3d38] text-[11px] font-semibold text-[#d3f9f2]">
              {initials}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[12.5px] text-white/85">{displayName}</span>
              <span className="mt-0.5 block text-[10.5px] text-white/25">Personal workspace</span>
            </span>
            <span className="text-white/25">···</span>
          </button>
        </div>
      </aside>

      {/* ===================== MAIN CHAT AREA (right side) ===================== */}
      <section className="relative flex min-w-0 flex-1 flex-col bg-[radial-gradient(ellipse_at_50%_0%,rgba(28,143,134,0.09),transparent_45%)]">

        {/* --- Top header bar --- */}
        <header className="z-10 flex h-[60px] shrink-0 items-center justify-between border-b border-white/[0.06] px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            {/* Hamburger menu button — only on mobile, opens the sidebar */}
            <button
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-white/50 hover:bg-white/[0.05] md:hidden"
            >
              <Icon name="menu" size={18} />
            </button>
            <div className="min-w-0">
              {/* Title: shows conversation title, or "New conversation"/"New chat" if none yet */}
              <h1 className="truncate text-[13px] font-semibold text-white/90">
                {activeConversation?.title || (messages.length ? 'New conversation' : 'New chat')}
              </h1>
              {/* Small status indicator: green dot + "Ready to help" text */}
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#5fe8d8] shadow-[0_0_8px_rgba(95,232,216,0.8)]" />
                <span className="text-[10.5px] text-white/30">Nini <span className="text-white/15">·</span> Ready to help</span>
              </div>
            </div>
          </div>
          {/* "New chat" button in header — hidden on mobile (sm:flex), visible on larger screens */}
          <button
            onClick={startNewChat}
            className="hidden items-center gap-2 rounded-[9px] border border-white/[0.07] px-3 py-2 text-[11.5px] text-white/50 transition hover:border-[#1c8f86]/50 hover:text-white/90 sm:flex"
          >
            <Icon name="plus" size={14} /> New chat
          </button>
        </header>

        {/* --- Body: messages area + input box --- */}
        <div className="flex min-h-0 flex-1 flex-col">

          {/* Scrollable messages container */}
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-8">
            {messages.length === 0 ? (
              // ---- EMPTY STATE: shown when there are no messages yet ----
              <div className="flex flex-1 flex-col items-center justify-center pb-8 pt-10 text-center">
                {/* Big icon badge */}
                <div className="relative mb-[22px] grid size-[60px] place-items-center rounded-[19px] border border-[#5fe8d8]/25 bg-[radial-gradient(circle_at_30%_25%,rgba(95,232,216,0.28),rgba(28,143,134,0.10))] text-[#a8f4ea] shadow-[0_0_50px_rgba(28,143,134,0.22),inset_0_0_18px_rgba(28,143,134,0.15)]">
                  <Icon name="spark" size={26} />
                </div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5fe8d8]/80">A little room to think</p>
                <h2 className="text-balance text-[27px] font-semibold tracking-[-0.02em] text-white/90 sm:text-[32px]">How can I help you today?</h2>
                <p className="mt-2.5 max-w-[360px] text-[13.5px] leading-6 text-white/45">
                  A question, a half-formed idea, or a problem to untangle. We can start anywhere.
                </p>

                {/* Suggestion cards (quick-start prompts) — clicking one fills the input box */}
                <div className="mt-8 grid w-full max-w-[680px] grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.title}
                      onClick={() => {
                        setDraft(suggestion.prompt); // put suggestion text into the input box
                        inputRef.current?.focus();   // focus the textarea
                      }}
                      className="group flex min-h-[76px] items-center gap-3 rounded-[13px] border border-white/[0.06] bg-white/[0.02] px-3.5 text-left transition hover:border-[#5fe8d8]/30 hover:bg-[#1c8f86]/[0.08]"
                    >
                      <span className="grid size-[30px] shrink-0 place-items-center rounded-[9px] border border-white/[0.06] bg-white/[0.03] text-[#5fe8d8]">
                        {/* Different icon per suggestion index */}
                        <Icon name={index === 0 ? 'plus' : index === 1 ? 'spark' : 'message'} size={14} />
                      </span>
                      <span>
                        <span className="block text-[12px] font-semibold text-white/80 group-hover:text-white">{suggestion.title}</span>
                        <span className="mt-0.5 block text-[11px] text-white/30">
                          {index === 0 ? 'Find the right words' : index === 1 ? 'Make sense of a thought' : 'Bring some shape to it'}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // ---- MESSAGE LIST: shown once there's at least one message ----
              <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-4 py-8 sm:py-12">
                {chats[currentChatId]?.messages.map((message) => (
                  // NOTE: every message bubble is right-aligned (justify-end) here —
                  // this only renders the user's own messages; there's no separate
                  // styling block for AI/assistant replies in this snippet.
                  <article key={message.id} className="flex justify-end">
                    <p className="max-w-[78%] rounded-2xl rounded-br-md border border-[#5fe8d8]/18 bg-gradient-to-br from-[#1c8f86]/28 to-[#1c8f86]/14 px-4 py-3 text-[13.5px] leading-6 text-[#eafffb] sm:max-w-[75%]">
                      {message.text}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* --- Message input form (bottom of screen) --- */}
          <div className="shrink-0 px-4 pb-4 pt-2 sm:px-8 sm:pb-6">
            <form onSubmit={sendMessage} className="mx-auto w-full max-w-[720px]">
              <div className="rounded-[20px] border border-[#1c8f86]/28 bg-[#0b0d0e]/95 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition focus-within:border-[#5fe8d8]/50 focus-within:shadow-[0_0_0_3px_rgba(28,143,134,0.14),0_18px_40px_rgba(0,0,0,0.45)]">

                {/* Auto-resizing-ish textarea for typing the message.
                    Pressing Enter (without Shift) submits the form; Shift+Enter makes a new line. */}
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage(event);
                    }
                  }}
                  rows={2}
                  placeholder="Ask Nini anything…"
                  aria-label="Message Nini"
                  className="block max-h-36 min-h-[50px] w-full resize-none bg-transparent px-3.5 py-2.5 text-[13.5px] leading-6 text-white/90 outline-none placeholder:text-white/30"
                />

                {/* Bottom row of the input: attach/mic buttons on left, send button on right */}
                <div className="flex items-center justify-between px-1 pb-0.5">
                  <div className="flex items-center gap-1">
                    <button type="button" aria-label="Attach a file" className="grid size-8 place-items-center rounded-lg text-white/35 transition hover:bg-white/[0.06] hover:text-white/80">
                      <Icon name="paperclip" size={16} />
                    </button>
                    <button type="button" aria-label="Use microphone" className="grid size-8 place-items-center rounded-lg text-white/35 transition hover:bg-white/[0.06] hover:text-white/80">
                      <Icon name="mic" size={15} />
                    </button>
                    {/* Hint text, hidden on small screens */}
                    <span className="ml-1 hidden text-[10px] text-white/25 sm:inline">Shift + Enter for a new line</span>
                  </div>

                  {/* Send button — disabled if the textarea is empty/whitespace-only */}
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    aria-label="Send message"
                    className="grid size-9 place-items-center rounded-[12px] border border-[#5fe8d8]/30 bg-gradient-to-br from-[#22ada0] to-[#0d4f49] text-[#eafffb] shadow-[0_4px_14px_rgba(28,143,134,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Icon name="send" size={15} />
                  </button>
                </div>
              </div>

              {/* Disclaimer text below the input */}
              <p className="mt-2.5 text-center text-[10px] text-white/25">Nini can make mistakes. Consider checking important information.</p>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
  
}

export default Dashboard