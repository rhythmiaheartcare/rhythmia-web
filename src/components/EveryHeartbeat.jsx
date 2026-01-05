import React from 'react'
import { motion } from 'framer-motion'
import { Activity } from 'lucide-react'

export default function EveryHeartbeat() {
    return (
        <section className="every-heartbeat-section" id="every-heartbeat">
            <div className="container relative z-10">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">

                    {/* Visual Side */}
                    <div className="flex-1 w-full relative">
                        <div className="heartbeat-visual">
                            <Activity size={80} className="pulse-icon" color="var(--color-primary)" />
                            <div className="pulse-ring"></div>
                            <div className="pulse-ring delay-1"></div>
                        </div>
                    </div>

                    {/* Text Side */}
                    <div className="flex-1 text-left">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="section-title text-white mb-6" style={{ fontSize: '2.5rem' }}>Every Heartbeat Counts</h2>

                            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light">
                                <p>
                                    Every beat of the heart is powered not just by blood flow, but by an intricate electrical system that keeps the rhythm and life in motion.
                                </p>
                                <p>
                                    Yet, for decades, most heart health products have focused only on circulation - the “plumbing” of the heart - leaving the electrical systems, which control rhythm, overlooked.
                                </p>
                                <div className="stat-box">
                                    <span className="stat-number">10-20%</span>
                                    <span className="stat-label">of adults suffer with palpitations each year</span>
                                </div>
                                <p>
                                    Rhythm disorders are common effecting millions of people. Palpitations, the feeling of flutters or skipped beats, can affect people of all ages.
                                    Palpitations and irregular heartbeats disrupt sleep, exercise, and work for a significant number of people who experience them.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                .every-heartbeat-section {
                    background-color: var(--color-quaternary);
                    background-image: radial-gradient(circle at 50% 50%, #860000 0%, var(--color-quaternary) 60%);
                    padding: 9rem 0;
                    overflow: hidden;
                    position: relative;
                }
                .heartbeat-visual {
                    position: relative;
                    width: 200px;
                    height: 200px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .pulse-icon {
                    z-index: 10;
                    filter: drop-shadow(0 0 15px rgba(213, 15, 15, 0.6));
                    color: white;
                    animation: subtle-float 3s ease-in-out infinite;
                }
                .pulse-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    box-shadow: 0 0 20px rgba(213, 15, 15, 0.2);
                    opacity: 0;
                    animation: pulse-ring 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                }
                .delay-1 {
                    animation-delay: 0.8s;
                }
                @keyframes pulse-ring {
                    0% { transform: scale(0.6); opacity: 0; }
                    40% { opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes subtle-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .stat-box {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    padding: 2rem;
                    margin: 1rem 0;
                    border-radius: 16px;
                    display: inline-flex;
                    align-items: center;
                    gap: 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    transition: transform 0.3s ease;
                }
                .stat-box:hover {
                    transform: translateY(-5px);
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.15);
                }
                .stat-number {
                    font-size: 3rem;
                    font-weight: 700;
                    background: linear-gradient(to right, #fff, #ccc);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .stat-label {
                    font-size: 1.1rem;
                    color: rgba(255, 255, 255, 0.9);
                    max-width: 200px;
                    line-height: 1.4;
                    font-weight: 500;
                }
            `}</style>
        </section>
    )
}
