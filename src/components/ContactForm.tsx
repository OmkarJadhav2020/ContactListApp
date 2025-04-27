// components/ContactForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContactFormData, Contact, FormMode } from '@/types';
import { X, Tag } from 'lucide-react';

interface ContactFormProps {
  mode: FormMode;
  initialData?: Contact;
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
}

export default function ContactForm({ mode, initialData, onSubmit, onCancel }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phoneNumber: '',
    notes: '',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phoneNumber: initialData.phoneNumber,
        notes: initialData.notes || '',
        tags: initialData.tags || [],
      });
    }
  }, [mode, initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags?.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tagInput.trim()],
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || [],
    }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
          placeholder="+1 (234) 567-8900"
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none shadow-sm"
          placeholder="Add any additional notes..."
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-2">
          {formData.tags?.map((tag) => (
            <motion.span
              key={tag}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 hover:text-blue-900"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </div>
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
          placeholder="Press Enter to add tags (e.g., work, friend, family)"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="px-6 py-2.5 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-lg shadow-blue-500/25"
        >
          {mode === 'add' ? 'Add Contact' : 'Update Contact'}
        </motion.button>
      </div>
    </motion.form>
  );
}