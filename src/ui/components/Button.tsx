import { motion } from 'framer-motion';
import { AudioSystem } from '../../audio/AudioSystem';
import { HapticSystem } from '../../haptics/HapticSystem';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'ghost' | 'accent' | 'danger';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'icon';
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
  id?: string;
}

export const Button = ({
  label, onClick, variant = 'primary', size = 'lg',
  disabled = false, icon, fullWidth = false, id
}: ButtonProps) => (
  <motion.button
    id={id}
    className={`btn btn--${variant} btn--${size}`}
    onClick={() => {
      if (!disabled && onClick) {
        AudioSystem.playSound('click');
        HapticSystem.light();
        onClick();
      }
    }}
    disabled={disabled}
    whileHover={disabled ? {} : { scale: 1.04 }}
    whileTap={disabled ? {} : { scale: 0.94 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
    style={{ width: fullWidth ? '100%' : undefined }}
  >
    {icon && <span>{icon}</span>}
    {label}
  </motion.button>
);

interface IconButtonProps {
  icon: string;
  onClick: () => void;
  variant?: 'ghost' | 'primary' | 'secondary' | 'danger';
  label?: string;
  id?: string;
}

export const IconButton = ({ icon, onClick, variant = 'ghost', label, id }: IconButtonProps) => (
  <motion.button
    id={id}
    className={`btn btn--${variant} btn--icon`}
    onClick={() => {
      AudioSystem.playSound('click');
      HapticSystem.light();
      onClick();
    }}
    aria-label={label}
    whileTap={{ scale: 0.92 }}
    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
  >
    {icon}
  </motion.button>
);
