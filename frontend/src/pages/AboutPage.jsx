import React from "react";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-12 max-w-6xl mx-auto"
    >
      <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          About VoltPath
        </h1>

        <p className="text-white/80 leading-relaxed text-lg text-center mb-8">
          VoltPath is an AI-powered Electric Vehicle Route Optimization Platform
          designed to make EV travel smarter, safer, and more predictable.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-white/80">

          <div>
            <h2 className="text-xl font-semibold mb-3">Our Mission</h2>
            <p>
              VoltPath helps EV drivers overcome range anxiety by intelligently
              predicting energy usage and planning optimal charging stops based
              on real-world driving conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">What Makes VoltPath Smart?</h2>
            <p>
              Unlike traditional route planners, VoltPath simulates how an EV
              behaves during a journey by considering weather, traffic, and
              battery health impact.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Key Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Smart Charging Stop Optimization</li>
              <li>Weather Impact Simulation</li>
              <li>Traffic Energy Prediction</li>
              <li>Battery Degradation Estimation</li>
              <li>Interactive SoC Visualization</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Why VoltPath?</h2>
            <p>
              VoltPath transforms EV trip planning from guesswork into a
              data-driven decision process — helping drivers travel efficiently
              while protecting battery health.
            </p>
          </div>

        </div>
      </div>
    </motion.div>
  );
}