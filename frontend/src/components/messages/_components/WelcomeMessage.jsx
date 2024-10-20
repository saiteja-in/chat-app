import React from 'react';
import { TiMessages } from 'react-icons/ti';
import { motion } from 'framer-motion';

const WelcomeMessage = ({ authUser }) => {
  return (
    <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-background/50 to-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-6 py-8 text-center rounded-2xl backdrop-blur-sm border border-primary/10 shadow-lg"
      >
        <div className="flex flex-col items-center gap-6">
          {/* Greeting Section */}
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
            className="space-y-2"
          >
            <div className="relative">
              <span className="absolute -left-2 -top-2 text-3xl animate-wave origin-bottom-right">
                
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pt-1">
                Welcome, {authUser.fullName}
              </h2>
            </div>
            <div className="relative">
              <span className="absolute -right-2 top-0 text-xl animate-bounce">
                
              </span>
            </div>
          </motion.div>

          {/* Message Section */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium"
          >
            Select a chat to start messaging
          </motion.p>

          {/* Icon Section */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.3,
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl" />
            <TiMessages className="text-4xl sm:text-5xl md:text-6xl text-primary relative animate-pulse" />
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes wave {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(8deg); }
          40% { transform: rotate(-4deg); }
          60% { transform: rotate(4deg); }
          80% { transform: rotate(-2deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-wave {
          animation: wave 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomeMessage;