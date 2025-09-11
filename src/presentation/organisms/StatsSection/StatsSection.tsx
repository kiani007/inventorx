'use client';

import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { img: '/icons/projects.svg', number: '3,847', label: 'Active Projects' },
  { img: '/icons/investors.svg', number: '1,932', label: 'Verified Investors' },
  { img: '/icons/invested.svg', number: '€127M', label: 'Total Invested' },
  { img: '/icons/success.svg', number: '892', label: 'Success Stories' },
];

// Animated counter that triggers when element enters the viewport.
type CounterProps = { target: string; duration?: number };

const Counter: React.FC<CounterProps> = ({ target, duration = 1200 }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState<string>(target);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      if (started.current) return;
      started.current = true;

      // parse target string into currency, numeric part, and suffix
      const m = String(target).match(/^(\D*)?([\d,\.]+)([A-Za-z%]*)?$/);
      const currency = m?.[1] ?? '';
      const numStr = m?.[2] ?? '0';
      const suffix = m?.[3] ?? '';
      const raw = parseFloat(numStr.replace(/,/g, '')) || 0;

      const start = performance.now();

      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = easeOutCubic(t);

        // If suffix is a magnitude like M (millions) we animate the base number (e.g. 127)
        const current = Math.round(raw * eased);

        if (suffix.toUpperCase() === 'M') {
          setDisplay(`${currency}${current}${suffix}`);
        } else {
          // format with commas
          setDisplay(
            `${currency}${current.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${suffix}`
          );
        }

        if (t < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) onEnter();
        });
      },
      { threshold: 0.3 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, [target, duration]);

  return <div ref={ref}>{display}</div>;
};

export const StatsSection: React.FC = () => {
  return (
    <section className="py-[80px] bg-white relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <h2 className="sr-only">Platform statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="">
              <div
                className="bg-white rounded-2xl p-6 lg:p-8 text-center transform transition duration-300 hover:-translate-y-2"
                style={{
                  border: '2px solid rgba(212,175,55,0.95)',
                  boxShadow: '18px 18px 40px rgba(16,24,40,0.18), -10px -10px 30px rgba(255,255,255,0.9), inset 0 4px 8px rgba(16,24,40,0.04)'
                }}
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-[#FFF7E6] to-[#F4E4C1] border border-[#F0DFA0]"
                       style={{ boxShadow: '8px 8px 20px rgba(16,24,40,0.16), -4px -4px 12px rgba(255,255,255,0.9), inset 0 2px 6px rgba(255,255,255,0.35)'}}>
                    <img src={stat.img} alt={stat.label} className="w-8 h-8" />
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-extralight text-[#B8941F] mb-2">
                  <Counter target={stat.number} />
                </div>
                <div className="text-sm text-gray-600 uppercase tracking-[1px]">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};