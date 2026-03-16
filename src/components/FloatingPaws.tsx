import { useEffect, useState } from "react";
const emojis = ["🐾", "🐱", "🐶", "🐰"];
interface Paw {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

export function FloatingPaws() {
  const [paws, setPaws] = useState<Paw[]>([]);

  useEffect(() => {
    // Generate a fixed number of paws dynamically on mount
    const newPaws = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      // Either spawn on the left 0-15% or the right 85-100%
      left: Math.random() > 0.5 ? Math.random() * 15 : 85 + Math.random() * 15,
      size: 1 + Math.random() * 2, // Random size between 1rem and 3rem
      duration: 15 + Math.random() * 20, // Floating duration
      delay: Math.random() * 10, // Random delay
    }));
    setPaws(newPaws);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
      {paws.map((paw) => (
        <div
          key={paw.id}
          className="absolute bottom-[-10%] opacity-20 text-muted-foreground animate-float"
          style={{
            left: `${paw.left}%`,
            fontSize: `${paw.size}rem`,
            animationDuration: `${paw.duration}s`,
            animationDelay: `${paw.delay}s`,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear'
          }}
        >
          {paw.emoji}
        </div>
      ))}
    </div>
  );
}
