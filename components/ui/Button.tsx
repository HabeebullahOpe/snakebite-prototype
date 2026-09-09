import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'sos' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  const baseStyles = 'font-heading font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-indigo-deep text-white hover:bg-indigo hover:shadow-lg focus:ring-indigo-deep',
    secondary: 'bg-gold text-indigo-deep hover:bg-gold-dark hover:shadow-lg focus:ring-gold',
    sos: 'bg-coral text-white hover:bg-coral-dark hover:shadow-2xl focus:ring-coral relative overflow-hidden',
    outline: 'border-2 border-indigo-deep text-indigo-deep hover:bg-indigo-deep hover:text-white focus:ring-indigo-deep',
  }
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }
  
  const width = fullWidth ? 'w-full' : ''

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}