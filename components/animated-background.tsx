"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const waves = Array.from({ length: 8 }, () => ({
      value: Math.random() * 0.5 + 0.1,
      target: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.02 + 0.01,
    }));

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }

    function draw() {
      ctx!.fillStyle = "rgb(5, 5, 15)";
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height);

      waves.forEach((w, i) => {
        if (Math.random() < 0.01) w.target = Math.random() * 0.7 + 0.1;
        w.value += (w.target - w.value) * w.speed;

        const freq = w.value * 7;
        ctx!.beginPath();
        for (let x = 0; x < canvas!.width; x++) {
          const nx = (x / canvas!.width) * 2 - 1;
          const px = nx + i * 0.04 + freq * 0.03;
          const py =
            Math.sin(px * 10 + time) *
            Math.cos(px * 2) *
            freq *
            0.1 *
            ((i + 1) / 8);
          const y = (py + 1) * (canvas!.height / 2);
          x === 0 ? ctx!.moveTo(x, y) : ctx!.lineTo(x, y);
        }
        const intensity = Math.min(1, freq * 0.3);
        const r = Math.round(79 + intensity * 100);
        const g = Math.round(70 + intensity * 130);
        ctx!.lineWidth = 1 + i * 0.3;
        ctx!.strokeStyle = `rgba(${r},${g},229,0.6)`;
        ctx!.shadowColor = `rgba(${r},${g},229,0.5)`;
        ctx!.shadowBlur = 5;
        ctx!.stroke();
        ctx!.shadowBlur = 0;
      });

      time += 0.02;
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full" />;
}
