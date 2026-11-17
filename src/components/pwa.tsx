"use client";

import { useEffect, useState } from "react";

type InstallEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).catch((error) => {
      console.error("FD Events offline support could not be registered", error);
    });
  }, []);
  return null;
}

export function InstallApp() {
  const [prompt, setPrompt] = useState<InstallEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const mode = window.matchMedia("(display-mode: standalone)");
    const syncMode = () => setInstalled(mode.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setPrompt(event as InstallEvent);
    };
    const onInstalled = () => { setInstalled(true); setPrompt(null); };
    syncMode();
    mode.addEventListener("change", syncMode);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      mode.removeEventListener("change", syncMode);
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    setError("");
    if (!prompt) { setShowHelp((value) => !value); return; }
    try {
      await prompt.prompt();
      const choice = await prompt.userChoice;
      if (choice.outcome === "accepted") setInstalled(true);
    } catch {
      setError("Use your browser menu to install FD Events or add it to your home screen.");
    } finally {
      setPrompt(null);
    }
  }

  if (installed) return null;
  return (
    <div className="max-w-xl text-sm text-cream/80">
      <button type="button" onClick={install} className="btn btn-outline-light" aria-expanded={prompt ? undefined : showHelp} aria-controls={prompt ? undefined : "install-help"}>
        Add FD Events to your home screen
      </button>
      {showHelp && (
        <p id="install-help" className="mt-4">
          On iPhone or iPad, open this site in Safari, tap Share, then Add to Home Screen.
          On Android or desktop, open your browser menu and choose Install app or Add to Home Screen if available.
        </p>
      )}
      {error && <p role="status" className="mt-4">{error}</p>}
    </div>
  );
}
