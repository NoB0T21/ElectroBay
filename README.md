# <img src="./frontend/app/favicon.ico" alt="ElectroBay Logo" width="25"/> ElectroBay - Local Electronic Store E-commerce App
<p align="center">
  <img src="https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki/Untitled%20folder/20260101_222720.png" alt="ElectroBay Logo" width="300"/>
</p>

**ElectroBay** is a modern, full-stack e-commerce web application built for a local electronic store. It offers seamless user shopping experience along with powerful admin tools to manage and analysis products, orders and sales.

## 🚀 Live Demo

🔗 [Visit ElectroBay on Vercel](https://electrobay-liard.vercel.app)

---

## 🛠 Tech Stack

### 🔹 Frontend
- **Next.js 14** with **TypeScript**
- **Framer Motion** for smooth animations
- **Tailwind CSS** for styling

### 🔹 Backend
- **Node.js** with **TypeScript**
- **MongoDB** for database
- **Supabase** for CDN image storage
- **Redis** for Rate-Limiting and cachsing

### 🔹 Authentication
- **Google OAuth**
- **JWT (Basic Auth)**
- **Session Based**

---

## 👤 User Features
- Browse electronics by category
- View product details with images
- Add to cart and checkout
- Track order
- Secure login and registration
- Google sign-in support

---

## 🛡️ Admin Panel

Admin features are protected and accessible only to authorized users.
- Add product by category with details and styling
- View and edit all products listed on store
- list of pending and complected orders
- Manage orders
- update promotion and sale on homepage with simple Form input
- detailed analysis of sales yarly and weekly results with graphs

---

## 🔐 Admin Login

Use the following credentials to log in:

```text
Email: admin@gmail.com
Password: 123
```
### 🔗 Admin Route:
```route
https://electrobay-liard.vercel.app/admin
or
click on Logo to navigate through GUI
```

## 📸 Image Uploads
Employee photos and products are uploaded to Supabase Storage.
Images are served via CDN for performance.
Preview available before uploading.

## 📦 Installation
1. **Download the project files** and open them in your code editor.
2. **Configure Backend `.env` File**
   - In the `backend` folder, create a `.env` file with the following:
     ```env
     PORT=4000
     SECRET_KEY=your_secret_here
     MONGO_URL=your_mongodb_url/ElectroBay
     SUPABASE_KEY=your_supabase_key
     SUPABASE_URL=your_supabase_url
     BUCKET=your_Bucket_name
     CLIENT_URL=http://localhost:3000
     REDIS_URL=your_redis_url
     ```
   - **Do NOT** share this file publicly.

✅ **Backend is now configured!**

2. **Configure Frontend `.env` File**
   - In the `frontend` folder, create a `.env` file with the following:
     ```env
     NEXT_PUBLIC_BASE_URL=http://localhost:4000
     NEXT_PUBLIC_GOOGLE_ID=your_google_key
     ```
   - **Do NOT** share this file publicly.

✅ **Frontend is now configured!**

3. **install Dependencies**
     ```terminal
    npm install
    # or
    yarn install
     ```

3. **Run Project**

    open terminal in backend folder
     ```terminal
    npm run dev
     ```
     open terminal in frontend folder
     ```terminal
    npm run dev
    ```
## 🗂 Project Structure
```Project Structure
.
├── app/                  # Next.js app router pages
│   ├── admin/            # Admin login page
├── components/           # Reusable UI components
├── utlis/                # Utility helpers
├── public/               # Static assets
├── .env                  # Environment variables
└── ...
```

## 🙋‍♂️ Author
**Aryan Gawade**
- 🔗 [LinkedIn](https://www.linkedin.com/in/aryan-gawade-3723672ab/)
- 🔗 [GitHub URL](https://github.com/NoB0T21)
- 🔗 [Portfolio](https://aryan21-nobot21-portfolio.vercel.app/)
