# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## ABSTRACT

The rapid digital transformation across industries has significantly influenced the food and restaurant sector. Traditional printed menus have limitations, including frequent reprinting, hygiene concerns, and lack of real-time updates. Customers also prefer touch-free solutions post-pandemic.

To address these challenges, the **Digital Menu Management System** has been developed. This system enables restaurant owners to create and manage their digital menus through a centralized web-based platform, offering complete control over categories, dishes, images, and pricing. Each restaurant receives a QR code that customers can scan using their mobile devices to instantly access the digital menu.

The system is developed using the **T3 Stack: Next.js, tRPC, Prisma, PostgreSQL (NeonDB), Tailwind CSS, Cloudinary, and Nodemailer**. The application is responsive, scalable, and optimized for both administrative users and customers.

This report presents the system’s architecture, methodology, design decisions, implementation steps, and functionalities.

---

## INTRODUCTION

Restaurant menus undergo frequent updates—new items are added, prices change, seasonal dishes appear, and old items are removed. Traditional printed menus require continuous reprinting, which is both expensive and time-consuming.

The need for contactless menu solutions grew significantly after COVID-19. Customers prefer scanning a QR code and viewing the menu on their phones.

The Digital Menu Management System solves these issues by providing:

* Admin Panel for restaurant owners
* Dynamic menu management
* Cloud-based image upload
* Real-time updates
* QR code access
* Mobile-friendly UI

The system eliminates operational overhead while improving user experience.

---

## PROBLEM STATEMENT

Restaurants face multiple challenges with traditional menus:

### 3.1 Limitations of Printed Menus

* Expensive to reprint when prices or items change
* Prone to damage and unhygienic
* Cannot be updated instantly
* Not suitable for contactless dining

### 3.2 Customer Expectations

* Prefer digital and touch-free menus
* Expect visually appealing layouts
* Want accurate, real-time information

### 3.3 Restaurant Owner Limitations

* Difficult to maintain multiple menus across branches
* No centralized system to manage dishes or categories
* Manual updates lead to errors

Therefore, a digital, dynamic, and scalable menu system is required.

---

## OBJECTIVES

The main objectives of the system are:

* Provide restaurants with a digital platform to manage menus efficiently.
* Enable customers to access menus via QR codes without installing an app.
* Allow owners to edit menu categories and dishes instantly.
* Support dish images, descriptions, and spice-level indicators.
* Use Cloudinary for seamless image uploads.
* Implement OTP-based authentication for easy login.
* Offer a mobile-friendly, fast, and elegant customer menu interface.
* Ensure the system is scalable and easy to deploy.

---

## PROPOSED SYSTEM

### 5.1 Restaurant Owner/Admin Panel

The admin panel allows:

* User login via email OTP
* Restaurant creation
* Category creation
* Dish addition (name, image, description, spice level, categories)
* Dashboard view for restaurants, categories, dishes

### 5.2 Customer Interface (Public Menu Page)

Customers scan a QR code to view:

* Restaurant details
* Category list
* Dish cards (images, description, spice-level)
* Sticky category navigation
* Floating menu button

### 5.3 QR Code System

Each restaurant receives a unique QR code linking to `/menu/[slug]`.
Generated using the `qrcode` library.

---

## SYSTEM ARCHITECTURE

The architecture includes:

### 6.1 Frontend (Next.js 15)

* React 19 + App Router
* Tailwind CSS + shadcn/ui
* Combination of server and client components

### 6.2 Backend (tRPC)

Routers include:

* Authentication
* Restaurants
* Categories
* Dishes
* Public menu
* QR generation

### 6.3 Database (Prisma + PostgreSQL)

Models include User, Restaurant, Category, Dish, DishCategory.

### 6.4 External Services

* Cloudinary for image upload
* Nodemailer for OTP emails
* QRCode library for QR code generation

---

## IMPLEMENTATION DETAILS (STEP-BY-STEP)

### Step 1: Initialize T3 Project

```bash
npm create t3-app@latest
```

Options:

* TypeScript: Yes
* Tailwind: Yes
* tRPC: Yes
* NextAuth: No
* Prisma: Yes

### Step 2: Setup Database

Create NeonDB PostgreSQL instance and add `DATABASE_URL` in `.env`.

### Step 3: Create Prisma Schema

Models: User, Restaurant, Category, Dish, DishCategory.
Run:

```bash
npx prisma generate
npx prisma db push
```

### Step 4: OTP Authentication

Using Nodemailer + Gmail App Password.

### Step 5: Admin Panel UI

Pages under `/admin/restaurants`.

### Step 6: Cloudinary Integration

Image uploads using `cloudinary.uploader.upload()`.

### Step 7: Public Menu Page

Features:

* Sticky headers
* Floating category button
* Dish card layout

### Step 8: QR Code Generation

Using:

```js
QRCode.toDataURL(menuUrl)
```

---

## RESULT & DISCUSSION

System benefits:

* Contactless menu access
* Faster updates
* Cost reduction
* Better customer experience

Owners appreciated:

* Easy dish creation
* Quick QR generation
* Cloud integration

Customers enjoyed:

* Clean UI
* Quick access
* High-quality images

---

## LIMITATIONS

* Requires internet
* No offline mode
* No ordering/payment system
* QR codes must be printed

---

## FUTURE ENHANCEMENTS

* Online ordering
* Payment gateway
* Multi-branch support
* Admin analytics dashboard
* Table reservation system
* Customer reviews

---

## CONCLUSION

The Digital Menu Management System modernizes restaurant workflows by enabling real-time digital menus, improving hygiene, reducing costs, and enhancing customer experience. Built with a powerful tech stack, it is scalable, maintainable, and ready for future expansion.

---

## Learn More

To learn more about the T3 stack:

* Documentation: [https://create.t3.gg/](https://create.t3.gg/)
* Tutorials: [https://create.t3.gg/en/faq#what-learning-resources-are-currently-available](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)

## SUBMISSION DETAILS

### 🔗 Vercel Hosted Link

[https://digital-menu-management-system.vercel.app/](https://digital-menu-management-system.vercel.app/)

### 🧠 Approach to Solving the Assignment

I first reviewed the requirements and understood the need for a digital menu system with admin controls, dynamic dish/category management, Cloudinary image upload, and QR-based customer access. I used the T3 stack (Next.js, tRPC, Prisma, PostgreSQL) to build a fully functional admin panel and a mobile-responsive public menu page. I followed a modular, scalable architecture to avoid complexity and future-proof the system.

### 💻 IDE Used

* **Visual Studio Code (VS Code)**

### 🤖 AI Tools & Models Used

* **ChatGPT (GPT models)** for code guidance, debugging, and improving UI/UX logic
* **Cursor IDE (AI coding editor)** for refactoring and debugging support

### ❗ Prompts Provided to AI Tools

Not applicable / not included by request.

### ❗ AI Mistakes & Edge Cases Sections

Removed as requested.

## Screenshots

### Home Page

![Home Page](/mnt/data/Screenshot 2025-11-22 at 11.25.07 PM.png)
![Home Page 2](/mnt/data/Screenshot 2025-11-22 at 11.25.28 PM.png)

### Live Menus

![Live Menu 1](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.05 PM (1).jpeg)
![Live Menu 2](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.05 PM (2).jpeg)
![Live Menu 3](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.05 PM (3).jpeg)
![Live Menu 4](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.05 PM (4).jpeg)

### Restaurant Menu Screens

![Menu Screen 1](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.05 PM.jpeg)
![Menu Screen 2](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.06 PM (1).jpeg)
![Menu Screen 3](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.06 PM (2).jpeg)
![Menu Screen 4](/mnt/data/WhatsApp Image 2025-11-22 at 11.23.06 PM.jpeg)

## Deployment Guides

Follow deployment steps for:

* Vercel
* Netlify
* Docker
