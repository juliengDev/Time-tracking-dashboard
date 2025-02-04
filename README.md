# Time Tracking Dashboard

![Design preview for the Time Tracking Dashboard](./design/desktop-preview.jpg)

## Overview

This project is a **dynamic time tracking dashboard** that allows users to visualize their activity data in a clear and interactive way. Built with **TypeScript**, it dynamically updates based on **JSON data** and provides a **responsive UI** for a seamless experience across all devices.

---

### 🔑 Key Features

- **Toggle between Daily, Weekly, and Monthly views** for tracking time efficiently  
- **Dynamic data rendering** powered by JSON  
- **Responsive layout** for optimal viewing across devices  
- **Interactive UI elements** with hover states  

---

## 🚀 Live Demo

- [Try the Time Tracking Dashboard](https://juliengdev-time-tracking-dashboard.netlify.app/)  
- [GitHub Repository](https://github.com/juliengDev/Time-tracking-dashboard)  

---

## 🏗 Built With

- **TypeScript** for type safety and maintainability  
- **SCSS/SASS (BEM methodology)** for structured and scalable styling  
- **Semantic HTML5** for accessibility and clean markup  
- **Modern JavaScript (ES6+)** for efficient data handling and UI updates  

---

## 🔍 How It Works

1. **Select a Timeframe**  
   - Switch between **Daily, Weekly, and Monthly** statistics  

2. **View Activity Data**  
   - The dashboard dynamically updates based on JSON data  

3. **Interactive UI Enhancements**  
   - Hover states for better user feedback  
   - Fully responsive design for a seamless experience on any device  

---

## 🧠 What I Learned

This project deepened my understanding of **data-driven UI components** and **modular architecture** in JavaScript applications. Key takeaways:

- **Using TypeScript Interfaces & Enums** for clear data modeling  
- **Modular code structure** for easy maintenance and scalability  
- **Error handling** to prevent application crashes due to unexpected data  
- **Efficient DOM Manipulation** using `querySelector` and `querySelectorAll`  
- **Leveraging ES6+ features** for a cleaner and more readable codebase  

### Code Example: Fetching and Rendering Data
```typescript
interface Activity {
  title: string;
  timeframes: {
    daily: { current: number; previous: number };
    weekly: { current: number; previous: number };
    monthly: { current: number; previous: number };
  };
}

const fetchData = async (): Promise<Activity[]> => {
  try {
    const response = await fetch("data.json");
    return await response.json();
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
};
```

---

## 📌 Continued Development

Planned future improvements:
- **Local Storage Integration** to save user preferences
- **Dark Mode Support** for better accessibility
- **Animated Transitions** for a more engaging UI experience

---

## 📦 Installation

To run this project locally, follow these steps:

1. **Clone the repository**
```bash
git clone https://github.com/juliengDev/Time-tracking-dashboard.git
cd Time-tracking-dashboard
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

5. **Preview the production build**
```bash
npm run preview
```

---

## 📚 Useful Resources

- [MDN: Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) - Helped with fetching and handling JSON data
- [CSS-Tricks: Grid vs Flexbox](https://css-tricks.com/snippets/css/complete-guide-grid/) - Improved layout consistency and maintainability
- [W3C Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/) - Ensuring accessible and user-friendly interactions

---

## 👨‍💻 Author

- **Portfolio** - [Julien Gilbert](https://juliengilbert.com/)
- **GitHub** - [@juliengDev](https://github.com/juliengDev)
- **LinkedIn** - [Julien Gilbert](https://www.linkedin.com/in/julien-gilbert-reactjs/)

---

📊 *Track your time effectively and gain insights into your daily, weekly, and monthly activities!* 🚀
