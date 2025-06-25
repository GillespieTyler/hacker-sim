import { useState, useEffect, useRef } from "react";

export default function HackerSim() {
  const [logs, setLogs] = useState(["Welcome to Tyler's Terminal. Type 'help' to begin."]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const commands = {
    help: "Available commands: help, whoami, ls, cat resume.txt, clear, exit",
    whoami: "tyler_gillespie (root) 🧑‍💻",
    ls: "resume.txt  projects  secrets.txt",
    "cat resume.txt": "Here's a link to my resume: https://example.com/resume.pdf",
    "cat secrets.txt": "flag{thanks_for_checking_out_my_site}",
    clear: "CLEAR",
    exit: "Session terminated. Refresh to restart."
  };

  const handleCommand = (cmd) => {
    if (commands.hasOwnProperty(cmd)) {
      if (commands[cmd] === "CLEAR") {
        setLogs([]);
      } else {
        setLogs((prev) => [...prev, `> ${cmd}`, commands[cmd]]);
      }
    } else {
      setLogs((prev) => [...prev, `> ${cmd}`, `command not found: ${cmd}`]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(input.trim());
    setInput("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="bg-black text-green-400 font-mono min-h-screen p-4">
      <div className="overflow-y-auto max-h-[80vh]">
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSubmit} className="mt-4 flex">
        <span className="pr-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-black text-green-400 outline-none flex-grow"
          autoFocus
        />
      </form>
    </div>
  );
}
