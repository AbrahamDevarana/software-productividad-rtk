import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { Icon } from '../Icon';

interface DrawerProps {
  open: 'hidden' | 'minimized' | 'maximized';
  setOpenDrawer: (open: 'hidden' | 'minimized' | 'maximized') => void;
  children: React.ReactNode;
}

export const CustomDrawer: React.FC<DrawerProps> = ({ open, setOpenDrawer, children }) => {
  useEffect(() => {
    setOpenDrawer(open);
  }, [open]);

  const variants = {
    open: {
      x: 0,
      width: open === 'maximized' ? '90vw' : '600px',
      transition: { duration: 0.3, ease: 'easeInOut' },
      opacity: 1,
    },
    closed: {
      x: '100%',
      width: '0',
      opacity: open === 'hidden' ? 0 : 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
  };
  
  

  const handleMaskClick = () => {
    if (open === 'minimized' || open === 'maximized') {
      setOpenDrawer('hidden');
    }
  };

  const [drawerWidth, setDrawerWidth] = useState('600px');

  useEffect(() => {
    if (open === 'maximized') {
      setDrawerWidth('90vw');
    } else {
      setDrawerWidth('600px');
    }
  }, [open]);

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          pointerEvents: open !== 'hidden' ? 'auto' : 'none',
          opacity: open !== 'hidden' ? 1 : 0,
          zIndex: 999,
        }}
        onClick={handleMaskClick}
      />
      <motion.div
        style={{
          position: 'fixed',
          top: '5%',
          right: open === 'hidden'? ' -20px' : '0',
          bottom: '5%',
          width: drawerWidth,
          background: '#fff',
          boxShadow: '-2px 0 6px rgba(0,0,0,0.1)',
          zIndex: 1000,
        }}
        animate={open === 'hidden' ? 'closed' : 'open'}

        variants={variants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <Button
          className='rounded-full bg-devarana-midnight text-white border-none absolute -left-4 top-20'
          icon={<Icon iconName='faArrowLeft' />}
          onClick={() => setOpenDrawer('maximized')}
        />

        <div className='p-10' style={{ maxWidth: 600, width: '100%' }}>
            {
                children
            }
        </div>
      </motion.div>
    </>
  );
};
