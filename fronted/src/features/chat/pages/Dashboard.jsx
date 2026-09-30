import { useEffect, useMemo, useRef, useState } from "react";
import {
  LuMenu,
  LuMessageCircle,
  LuMic,
  LuPaperclip,
  LuPlus,
  LuSearch,
  LuSend,
  LuSettings,
  LuSparkles,
  LuX,
} from "react-icons/lu";
import { useChat } from "../hooks/useChat.js";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentChatId } from "../chat.slice.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Nav from "./Nav";

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
};

const Icon = ({ name, size = 18, className = "" }) => {
  const IconComponent = icons[name];
  return <IconComponent aria-hidden="true" className={className} size={size} />;
};

const suggestions = [
  {
    title: "Write something",
    prompt: "Help me write something clear and compelling.",
  },
  {
    title: "Explore an idea",
    prompt: "I have an idea I want to think through.",
  },
  { title: "Plan my day", prompt: "Help me make a thoughtful plan for today." },
];

const Dashboard = () => {
  const chat = useChat();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  const chats = useSelector((state) => state.chat?.chat) ?? {};
  const currentChatId = useSelector((state) => state.chat?.currentChatId);
  const currentMessages = chats[currentChatId]?.messages ?? [];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  useEffect(() => {
    chat.initializeSocket();
    chat.handleGetChats?.(); // apne hook ke function ka naam use karo
  }, []);

  const filteredConversations = useMemo(
    () =>
      Object.values(chats)
        .filter((c) =>
          (c.title || "New chat").toLowerCase().includes(search.toLowerCase()),
        )
        .reverse(), // latest upar
    [chats, search],
  );

  const startNewChat = () => {
    dispatch(setCurrentChatId(null));
    setDraft("");
    setSidebarOpen(false);
    inputRef.current?.focus();
  };

  const openConversation = (conversation) => {
    chat.handleOpenChat(conversation._id);
    setSidebarOpen(false);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages.length]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    await chat.handleSetMessage({ message: text, chatId: currentChatId });
  };

  const displayName = user?.name || user?.username || "Your account";
  const initials =
    displayName === "Your account"
      ? "N"
      : displayName.slice(0, 1).toUpperCase();

  return (
    <main className="relative flex h-dvh min-h-[540px] w-full overflow-hidden bg-[#0C0E0F] text-[#FFFFFF] selection:bg-[#21C0D0]/70">
      <Nav
        Icon={Icon}
        startNewChat={startNewChat}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        search={search}
        setSearch={setSearch}
        filteredConversations={filteredConversations}
        currentChatId={currentChatId}
        openConversation={openConversation}
        displayName={displayName}
        initials={initials}
      />

      <section className="relative flex min-w-0 flex-1 flex-col bg-[radial-gradient(ellipse_at_50%_0%,rgba(33,192,208,0.12),transparent_45%)]">
        <header className="z-10 flex h-[60px] shrink-0 items-center justify-between border-b border-[#C4C8D0]/10 px-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
              className="grid size-9 shrink-0 place-items-center rounded-lg text-[#8E95A2] hover:bg-[#23272D] md:hidden"
            >
              <Icon name="menu" size={18} />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-[14px] font-semibold text-[#FFFFFF]">
                {chats[currentChatId]?.title ||
                  (currentMessages.length ? "New conversation" : "New chat")}
              </h1>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#21C0D0] shadow-[0_0_8px_rgba(33,192,208,0.8)]" />
                <span className="text-[10.5px] text-[#8E95A2]">
                  Nini <span className="text-[#C4C8D0]">·</span> Ready to help
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={startNewChat}
            className="hidden items-center gap-2 rounded-[9px] border border-[#C4C8D0]/10 bg-[#21C0D0] px-3 py-2 text-[12px] font-medium text-black transition hover:bg-[#21C0D0]/80 sm:flex"
          >
            <Icon name="plus" size={14} /> New chat
          </button>
        </header>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-8">
            {currentMessages.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center pb-8 pt-10 text-center">
                <div className="relative mb-[22px] grid size-[60px] place-items-center rounded-[19px] border border-[#21C0D0]/25 bg-[#1A1D21] text-[#21C0D0] shadow-[0_0_50px_rgba(33,192,208,0.15)]">
                  <Icon name="spark" size={26} />
                </div>
                <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#21C0D0]">
                  A little room to think
                </p>
                <h2 className="text-balance text-[34px] font-semibold tracking-[-0.04em] text-[#FFFFFF] sm:text-[48px]">
                  How can I help you today?
                </h2>
                <p className="mt-3 max-w-[540px] text-[15px] leading-7 text-[#8E95A2]">
                  A question, a half-formed idea, or a problem to untangle. We
                  can start anywhere.
                </p>

                <div className="mt-8 grid w-full max-w-[680px] grid-cols-1 gap-2.5 sm:grid-cols-3">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={suggestion.title}
                      onClick={() => {
                        setDraft(suggestion.prompt);
                        inputRef.current?.focus();
                      }}
                      className="group flex min-h-[82px] items-center gap-3 rounded-[13px] border border-[#C4C8D0]/10 bg-[#1A1D21] px-3.5 text-left transition hover:border-[#21C0D0]/40 hover:bg-[#23272D]"
                    >
                      <span className="grid size-[30px] shrink-0 place-items-center rounded-[9px] border border-[#C4C8D0]/10 bg-[#121417] text-[#21C0D0]">
                        <Icon
                          name={
                            index === 0
                              ? "plus"
                              : index === 1
                                ? "spark"
                                : "message"
                          }
                          size={14}
                        />
                      </span>
                      <span>
                        <span className="block text-[14px] font-semibold text-[#C4C8D0] group-hover:text-[#FFFFFF]">
                          {suggestion.title}
                        </span>
                        <span className="mt-0.5 block text-[11.5px] text-[#8E95A2]">
                          {index === 0
                            ? "Find the right words"
                            : index === 1
                              ? "Make sense of a thought"
                              : "Bring some shape to it"}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-4 py-8 sm:py-12">
                {currentMessages.map((message, index) => {
                  const isUser =
                    message.role === "user" || message.role === "human";
                  return (
                    <article
                      key={message._id || index}
                      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[78%] rounded-2xl px-4 py-3 text-[15px] leading-7 ${
                          isUser
                            ? "whitespace-pre-wrap rounded-br-md border border-[#21C0D0]/25 bg-[#21C0D0] text-[#000000]"
                            : "prose prose-invert prose-p:leading-relaxed prose-pre:p-0 max-w-none rounded-bl-md border border-[#C4C8D0]/10 bg-[#1A1D21] text-[#FFFFFF]"
                        }`}
                      >
                        {isUser ? (
                          message.content
                        ) : (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {message.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </article>
                  );
                })}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          <div className="shrink-0 px-4 pb-4 pt-2 sm:px-8 sm:pb-6">
            <form
              onSubmit={sendMessage}
              className="mx-auto w-full max-w-[720px]"
            >
              <div className="rounded-[20px] border border-[#21C0D0]/25 bg-[#1A1D21] p-2 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition focus-within:border-[#21C0D0]/50 focus-within:shadow-[0_0_0_3px_rgba(33,192,208,0.14),0_18px_40px_rgba(0,0,0,0.45)]">
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage(event);
                    }
                  }}
                  rows={2}
                  placeholder="Ask Nini anything…"
                  aria-label="Message Nini"
                  className="block max-h-36 min-h-[50px] w-full resize-none bg-transparent px-3.5 py-2.5 text-[15px] leading-7 text-[#FFFFFF] outline-none placeholder:text-[#8E95A2]"
                />

                <div className="flex items-center justify-between px-1 pb-0.5">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      aria-label="Attach a file"
                      className="grid size-8 place-items-center rounded-lg text-[#8E95A2] transition hover:bg-[#23272D] hover:text-[#C4C8D0]"
                    >
                      <Icon name="paperclip" size={16} />
                    </button>
                    <button
                      type="button"
                      aria-label="Use microphone"
                      className="grid size-8 place-items-center rounded-lg text-[#8E95A2] transition hover:bg-[#23272D] hover:text-[#C4C8D0]"
                    >
                      <Icon name="mic" size={15} />
                    </button>
                    <span className="ml-1 hidden text-[11px] text-[#8E95A2] sm:inline">
                      Shift + Enter for a new line
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    aria-label="Send message"
                    className="grid size-9 place-items-center rounded-[12px] border border-[#21C0D0]/35 bg-[#21C0D0] text-[#000000] shadow-[0_4px_14px_rgba(33,192,208,0.3)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Icon name="send" size={15} />
                  </button>
                </div>
              </div>

              <p className="mt-2.5 text-center text-[11px] text-[#8E95A2]">
                Nini can make mistakes. Consider checking important information.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
