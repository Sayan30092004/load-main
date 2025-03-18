import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Zap } from "lucide-react";

interface LandingHeroProps {
  onTryNowClick?: () => void;
}

const LandingHero = ({ onTryNowClick = () => {} }: LandingHeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Animation for energy particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = 800;
      }
    };

    setCanvasDimensions();
    window.addEventListener("resize", setCanvasDimensions);

    // Particle class for energy visualization
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, ${Math.random() * 30 + 50}%)`; // Blue to cyan colors
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0f172a"); // Dark blue
      gradient.addColorStop(1, "#1e293b"); // Slightly lighter blue
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Add new particles occasionally
      if (Math.random() > 0.95) {
        particles.push(new Particle());
        // Remove old particles to maintain performance
        if (particles.length > 150) {
          particles.shift();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, []);

  return (
    <div className="relative w-full h-[800px] bg-slate-900 overflow-hidden">
      {/* Canvas for 3D energy visualization */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <Zap className="w-16 h-16 mx-auto mb-4 text-blue-400" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl font-bold text-white mb-6 md:text-6xl lg:text-7xl"
        >
          Energy Load <span className="text-blue-400">Forecasting</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mb-10 text-xl text-gray-300"
        >
          Predict energy demand and supply with our advanced AI-powered
          platform. Visualize global energy metrics and prevent blackouts before
          they happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-300 flex items-center gap-2"
            onClick={onTryNowClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Try Now
            <motion.div
              animate={{ x: isHovering ? 5 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="ml-1" />
            </motion.div>
          </Button>
        </motion.div>

        {/* Floating elements for additional visual interest */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500/10 blur-xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-cyan-500/10 blur-xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default LandingHero;
