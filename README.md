# Contact Manager 📇

A modern, animated contact management application built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.


**Live Demo**: [https://contact-manager-demo.vercel.app](https://contact-manager-demo.vercel.app)

## ✨ Features

- **CRUD Operations**: Create, Read, Update, and Delete contacts
- **Persistent Storage**: All data saved in localStorage (no database required)
- **Beautiful Animations**: Smooth transitions powered by Framer Motion
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Search Functionality**: Real-time search across all contact fields
- **Favorites System**: Mark important contacts as favorites
- **Tags & Notes**: Add custom tags and notes to contacts
- **Grid/List Views**: Toggle between different view modes
- **Toast Notifications**: Instant feedback for all actions
- **Modern UI**: Clean, aesthetic design with gradient effects

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/OmkarJadhav2020/ContactListApp.git
   cd contact-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide React](https://lucide.dev/) - Icons

## 📦 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Global styles
├── components/
│   ├── ContactCard.tsx   # Contact display card
│   ├── ContactForm.tsx   # Add/Edit form
│   ├── ContactList.tsx   # Contact list container
│   ├── Modal.tsx         # Reusable modal
│   └── Toast.tsx         # Notification system
├── hooks/
│   ├── useLocalStorage.ts # LocalStorage hook
│   └── useToast.ts        # Toast notifications hook
└── types/
    └── index.ts           # TypeScript types
```

## 🎯 Key Features Explained

### Contact Management
- Add new contacts with name, email, and phone number
- Edit existing contact information
- Delete contacts with confirmation
- Mark contacts as favorites
- Add custom tags and notes

### Search & Filter
- Real-time search across all fields
- Automatic filtering as you type
- Favorites appear first in results

### User Experience
- Smooth animations for all interactions
- Toast notifications for feedback
- Responsive design for all devices
- Keyboard shortcuts support
- Grid and list view options

## 🔧 Configuration

The app uses ESLint and TypeScript configurations that can be customized:

- `.eslintrc.json` - ESLint rules
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS customization
- `next.config.js` - Next.js configuration

## 🌐 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/contact-manager)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created with ❤️ by [Your Name](https://github.com/OmkarJadhav2020)

---


⭐ Star this repo if you find it helpful!