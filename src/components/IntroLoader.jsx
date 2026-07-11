import { useEffect, useRef, useState } from "react";

export default function IntroLoader({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const W = canvas.width = window.innerWidth;
    const H = canvas.height = window.innerHeight;

    const kartImg = new Image();
    kartImg.src = "/kart.png";

    let animId;

    kartImg.onload = () => {
      const kartW = Math.min(W * 0.30, 340);
      const kartH = kartImg.naturalHeight * (kartW / kartImg.naturalWidth);

      let frame = 0;
      const FPS = 60;
      const T = (s) => Math.round(s * FPS);

      const IDLE_END   = T(0.8);
      const BAR_FADE   = T(0.6);
      const BAR_END    = T(1.2);
      const LAUNCH_END = T(2.2);
      const FLAG_START = T(2.1);
      const FLAG_END   = T(3.2);
      const HOLD_END   = T(3.5);
      const TOTAL      = T(3.6);

      const particles = [];

      function addSmoke(x, y) {
        if (particles.length > 60) return;
        particles.push({
          x, y,
          vx: (Math.random() - 0.6) * 0.8,
          vy: -(Math.random() * 1.2 + 0.3),
          life: 1.0,
          decay: Math.random() * 0.015 + 0.01,
          r: Math.random() * 12 + 6,
        });
      }

      function updateParticles() {
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx; p.y += p.vy; p.life -= p.decay; p.r += 0.3;
          if (p.life <= 0) particles.splice(i, 1);
        }
      }

      function drawParticles() {
        for (const p of particles) {
          ctx.save();
          ctx.globalAlpha = p.life * 0.35;
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      const easeIn  = (t) => t * t * t;
      const easeOut = (t) => 1 - Math.pow(1 - t, 3);

      function render() {
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, W, H);

        const kartY  = H * 0.52 - kartH / 2;
        const startX = W * 0.12;
        let kartX = startX, kartAlpha = 1;

        if (frame < IDLE_END) {
          kartX = startX + Math.sin(frame * 0.25) * 1.5;
        } else if (frame < LAUNCH_END) {
          const t = (frame - BAR_END) / (LAUNCH_END - BAR_END);
          const ease = easeIn(Math.max(0, t));
          kartX = startX + ease * (W * 1.1 - startX);
          if (t > 0.8) kartAlpha = 1 - (t - 0.8) / 0.2;
        } else {
          kartX = W * 1.2; kartAlpha = 0;
        }

        const rearWheelX = kartX + kartW * 0.22;
        const rearWheelY = kartY + kartH * 0.78;

        if (frame < LAUNCH_END - T(0.3)) {
          const cnt = frame < IDLE_END ? 2 : 4;
          for (let i = 0; i < cnt; i++) {
            addSmoke(rearWheelX + (Math.random() - 0.5) * 20, rearWheelY + (Math.random() - 0.5) * 8);
          }
        }
        updateParticles();

        // Progress bar
        const barY  = kartY + kartH * 0.88;
        const barHt = 4;
        const barSX = W * 0.04, barEX = W * 0.96, barTW = barEX - barSX;

        if (frame >= BAR_FADE) {
          const fade = Math.min(1, (frame - BAR_FADE) / T(0.3));
          ctx.save();
          ctx.globalAlpha = 0.25 * fade;
          ctx.fillStyle = "#555";
          ctx.beginPath();
          ctx.roundRect(barSX, barY, barTW, barHt, barHt / 2);
          ctx.fill();
          ctx.restore();

          if (frame < LAUNCH_END) {
            const fillW = Math.max(0, Math.min(barTW, kartX + kartW - barSX - kartW * 0.05));
            if (fillW > 0) {
              const gr = ctx.createLinearGradient(barSX, 0, barSX + fillW, 0);
              gr.addColorStop(0, "#8B6520"); gr.addColorStop(0.7, "#AE822B"); gr.addColorStop(1, "#F0D080");
              ctx.save();
              ctx.globalAlpha = fade;
              ctx.fillStyle = gr;
              ctx.beginPath();
              ctx.roundRect(barSX, barY, fillW, barHt, barHt / 2);
              ctx.fill();
              // Glint
              ctx.globalAlpha = fade * 0.9;
              const gg = ctx.createRadialGradient(barSX + fillW, barY + barHt / 2, 0, barSX + fillW, barY + barHt / 2, 14);
              gg.addColorStop(0, "rgba(255,230,120,0.9)"); gg.addColorStop(1, "rgba(255,230,120,0)");
              ctx.fillStyle = gg;
              ctx.fillRect(barSX + fillW - 14, barY - 6, 28, barHt + 12);
              ctx.restore();
            }
          } else {
            const gr = ctx.createLinearGradient(barSX, 0, barEX, 0);
            gr.addColorStop(0, "#8B6520"); gr.addColorStop(1, "#AE822B");
            ctx.save();
            ctx.globalAlpha = fade;
            ctx.fillStyle = gr;
            ctx.beginPath();
            ctx.roundRect(barSX, barY, barTW, barHt, barHt / 2);
            ctx.fill();
            ctx.restore();
          }
        }

        drawParticles();

        // Speed lines
        if (frame >= BAR_END && frame < LAUNCH_END) {
          const t = (frame - BAR_END) / (LAUNCH_END - BAR_END);
          ctx.save();
          for (let i = 0; i < 10; i++) {
            const ly  = H * (0.3 + Math.random() * 0.4);
            const lx2 = kartX - 10;
            const lx1 = lx2 - (60 + Math.random() * 120) * easeIn(t);
            ctx.globalAlpha = easeIn(t) * (0.15 + Math.random() * 0.2);
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(lx1, ly); ctx.lineTo(lx2, ly);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Kart
        if (kartAlpha > 0) {
          ctx.save();
          if (frame >= BAR_END && frame < LAUNCH_END) {
            const t = (frame - BAR_END) / (LAUNCH_END - BAR_END);
            const blurN    = Math.floor(easeIn(t) * 5);
            const blurStep = easeIn(t) * 30;
            for (let b = blurN; b > 0; b--) {
              ctx.globalAlpha = kartAlpha * (1 - b / blurN) * 0.18;
              ctx.drawImage(kartImg, kartX - b * blurStep, kartY, kartW, kartH);
            }
          }
          ctx.globalAlpha = kartAlpha;
          ctx.drawImage(kartImg, kartX, kartY, kartW, kartH);
          ctx.restore();
        }

        // Checkered flag wipe
        if (frame >= FLAG_START) {
          const t     = Math.min(1, (frame - FLAG_START) / (FLAG_END - FLAG_START));
          const ease  = easeOut(t);
          const wipeX = ease * (W + 80) - 80;
          const sq    = 40;
          const cols  = Math.ceil(W / sq) + 2;
          const rows  = Math.ceil(H / sq) + 1;
          ctx.save();
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              const x = wipeX + col * sq;
              const y = row * sq;
              if (x > W) continue;
              ctx.fillStyle = (row + col) % 2 === 0 ? "#000000" : "#ffffff";
              ctx.fillRect(x, y, sq, sq);
            }
          }
          ctx.restore();
          if (t >= 1) {
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, W, H);
          }
        }

        // Hold black after flag
        if (frame >= FLAG_END && frame < HOLD_END) {
          ctx.fillStyle = "#000000";
          ctx.fillRect(0, 0, W, H);
        }

        frame++;
        if (frame < TOTAL) {
          animId = requestAnimationFrame(render);
        } else {
          onComplete && onComplete();
        }
      }

      animId = requestAnimationFrame(render);
    };

    kartImg.onerror = () => {
      // Image failed to load — don't block the site
      onComplete && onComplete();
    };

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#000", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  );
}