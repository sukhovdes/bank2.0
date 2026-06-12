import { AnimatePresence, motion } from 'motion/react'

// Адаптация spell.sh/blur-reveal под Vite без Tailwind (классы → инлайн-стили)
const srOnly = {
  position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
  overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0,
}

export function BlurReveal({
  children,
  className,
  delay = 0,
  speedReveal = 1.5,
  speedSegment = 0.5,
  trigger = true,
  onAnimationComplete,
  onAnimationStart,
  as = 'p',
  style,
  inView = false,
  once = true,
  letterSpacing,
}) {
  const MotionTag = motion[as]

  const stagger = 0.03 / speedReveal
  const baseDuration = 0.3 / speedSegment

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: stagger, delayChildren: delay } },
    exit: { transition: { staggerChildren: stagger, staggerDirection: -1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, filter: 'blur(12px)', y: 10 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: baseDuration } },
    exit: { opacity: 0, filter: 'blur(12px)', y: 10 },
  }

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          initial="hidden"
          whileInView={inView ? 'visible' : undefined}
          animate={inView ? undefined : 'visible'}
          exit="exit"
          variants={containerVariants}
          viewport={{ once }}
          className={className}
          onAnimationComplete={onAnimationComplete}
          onAnimationStart={onAnimationStart}
          style={style}
        >
          <span style={srOnly}>{children}</span>
          {children &&
            children.split(' ').map((word, wordIndex, wordsArray) => (
              <span key={`word-${wordIndex}`} style={{ display: 'inline-block', whiteSpace: 'nowrap' }} aria-hidden="true">
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`char-${wordIndex}-${charIndex}`}
                    variants={itemVariants}
                    style={{ display: 'inline-block', ...(letterSpacing ? { marginRight: letterSpacing } : null) }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIndex < wordsArray.length - 1 && (
                  <motion.span key={`space-${wordIndex}`} variants={itemVariants} style={{ display: 'inline-block' }}>
                    &nbsp;
                  </motion.span>
                )}
              </span>
            ))}
        </MotionTag>
      )}
    </AnimatePresence>
  )
}
