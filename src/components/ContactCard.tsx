// components/ContactCard.tsx
'use client';

import { motion } from 'framer-motion';
import { Edit2, Trash2, Mail, Phone, User, Calendar, Star } from 'lucide-react';
import { Contact } from '@/types';
import { useState } from 'react';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

export default function ContactCard({ contact, onEdit, onDelete, onToggleFavorite }: ContactCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 p-6 overflow-hidden
        ${contact.isFavorite ? 'ring-2 ring-yellow-400' : ''}
        transition-all duration-300 hover:shadow-xl`}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0"
        animate={{ opacity: isHovered ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Favorite star */}
      <motion.button
        className="absolute top-4 right-4 z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggleFavorite(contact.id)}
      >
        <Star
          className={`w-5 h-5 ${
            contact.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          } transition-colors duration-200`}
        />
      </motion.button>

      <div className="relative z-10">
        <div className="flex items-start space-x-4">
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={`p-3 rounded-full ${
              contact.isFavorite ? 'bg-yellow-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'
            }`}
          >
            <User className={`w-6 h-6 ${
              contact.isFavorite ? 'text-yellow-600' : 'text-blue-600'
            }`} />
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.name}</h3>
            <p className="text-sm text-gray-500 flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              Added {formatDate(contact.createdAt)}
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <motion.a
            href={`mailto:${contact.email}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <Mail className="w-4 h-4 group-hover:text-blue-600" />
            <span className="text-sm truncate">{contact.email}</span>
          </motion.a>
          
          <motion.a
            href={`tel:${contact.phoneNumber}`}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
            whileHover={{ x: 5 }}
          >
            <Phone className="w-4 h-4 group-hover:text-blue-600" />
            <span className="text-sm">{contact.phoneNumber}</span>
          </motion.a>
        </div>

        <motion.div
          className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-100"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0.5 }}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEdit(contact)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(contact.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}