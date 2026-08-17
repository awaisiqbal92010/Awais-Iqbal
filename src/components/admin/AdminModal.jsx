import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminModal() {
  const { isAdminOpen, setIsAdminOpen, isAuthenticated } = usePortfolio();

  if (!isAdminOpen) return null;

  return (
    <AnimatePresence>
      <div className="admin-modal-backdrop" onClick={() => setIsAdminOpen(false)}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          {isAuthenticated ? (
            <AdminDashboard onClose={() => setIsAdminOpen(false)} />
          ) : (
            <AdminLogin onClose={() => setIsAdminOpen(false)} />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
