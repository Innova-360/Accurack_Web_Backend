"use strict";
`
# Accurack Knowledge Base

## **1. Store Registration and Management**

### **Store User Registration**
- **Super Admin** registers a new store.
  - Sends a **welcome email** with a registration link to the store admin.
  - Admin uses the link to complete password setup and profile.

### **Store Listing and Editing**
- The **Super Admin** can:
  - View a list of all registered stores.
  - Edit store details (e.g., store name, admin email).
  - Expiry of the registration link (optional).

### **Store User Login**
- **Login Flow:**
  - Users must input **email** and **password**.
  - Options available: **Forgot Password**, **Change Password**, **Remember Me**.

### **Authentication and Security**
- Passwords are encrypted.
- Users access their store dashboard upon successful login.
- Session expires after a period of inactivity.

---

## **2. Product Management**

### **Add Product**
- **Manual Addition**: User manually enters product details.
  - Fields: Product name, PLU, SKU, Category, Price, Quantity, Description.
  
- **Barcode Scanning**:
  - Scans a barcode to automatically fetch product details.
  - If not found, the user can enter product details manually.

### **View and Edit Products**
- Users can:
  - View product list (with search, filter, and sorting options).
  - Edit product details (e.g., price, quantity, description).
  
### **Delete Product**
- Products can be deleted with a **confirmation prompt** to prevent mistakes.

### **Validation and Error Handling**
- Ensure valid inputs for all fields (e.g., valid price formats).

---

## **3. Sales Report Management**

### **Import Sales Report**
- **Sales report** is uploaded in **PDF format**.
  - **System** updates inventory based on sold quantities.
  - Notifications about success or failure of the import are shown.

### **Inventory Update from Sales Report**
- The system reduces stock quantities based on the sales report.

---

## **4. Dashboard Features**

### **Basic Overview**
- Displays key metrics such as:
  - **Total number of products**
  - **Number of products with low stock**
  - **Total sales for the current period**.

### **Low Stock Notifications**
- Automatically sends alerts for products below a **defined quantity threshold**.
- Customizable threshold settings (e.g., alert when stock drops below 10 units).

### **Order Suggestions**
- **Past sales data** is analyzed to suggest products for restocking.

### **Customizable Notifications**
- Users can set **custom thresholds** for low-stock notifications.
- **Unread notifications** are highlighted in the dashboard.

---

## **5. User Authentication and Password Management**

### **Forgot Password**
- Users can reset passwords by entering their **email address**.
- A **password reset link** is sent to the user.

### **Change Password**
- Users can change passwords from their **profile or settings page**.
- Validation of the **current password** is required before changing.

---

## **6. Notifications and Alerts**

### **Types of Notifications**
- **Low Stock Alerts**: When stock is low for any product.
- **Order Suggestions**: Based on historical sales trends.

### **Managing Notifications**
- Users can dismiss or mark notifications as **read**.
- Notifications will appear as alerts or in a **Notifications tab**.
`;
