"use client";

import { useEffect } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const CHARS = "AKACSTUDIO!@#$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>?[]{}|~+-=_";

function showToast() {
  const toast = document.createElement("div");
  toast.textContent = "// EASTER EGG UNLOCKED";
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(16px);
    background: #111111;
    color: #ED6D40;
    font-family: var(--font-inter, sans-serif);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.18px;
    text-transform: uppercase;
    padding: 10px 20px;
    border-radius: 100px;
    border: 1px solid rgba(237,109,64,0.3);
    z-index: 10000;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease, transform 0.3s ease;
  `;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(8px)";
    setTimeout(() => toast.remove(), 400);
  }, 2800);
}

export function triggerEgg() {
  // Orange flash
  const flash = document.createElement("div");
  flash.style.cssText =
    "position:fixed;inset:0;background:#ED6D40;opacity:0;pointer-events:none;z-index:9999;transition:opacity 0.15s ease";
  document.body.appendChild(flash);
  requestAnimationFrame(() => { flash.style.opacity = "0.15"; });
  setTimeout(() => {
    flash.style.opacity = "0";
    setTimeout(() => flash.remove(), 300);
  }, 180);

  showToast();

  // Collect all visible text nodes
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const text = node.textContent?.trim() ?? "";
      if (!text) return NodeFilter.FILTER_REJECT;
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toLowerCase();
      if (["script", "style", "noscript"].includes(tag)) return NodeFilter.FILTER_REJECT;
      const style = window.getComputedStyle(parent);
      if (
        style.display === "none" ||
        style.visibility === "hidden" ||
        parseFloat(style.opacity) === 0
      ) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes: { node: Text; original: string }[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const text = (n as Text).textContent ?? "";
    if (text.trim()) nodes.push({ node: n as Text, original: text });
  }

  const TOTAL = 1800;
  const startTime = Date.now();

  function tick() {
    const elapsed = Date.now() - startTime;
    const globalProgress = Math.min(elapsed / TOTAL, 1);

    nodes.forEach(({ node, original }, i) => {
      const staggerDelay = (i / nodes.length) * TOTAL * 0.45;
      const nodeProgress = Math.max(
        0,
        Math.min((elapsed - staggerDelay) / (TOTAL * 0.65), 1)
      );
      const resolvedCount = Math.floor(nodeProgress * original.length);

      let result = "";
      for (let j = 0; j < original.length; j++) {
        const ch = original[j];
        if (ch === " " || ch === "\n" || ch === "\t" || ch === "\u00A0") {
          result += ch;
        } else if (j < resolvedCount) {
          result += ch;
        } else {
          result += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      node.textContent = result;
    });

    if (globalProgress < 1) {
      requestAnimationFrame(tick);
    } else {
      nodes.forEach(({ node, original }) => { node.textContent = original; });
    }
  }

  requestAnimationFrame(tick);
}

export default function KonamiEgg() {
  useEffect(() => {
    let seq: string[] = [];

    const onKey = (e: KeyboardEvent) => {
      seq.push(e.key);
      if (seq.length > KONAMI.length) seq = seq.slice(-KONAMI.length);
      if (seq.join(",") === KONAMI.join(",")) {
        triggerEgg();
        seq = [];
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
