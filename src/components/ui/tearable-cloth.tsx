"use client";

import React, { useEffect, useRef } from "react";

export const TearableCloth = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const parent = canvas.parentElement;
    if (!parent) return;

    let width = parent.clientWidth;
    let height = parent.clientHeight;
    canvas.width = width;
    canvas.height = height;

    // Fixed grid resolution for consistent performance and coverage
    const cols = 45;
    const rows = 30;
    
    let spacing_x = width / cols;
    let spacing_y = height / rows;

    // Simulation constraints
    const physics_accuracy = 3;
    const mouse_influence = 65; // Radius to push particles away (increased for better response)
    const mouse_cut = 35;       // Radius to slice/tear constraints (increased from 18 to make tearing much easier)
    const gravity = 0;          // Weightless so it stays flat like a sheet of paper until torn

    let points: Point[] = [];
    const mouse = {
      x: -1000, // Start off-screen
      y: -1000,
      px: -1000,
      py: -1000,
    };

    let animationFrameId: number;
    let lastTime = Date.now();

    class Point {
      x: number;
      y: number;
      px: number;
      py: number;
      vx: number;
      vy: number;
      pin_x: number | null;
      pin_y: number | null;
      constraints: Constraint[];

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.vx = 0;
        this.vy = 0;
        this.pin_x = null;
        this.pin_y = null;
        this.constraints = [];
      }

      update(delta: number) {
        // Handle cursor hover interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse_cut) {
          this.break_all_constraints();
        } else if (dist < mouse_influence) {
          const force = (mouse_influence - dist) / mouse_influence;
          const angle = Math.atan2(dy, dx);
          
          // Push away from cursor
          this.vx += Math.cos(angle) * force * 150;
          this.vy += Math.sin(angle) * force * 150;

          // Drag effect from cursor movement
          this.vx += (mouse.x - mouse.px) * force * 12;
          this.vy += (mouse.y - mouse.py) * force * 12;
        }

        if (gravity > 0) {
          this.add_force(0, gravity);
        }

        // Verlet physics integration
        const nx = this.x + (this.x - this.px) * 0.98 + (this.vx / 2) * delta;
        const ny = this.y + (this.y - this.py) * 0.98 + (this.vy / 2) * delta;

        this.px = this.x;
        this.py = this.y;
        this.x = nx;
        this.y = ny;
        this.vx = 0;
        this.vy = 0;
      }

      resolve_constraints() {
        if (this.pin_x !== null && this.pin_y !== null) {
          this.x = this.pin_x;
          this.y = this.pin_y;
          return;
        }

        this.constraints = this.constraints.filter(c => !c.broken);

        let i = this.constraints.length;
        while (i--) {
          this.constraints[i].resolve();
        }

        // Keep inside bounds
        if (this.x > width) {
          this.x = 2 * width - this.x;
        } else if (this.x < 1) {
          this.x = 2 - this.x;
        }
        if (this.y > height) {
          this.y = 2 * height - this.y;
        } else if (this.y < 1) {
          this.y = 2 - this.y;
        }
      }

      attach(point: Point, length: number) {
        this.constraints.push(new Constraint(this, point, length));
      }

      break_all_constraints() {
        this.constraints.forEach(c => c.broken = true);
        this.constraints = [];
        breakConnectionsTo(this);
      }

      add_force(x: number, y: number) {
        this.vx += x;
        this.vy += y;
      }

      pin(pinx: number, piny: number) {
        this.pin_x = pinx;
        this.pin_y = piny;
      }
    }

    class Constraint {
      p1: Point;
      p2: Point;
      length: number;
      broken: boolean = false;

      constructor(p1: Point, p2: Point, length: number) {
        this.p1 = p1;
        this.p2 = p2;
        this.length = length;
      }

      resolve() {
        if (this.broken) return;

        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.length) return;

        // Auto-snap if stretched excessively (2.2x normal size)
        if (dist > this.length * 2.2) {
          this.broken = true;
          return;
        }

        const diff = (this.length - dist) / dist;
        const px = dx * diff * 0.5;
        const py = dy * diff * 0.5;

        this.p1.x += px;
        this.p1.y += py;
        this.p2.x -= px;
        this.p2.y -= py;
      }
    }

    const breakConnectionsTo = (targetPoint: Point) => {
      points.forEach(p => {
        p.constraints.forEach(c => {
          if (c.p2 === targetPoint) {
            c.broken = true;
          }
        });
      });
    };

    const idx = (x: number, y: number) => x + y * (cols + 1);

    const isConnected = (pA: Point, pB: Point) => {
      return pA.constraints.some(c => !c.broken && c.p2 === pB) || 
             pB.constraints.some(c => !c.broken && c.p2 === pA);
    };

    // Initialize the sheet
    const initCloth = () => {
      points = [];
      for (let y = 0; y <= rows; y++) {
        for (let x = 0; x <= cols; x++) {
          const p = new Point(x * spacing_x, y * spacing_y);

          if (x !== 0) {
            p.attach(points[points.length - 1], spacing_x);
          }
          if (y !== 0) {
            p.attach(points[x + (y - 1) * (cols + 1)], spacing_y);
          }

          // Pin the entire outer perimeter to keep the sheet flat over the section
          if (y === 0 || y === rows || x === 0 || x === cols) {
            p.pin(p.x, p.y);
          }

          points.push(p);
        }
      }
    };

    initCloth();

    let isVisible = false;

    const update = () => {
      if (!ctx || !isVisible) return;
      
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      
      ctx.clearRect(0, 0, width, height);

      // Relax constraints multiple times for stability
      let i = physics_accuracy;
      while (i--) {
        let p = points.length;
        while (p--) {
          points[p].resolve_constraints();
        }
      }

      // Update positions
      let p = points.length;
      while (p--) {
        points[p].update(delta > 0.1 ? 0.016 : delta);
      }

      // Render filled low-poly triangles to make it look like solid parchment/paper
      const paperColor = "rgba(255, 255, 255, 0.96)";
      ctx.fillStyle = paperColor;
      ctx.strokeStyle = paperColor;
      ctx.lineWidth = 1.5; // Bridges sub-pixel gaps between adjacent triangles

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const p00 = points[idx(x, y)];
          const p10 = points[idx(x + 1, y)];
          const p01 = points[idx(x, y + 1)];
          const p11 = points[idx(x + 1, y + 1)];

          const link_top = isConnected(p00, p10);
          const link_left = isConnected(p00, p01);
          const link_bottom = isConnected(p01, p11);
          const link_right = isConnected(p10, p11);

          // Triangle 1 (Top-Left)
          if (link_top && link_left) {
            ctx.beginPath();
            ctx.moveTo(p00.x, p00.y);
            ctx.lineTo(p10.x, p10.y);
            ctx.lineTo(p01.x, p01.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }

          // Triangle 2 (Bottom-Right)
          if (link_right && link_bottom) {
            ctx.beginPath();
            ctx.moveTo(p10.x, p10.y);
            ctx.lineTo(p11.x, p11.y);
            ctx.lineTo(p01.x, p01.y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width;
      canvas.height = height;
      
      spacing_x = width / cols;
      spacing_y = height / rows;
      
      initCloth();
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(parent);

    // Pause physics engine when the section is not in the viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible) {
          lastTime = Date.now();
          requestAnimationFrame(update);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(parent);

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      if ("touches" in e) {
        if (e.touches.length === 0) return null;
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      }
      return {
        x: (e as MouseEvent).clientX - rect.left,
        y: (e as MouseEvent).clientY - rect.top,
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getMousePos(e);
      if (!pos) return;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = pos.x;
      mouse.y = pos.y;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const pos = getMousePos(e);
      if (!pos) return;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = pos.x;
      mouse.y = pos.y;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.px = -1000;
      mouse.py = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-transparent pointer-events-none">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
    </div>
  );
};
