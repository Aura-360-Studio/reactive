import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = ({ intensity = 1 }) => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 30, stiffness: 250, mass: 0.4 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Primary Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-[#00ffaa] rounded-full pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.4 : 1,
          borderColor: intensity > 8 ? '#ff4444' : intensity > 4 ? '#00ffaa' : '#555',
          borderWidth: intensity > 6 ? 2 : 1,
        }}
      >
        {/* Inner Pulse */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-2 h-2 bg-[#00ffaa] rounded-full"
          style={{
            backgroundColor: intensity > 8 ? '#ff4444' : '#00ffaa'
          }}
        />
      </motion.div>

      {/* Cursor Metadata Labels */}
      {intensity > 3 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9998] font-mono text-[8px] whitespace-nowrap ml-6 mt-6 flex flex-col gap-1"
          style={{
            x: cursorX,
            y: cursorY,
          }}
        >
          <motion.div 
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            className="flex items-center gap-2"
          >
            <div className="w-1 h-1 bg-[#00ffaa]" />
            <span className="text-[#00ffaa]/60">ATTENTION: {Math.min(100, Math.floor(intensity * 12))}%</span>
          </motion.div>
          {intensity > 6 && (
            <motion.div 
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.1, repeat: Infinity }}
              className="flex items-center gap-2"
            >
              <div className="w-1 h-1 bg-red-500" />
              <span className="text-red-500 font-bold">FIXATION_LOCKED</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Lagging Ghost Effect */}
      {intensity > 2 && (
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 border border-[#00ffaa] opacity-10 rounded-full pointer-events-none z-[9997]"
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            transition: { type: 'spring', damping: 15, stiffness: 60 }
          }}
          style={{
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </>
  );
};

export default CustomCursor;
