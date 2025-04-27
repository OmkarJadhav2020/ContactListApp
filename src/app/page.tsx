// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Users, Sparkles } from 'lucide-react';
import { Contact, ContactFormData, FormMode } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useToast } from '@/hooks/useToast';
import ContactList from '@/components/ContactList';
import ContactForm from '@/components/ContactForm';
import Modal from '@/components/Modal';
import Toast from '@/components/Toast';

export default function Home() {
  const [contacts, setContacts] = useLocalStorage<Contact[]>('contacts', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('add');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddContact = () => {
    setFormMode('add');
    setSelectedContact(null);
    setIsModalOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setFormMode('edit');
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const handleDeleteContact = (id: string) => {
    const contactToDelete = contacts.find(c => c.id === id);
    if (window.confirm(`Are you sure you want to delete ${contactToDelete?.name}?`)) {
      setContacts(contacts.filter(contact => contact.id !== id));
      showToast(`${contactToDelete?.name} has been deleted`, 'success');
    }
  };

  const handleToggleFavorite = (id: string) => {
    setContacts(
      contacts.map(contact =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
    const contact = contacts.find(c => c.id === id);
    showToast(
      `${contact?.name} ${contact?.isFavorite ? 'removed from' : 'added to'} favorites`,
      'success'
    );
  };

  const handleSubmit = (formData: ContactFormData) => {
    if (formMode === 'add') {
      const newContact: Contact = {
        ...formData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        isFavorite: false,
      };
      setContacts([...contacts, newContact]);
      showToast('Contact added successfully', 'success');
    } else if (selectedContact) {
      setContacts(
        contacts.map(contact =>
          contact.id === selectedContact.id
            ? { ...contact, ...formData }
            : contact
        )
      );
      showToast('Contact updated successfully', 'success');
    }
    setIsModalOpen(false);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber.includes(searchQuery)
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Welcome Animation */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
              </motion.div>
              <h1 className="text-4xl font-bold text-white mb-2">Contact Manager</h1>
              <p className="text-blue-100">Your digital address book</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Users className="w-8 h-8 text-blue-600" />
                </motion.div>
                Contact Manager
              </h1>
              <p className="mt-1 text-gray-600">
                {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} • 
                {contacts.filter(c => c.isFavorite).length} favorites
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddContact}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Contact
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </motion.div>

        {/* Contact List */}
        <ContactList
          contacts={filteredContacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={formMode === 'add' ? 'Add New Contact' : 'Edit Contact'}
        >
          <ContactForm
            mode={formMode}
            initialData={selectedContact || undefined}
            onSubmit={handleSubmit}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>

        {/* Toast Notification */}
        <Toast
          message={toast.message}
          type={toast.type}
          isVisible={toast.isVisible}
          onClose={hideToast}
        />
      </div>
    </main>
  );
}