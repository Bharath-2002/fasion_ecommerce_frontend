import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stats = [
  { value: '1200+', label: 'Master Weavers' },
  { value: '77', label: 'Years of Heritage' },
  { value: '40', label: 'Days per Bridal Saree' },
  { value: '100%', label: 'Pure Mulberry Silk' },
];

export default function HeritageIntroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={ref}
      style={{
        background: '#EAEBE0',
        padding: 'clamp(80px, 12vw, 160px) clamp(32px, 10vw, 160px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background watermark text */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: '-50%',
          y: useTransform(scrollYProgress, [0, 1], ['-45%', '-55%']),
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(120px, 20vw, 280px)',
          fontWeight: 700,
          color: 'rgba(157,104,59,0.04)',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        SILK
      </motion.div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Top rule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          <div style={{ width: '48px', height: '1px', background: '#9D683B', opacity: 0.5 }} />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#9D683B',
              fontWeight: 300,
            }}
          >
            The Heritage
          </p>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'clamp(48px, 8vw, 120px)',
            alignItems: 'start',
          }}
          className="heritage-grid"
        >
          {/* Left — large quote */}
          <motion.div style={{ y }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(30px, 4.5vw, 56px)',
                fontWeight: 400,
                color: '#000',
                lineHeight: 1.15,
                letterSpacing: '0.02em',
                margin: '0 0 32px',
              }}
            >
              A saree is not worn.
              <br />
              <em style={{ color: '#9D683B', fontStyle: 'italic' }}>It is inhabited.</em>
            </h2>
            <div
              style={{
                width: '48px',
                height: '1px',
                background: '#9D683B',
                opacity: 0.4,
                marginBottom: '32px',
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(14px, 1.5vw, 17px)',
                fontWeight: 300,
                color: '#000',
                opacity: 0.65,
                lineHeight: 2.0,
                maxWidth: '440px',
              }}
            >
              For over seven decades, the looms of Kanchipuram have carried forward an unbroken
              conversation between silk and gold. Every thread is a word, every saree a sentence
              in a language older than memory.
            </p>
          </motion.div>

          {/* Right — stats */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '2px',
              }}
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    padding: 'clamp(24px, 3vw, 40px)',
                    borderTop: '1px solid rgba(157,104,59,0.2)',
                    borderLeft: i % 2 === 1 ? '1px solid rgba(157,104,59,0.2)' : 'none',
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: 'clamp(32px, 4vw, 52px)',
                      fontWeight: 400,
                      color: '#000',
                      letterSpacing: '-0.01em',
                      margin: '0 0 8px',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '11px',
                      fontWeight: 300,
                      color: '#9D683B',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 'clamp(64px, 8vw, 100px)',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          <button
            style={{
              background: 'transparent',
              border: '1px solid #9D683B',
              color: '#9D683B',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontWeight: 300,
              padding: '16px 40px',
              cursor: 'pointer',
              transition: 'background 0.35s, color 0.35s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#9D683B';
              e.target.style.color = '#EAEBE0';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#9D683B';
            }}
          >
            Visit the Atelier
          </button>
          <a
            href="#"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '15px',
              fontStyle: 'italic',
              color: '#000',
              opacity: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.5)}
          >
            Our Story
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <line x1="0" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth="1" />
              <path d="M12 1l5 5-5 5" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
