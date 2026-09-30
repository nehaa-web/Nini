const Nav = ({
  Icon,
  startNewChat,
  sidebarOpen,
  setSidebarOpen,
  search,
  setSearch,
  filteredConversations,
  currentChatId,
  openConversation,
  displayName,
  initials,
}) => {
  return (
    <>
      {sidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/65 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[272px] shrink-0 flex-col border-r border-[#C4C8D0]/10 bg-[#121417] px-3.5 pb-4 pt-[18px] shadow-[12px_0_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-[22px] flex h-9 items-center justify-between px-0.5">
          <button
            onClick={startNewChat}
            className="group flex items-center gap-2.5 rounded-lg text-left"
            aria-label="Nini home"
          >
            <span className="grid size-[34px] place-items-center rounded-[10px] bg-[#21C0D0] text-[#000000] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_6px_18px_rgba(33,192,208,0.25)] transition">
              <Icon name="spark" size={17} />
            </span>
            <span className="text-[18px] font-bold tracking-[-0.03em] text-[#FFFFFF]">
              Nini
            </span>
          </button>

          <button
            aria-label="Close navigation"
            onClick={() => setSidebarOpen(false)}
            className="grid size-8 place-items-center rounded-[9px] text-[#8E95A2] hover:bg-[#23272D] hover:text-[#FFFFFF] md:hidden"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        <button
          onClick={startNewChat}
          className="mb-3 flex h-10 items-center gap-2.5 rounded-[11px] border border-[#21C0D0]/30 bg-[#21C0D0]/10 px-3.5 text-[18px] font-semibold text-[#C4C8D0] transition hover:border-[#21C0D0]/60 hover:bg-[#21C0D0]/15"
        >
          <Icon name="plus" size={16} /> New chat
          <span className="ml-auto rounded-[5px] border border-[#C4C8D0]/15 px-1.5 py-0.5 text-[10px] font-normal text-[#8E95A2]">
            ⌘ K
          </span>
        </button>

        <label className="mb-[22px] flex h-[40px] items-center gap-2.5 rounded-[11px] border border-[#C4C8D0]/10 bg-[#1A1D21] px-3 text-[#8E95A2] transition focus-within:border-[#21C0D0]/60">
          <Icon name="search" size={15} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search chats"
            className="min-w-0 flex-1 bg-transparent text-[14.5px] text-[#FFFFFF] outline-none placeholder:text-[#8E95A2]"
          />
          <span className="text-[10px] text-[#8E95A2]">⌘ F</span>
        </label>

        <div className="mb-2 flex items-center justify-between px-2">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#8E95A2]">
            Chat history
          </h2>
          <span className="text-[10px] text-[#8E95A2]">
            {filteredConversations.length}
          </span>
        </div>

        <nav
          aria-label="Chat history"
          className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-color:rgba(255,255,255,0.1)_transparent] [scrollbar-width:thin]"
        >
          {filteredConversations.length ? (
            filteredConversations.map((conversation) => (
              <button
                key={conversation._id}
                onClick={() => openConversation(conversation)}
                className={`group mb-0.5 flex w-full items-center gap-2.5 rounded-[9px] px-2.5 py-2.5 text-left text-[13px] transition ${
                  currentChatId === conversation._id
                    ? "bg-[#23272D] text-[#FFFFFF]"
                    : "text-[#8E95A2] hover:bg-[#23272D] hover:text-[#C4C8D0]"
                }`}
              >
                <Icon
                  name="message"
                  size={15}
                  className={`shrink-0 ${
                    currentChatId === conversation._id
                      ? "text-[#21C0D0]"
                      : "text-[#8E95A2] group-hover:text-[#21C0D0]"
                  }`}
                />
                <span className="truncate">
                  {conversation.title || "New chat"}
                </span>
              </button>
            ))
          ) : (
            <p className="px-2.5 py-3 text-xs text-[#8E95A2]">
              No matching chats
            </p>
          )}
        </nav>

        <div className="mt-2.5 border-t border-[#C4C8D0]/10 pt-2.5">
          <button className="flex w-full items-center gap-2.5 rounded-[9px] px-2 py-2.5 text-left text-[18px] text-[#8E95A2] transition hover:bg-[#23272D] hover:text-[#FFFFFF]">
            <Icon name="settings" size={16} /> Settings
          </button>
          <button className="mt-0.5 flex w-full items-center gap-2.5 rounded-[11px] px-2 py-2 transition hover:bg-[#23272D]">
            <span className="grid size-[30px] shrink-0 place-items-center rounded-full border border-[#21C0D0]/30 bg-[#21C0D0] text-[11px] font-semibold text-[#000000]">
              {initials}
            </span>
            <span className="min-w-0 flex-1 text-left">
              <span className="block truncate text-[13px] font-medium text-[#FFFFFF]">
                {displayName}
              </span>
              <span className="mt-0.5 block text-[10.5px] text-[#8E95A2]">
                Personal workspace
              </span>
            </span>
            <span className="text-[#8E95A2]">···</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Nav;
