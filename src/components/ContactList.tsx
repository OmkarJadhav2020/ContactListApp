// components/ContactList.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Contact } from '@/types';
import ContactCard from './ContactCard';
import { LayoutGrid, List ,User } from 'lucide-react';
import { useState } from 'react';

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactList({ contacts, onEdit, onDelete, onToggleFavorite }: ContactListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  if (contacts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16 px-4"
      >
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No contacts yet</h3>
          <p className="text-gray-500 mb-8">
            Start building your contact list by adding your first contact.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300"
          >
            Add Your First Contact
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Sort contacts: favorites first, then alphabetically
  const sortedContacts = [...contacts].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return a.name.localeCompare(b.name);
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-6">
        <div className="inline-flex items-center bg-white rounded-lg p-1 shadow-sm border border-gray-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <LayoutGrid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        <AnimatePresence mode="popLayout">
          {sortedContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}