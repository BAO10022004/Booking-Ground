# System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture](#architecture)
3. [Database Schema](#database-schema)
4. [API Documentation](#api-documentation)
5. [Admin Panel](#admin-panel)
6. [Installation & Setup](#installation--setup)
7. [Project Structure](#project-structure)
8. [Features](#features)
9. [Image Storage](#image-storage)
10. [Authentication](#authentication)

---

## System Overview

This is a **Venue Booking Management System** built with Laravel 12, Filament 4, and Laravel Sanctum. The system provides:

- **Admin Panel**: Full CRUD operations for managing venues, bookings, users, categories, and more
- **RESTful API**: Complete API for client applications (mobile/web) to interact with the system
- **Multi-tenant Support**: Venue owners can manage their own venues and bookings
- **Booking System**: Users can book grounds/venues with time slots, events, and payments
- **Rating System**: Users can rate and review venues

### Technology Stack

- **Backend**: Laravel 12 (PHP 8.2+)
- **Admin Panel**: Filament 4
- **API Authentication**: Laravel Sanctum
- **Database**: SQLite (default, can be changed to MySQL/PostgreSQL)
- **Image Storage**: Local storage (with Cloudinary support ready)
- **Frontend Build**: Vite + NPM

---

## Architecture

### System Components

```
┌─────────────────┐
│  Client App     │ (Mobile/Web Application)
│  (React/Vue/etc)│
└────────┬────────┘
         │ HTTP/REST API
         │ (Laravel Sanctum Auth)
         ▼
┌─────────────────┐
│  Laravel API    │
│  Controllers    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Eloquent Models│
│  & Relationships│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Database      │
│   (SQLite/MySQL)│
└─────────────────┘

┌─────────────────┐
│  Admin Panel    │
│  (Filament 4)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Same Database  │
└─────────────────┘
```

### Key Design Decisions

1. **UUID Primary Keys**: All tables use UUID instead of auto-incrementing IDs for better security and distributed system support
2. **Separate Admin & API**: Admin panel (Filament) and API share the same database but serve different purposes
3. **Image Storage**: Flexible storage system supporting local and cloud (Cloudinary ready)
4. **Role-based Access**: Users have roles (admin/owner/customer) with different permissions

---

## Database Schema

### Core Tables

#### 1. **users**
User accounts with authentication and profile information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | User identifier |
| phone_number | String(20) | Unique phone number |
| email | String(100) | Unique email |
| name | String(100) | Full name |
| password | String(255) | Hashed password |
| gender | Boolean | True = Female, False = Male |
| birthday | DateTime | Date of birth |
| role | Boolean | True = User, False = Owner |
| is_admin | Boolean | Admin flag |
| is_active | Boolean | Account status |
| avatar_id | UUID (FK) | Reference to images table |
| cover_image_id | UUID (FK) | Reference to images table |

#### 2. **images**
Image storage metadata.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Image identifier |
| name | String(100) | Image name |
| image_url | String(255) | Storage path/URL |

#### 3. **categories**
Venue categories (e.g., Badminton, Football, Pickleball).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Category identifier |
| name | String(100) | Category name |

#### 4. **venues**
Venue/Club information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Venue identifier |
| name | String(200) | Venue name |
| sub_address | String(100) | Street address |
| district | String(100) | District |
| city | String(100) | City |
| address | String(300) | Full address |
| operating_time | String(100) | Operating hours |
| phone_number1 | String(20) | Primary phone |
| phone_number2 | String(20) | Secondary phone (nullable) |
| website | String(255) | Website URL (nullable) |
| deposit | Decimal(18,2) | Deposit percentage |
| owner_id | UUID (FK) | Reference to users table |

#### 5. **image_venus**
Pivot table for venue images.

| Column | Type | Description |
|--------|------|-------------|
| venue_id | UUID (FK) | Reference to venues |
| image_id | UUID (FK) | Reference to images |
| is_image | Boolean | True = image, False = diagram |

#### 6. **venues_categories**
Pivot table for venue categories.

| Column | Type | Description |
|--------|------|-------------|
| venue_id | UUID (FK) | Reference to venues |
| category_id | UUID (FK) | Reference to categories |

#### 7. **grounds**
Individual grounds/courts within a venue.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Ground identifier |
| name | String(100) | Ground name (e.g., "Court A", "Field 1") |
| venue_id | UUID (FK) | Reference to venues |
| category_id | UUID (FK) | Reference to categories |

#### 8. **price_lists**
Price list groups for venues.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Price list identifier |
| name | String(100) | Price list name |
| venue_id | UUID (FK) | Reference to venues |

#### 9. **price_list_details**
Detailed pricing information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Detail identifier |
| date | Date | Specific date (nullable) |
| day | String(20) | Day of week (nullable) |
| start_time | Time | Start time |
| end_time | Time | End time |
| price | Decimal(18,2) | Single price (nullable) |
| fixed_price | Decimal(18,2) | Fixed customer price (nullable) |
| current_price | Decimal(18,2) | Walk-in price |
| price_list_id | UUID (FK) | Reference to price_lists |

#### 10. **service_lists**
Service categories (e.g., Food, Drinks).

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Service list identifier |
| name | String(100) | Service list name |
| venue_id | UUID (FK) | Reference to venues |

#### 11. **service_list_details**
Individual service items.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Service detail identifier |
| name | String(100) | Service name |
| wholesale | String(50) | Wholesale price (nullable) |
| unit_wholesale | String(50) | Wholesale unit |
| retail | String(50) | Retail price |
| unit_retail | String(50) | Retail unit |
| service_list_id | UUID (FK) | Reference to service_lists |

#### 12. **terms**
Terms and conditions for venues.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Term identifier |
| update_time | DateTime | Last update time |
| term_category | Integer | Term category |
| content | Text | Term content |
| venue_id | UUID (FK) | Reference to venues |

#### 13. **ratings**
User ratings and reviews for venues.

| Column | Type | Description |
|--------|------|-------------|
| user_id | UUID (FK) | Reference to users |
| venue_id | UUID (FK) | Reference to venues |
| star_number | Integer | Rating (1-5) |
| review | Text | Review text (nullable) |

**Composite Primary Key**: (user_id, venue_id)

#### 14. **events**
Event information.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Event identifier |
| name | String(100) | Event name |
| price | Decimal(18,2) | Ticket price |
| ticket_number | Integer | Number of tickets |
| level | String(255) | Event level (nullable) |

#### 15. **bookings**
Booking records.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Booking identifier |
| user_id | UUID (FK) | Reference to users |
| date | Date | Booking date |
| start_time | Time | Start time |
| end_time | Time | End time |
| amount_time | Integer | Total hours |
| is_event | Boolean | Event booking flag |
| ground_id | UUID (FK) | Reference to grounds |
| target | String(255) | Target audience (nullable) |
| customer_note | Text | Customer notes (nullable) |
| owner_note | Text | Owner notes (nullable) |
| quantity | Integer | Max participants/tickets |
| status | String | Booking status (Pending, Confirmed, Cancelled, Completed) |
| event_id | UUID (FK) | Reference to events (nullable) |

#### 16. **payments**
Payment records.

| Column | Type | Description |
|--------|------|-------------|
| id | UUID (PK) | Payment identifier |
| booking_id | UUID (FK) | Reference to bookings |
| amount | Decimal(18,2) | Total amount |
| unit_price | Decimal(18,2) | Price per unit |
| method | String | Payment method (Cash, Card, Online) |
| note | Text | Payment notes (nullable) |
| status | String | Payment status (Pending, Paid, Cancelled, Refunded) |

### Relationships Summary

```
users
  ├── hasMany bookings
  ├── hasMany ratings
  ├── hasMany ownedVenues (as owner)
  ├── belongsTo avatar (Image)
  └── belongsTo coverImage (Image)

venues
  ├── belongsTo owner (User)
  ├── belongsToMany categories
  ├── belongsToMany images (image_venus)
  ├── hasMany grounds
  ├── hasMany priceLists
  ├── hasMany serviceLists
  ├── hasMany terms
  └── hasMany ratings

grounds
  ├── belongsTo venue
  ├── belongsTo category
  └── hasMany bookings

bookings
  ├── belongsTo user
  ├── belongsTo ground
  ├── belongsTo event (nullable)
  └── hasMany payments

payments
  └── belongsTo booking
```

---

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Authentication

All protected endpoints require authentication using Laravel Sanctum. Include the token in the Authorization header:

```
Authorization: Bearer {token}
```

### Authentication Endpoints

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "phone_number": "0123456789",
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "password_confirmation": "password123",
  "gender": true,
  "birthday": "1990-01-01"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com",
    "phone_number": "0123456789"
  },
  "token": "sanctum_token_here"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": { ... },
  "token": "sanctum_token_here"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

### Public Endpoints

#### Get All Venues
```http
GET /api/venues
```

**Query Parameters:**
- `category_id` (optional): Filter by category
- `city` (optional): Filter by city
- `search` (optional): Search by name

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "Venue Name",
      "address": "Full address",
      "city": "City",
      "district": "District",
      "operating_time": "6:00 - 22:00",
      "phone_number1": "0123456789",
      "owner": {
        "id": "uuid",
        "name": "Owner Name"
      },
      "categories": [...],
      "images": [...],
      "grounds": [...]
    }
  ]
}
```

#### Get Venue by ID
```http
GET /api/venues/{id}
```

#### Get All Categories
```http
GET /api/categories
```

#### Get All Grounds
```http
GET /api/grounds
```

**Query Parameters:**
- `venue_id` (optional): Filter by venue

#### Get All Events
```http
GET /api/events
```

#### Get All Bookings (Public)
```http
GET /api/bookings
```

#### Get All Ratings
```http
GET /api/ratings
```

**Query Parameters:**
- `venue_id` (optional): Filter by venue

#### Get Rating by ID
```http
GET /api/ratings/{id}
```

### Protected Endpoints (Require Authentication)

#### My Bookings
```http
GET /api/bookings/my-bookings
Authorization: Bearer {token}
```

#### Create Booking
```http
POST /api/bookings
Authorization: Bearer {token}
Content-Type: application/json

{
  "date": "2025-12-15",
  "start_time": "10:00",
  "end_time": "12:00",
  "ground_id": "uuid",
  "is_event": false,
  "event_id": null,
  "target": "Students",
  "customer_note": "Please prepare the court",
  "quantity": 4
}
```

#### Update Booking
```http
PUT /api/bookings/{id}
Authorization: Bearer {token}
```

#### Delete Booking
```http
DELETE /api/bookings/{id}
Authorization: Bearer {token}
```

#### Get My Payments
```http
GET /api/payments
Authorization: Bearer {token}
```

#### Create Payment
```http
POST /api/payments
Authorization: Bearer {token}
Content-Type: application/json

{
  "booking_id": "uuid",
  "amount": 100.00,
  "unit_price": 50.00,
  "method": "Online",
  "note": "Payment note"
}
```

#### Create Rating
```http
POST /api/ratings
Authorization: Bearer {token}
Content-Type: application/json

{
  "venue_id": "uuid",
  "star_number": 5,
  "review": "Great venue!"
}
```

#### Update Rating
```http
PUT /api/ratings/{id}
Authorization: Bearer {token}
```

#### Delete Rating
```http
DELETE /api/ratings/{id}
Authorization: Bearer {token}
```

### Image Endpoints

#### Upload Image
```http
POST /api/images/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

image: [file]
name: "Image Name" (optional)
```

**Response:**
```json
{
  "message": "Image uploaded successfully",
  "image": {
    "id": "uuid",
    "name": "Image Name",
    "url": "/storage/images/uuid.jpg",
    "full_url": "http://localhost:8000/storage/images/uuid.jpg"
  }
}
```

#### Get Image
```http
GET /api/images/{id}
```

#### Delete Image
```http
DELETE /api/images/{id}
Authorization: Bearer {token}
```

---

## Admin Panel

### Access

Admin panel is accessible at:
```
http://localhost:8000/admin
```

### Default Admin Credentials

After running seeders:
- **Email**: `admin@example.com`
- **Password**: `password`

### Available Resources

The admin panel provides full CRUD operations for:

1. **Users** - Manage user accounts, roles, and permissions
2. **Images** - Upload and manage images
3. **Categories** - Manage venue categories
4. **Venues** - Manage venues and their information
5. **Grounds** - Manage individual grounds/courts
6. **Price Lists** - Manage pricing structures
7. **Price List Details** - Manage detailed pricing
8. **Service Lists** - Manage service categories
9. **Service List Details** - Manage individual services
10. **Terms** - Manage terms and conditions
11. **Events** - Manage events
12. **Bookings** - View and manage bookings
13. **Payments** - View and manage payments
14. **Ratings** - View and manage ratings

### Features

- **Search & Filter**: All tables support search and filtering
- **Sorting**: Click column headers to sort
- **Bulk Actions**: Select multiple records for bulk operations
- **Image Upload**: Direct image upload in forms
- **Relationship Management**: Easy management of related data
- **Responsive Design**: Works on desktop and mobile

---

## Installation & Setup

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js and NPM
- SQLite (or MySQL/PostgreSQL)

### Step 1: Clone and Install Dependencies

```bash
# Install PHP dependencies
composer install

# Install NPM dependencies
npm install
```

### Step 2: Environment Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

### Step 3: Database Setup

For SQLite (default):
```bash
touch database/database.sqlite
```

Or configure MySQL/PostgreSQL in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Run migrations:
```bash
php artisan migrate
```

### Step 4: Seed Database

```bash
php artisan db:seed
```

This will create:
- Admin user (admin@example.com / password)
- Sample categories, users, venues, bookings, etc.

### Step 5: Create Storage Link

```bash
php artisan storage:link
```

This creates a symbolic link from `public/storage` to `storage/app/public` for image access.

### Step 6: Start Development Server

```bash
composer run dev
```

This will start:
- Laravel development server (http://localhost:8000)
- Queue worker
- Vite dev server (for frontend assets)
- Log viewer (if pcntl extension available)

Or start individually:

```bash
# Laravel server
php artisan serve

# Vite (in separate terminal)
npm run dev
```

### Step 7: Access the System

- **Admin Panel**: http://localhost:8000/admin
- **API**: http://localhost:8000/api
- **API Documentation**: See [API Documentation](#api-documentation) section

---

## Project Structure

```
project1/
├── app/
│   ├── Filament/
│   │   └── Resources/          # Filament admin resources
│   │       ├── Users/
│   │       ├── Venues/
│   │       ├── Categories/
│   │       └── ...
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── Api/            # API controllers
│   │   │       ├── AuthController.php
│   │   │       ├── VenueController.php
│   │   │       ├── BookingController.php
│   │   │       └── ...
│   │   └── Resources/          # API resources (JSON transformers)
│   │       ├── VenueResource.php
│   │       ├── BookingResource.php
│   │       └── ...
│   └── Models/                 # Eloquent models
│       ├── User.php
│       ├── Venue.php
│       ├── Booking.php
│       └── ...
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
│       ├── DatabaseSeeder.php
│       ├── AdminUserSeeder.php
│       └── ...
├── routes/
│   ├── api.php                 # API routes
│   └── web.php                 # Web routes
├── config/
│   ├── filesystems.php         # Storage configuration
│   └── sanctum.php             # Sanctum configuration
├── storage/
│   └── app/
│       └── public/
│           └── images/         # Uploaded images
└── public/
    └── storage -> storage/app/public  # Symbolic link
```

---

## Features

### 1. User Management
- User registration and authentication
- Role-based access control (Admin, Owner, Customer)
- User profiles with avatars and cover images
- Account activation/deactivation

### 2. Venue Management
- Create and manage venues
- Multiple images per venue
- Category assignment
- Operating hours and contact information
- Deposit configuration

### 3. Booking System
- Time-slot based bookings
- Event bookings
- Booking status management
- Customer and owner notes
- Quantity/participant management

### 4. Pricing System
- Flexible pricing with date/time rules
- Different prices for fixed customers vs walk-ins
- Price lists per venue
- Service pricing (wholesale/retail)

### 5. Payment System
- Multiple payment methods (Cash, Card, Online)
- Payment status tracking
- Linked to bookings

### 6. Rating & Review System
- 5-star rating system
- Text reviews
- One rating per user per venue

### 7. Image Management
- Image upload via API and admin panel
- Support for local and cloud storage
- Image metadata storage

---

## Image Storage

### Current Setup: Local Storage

Images are stored in `storage/app/public/images/` and accessible via:
```
http://localhost:8000/storage/images/{filename}
```

### Cloudinary Setup (Ready)

Cloudinary package is installed. To enable:

1. Sign up at https://cloudinary.com (Free tier: 25GB storage, 25GB bandwidth/month)

2. Add to `.env`:
```env
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name
```

3. Update `ImageController` to use Cloudinary:
```php
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;

// In upload method:
$uploadedFile = Cloudinary::upload($file->getRealPath(), [
    'folder' => 'venue_images',
]);
$imageUrl = $uploadedFile->getSecurePath();
```

### Storage Configuration

Storage configuration is in `config/filesystems.php`. The `public` disk is configured for local storage.

---

## Authentication

### Laravel Sanctum

The API uses Laravel Sanctum for token-based authentication.

### Token Generation

After login/register, a token is returned:
```json
{
  "token": "1|abcdef123456..."
}
```

### Using Tokens

Include the token in the `Authorization` header:
```http
Authorization: Bearer 1|abcdef123456...
```

### Token Expiration

By default, tokens don't expire. To configure expiration, edit `config/sanctum.php`:
```php
'expiration' => 60, // minutes
```

### Logout

Calling the logout endpoint will revoke the current token.

---

## Development Commands

```bash
# Run development server (all services)
composer run dev

# Run migrations
php artisan migrate

# Fresh migration with seeding
php artisan migrate:fresh --seed

# Run seeders only
php artisan db:seed

# Clear caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Create storage link
php artisan storage:link

# Run tests
php artisan test
```

---

## Troubleshooting

### Issue: "Vite not recognized"
**Solution**: Run `npm install`

### Issue: "pcntl extension required"
**Solution**: This is expected on Windows. The `dev.php` script handles this automatically.

### Issue: Images not displaying
**Solution**: Run `php artisan storage:link` to create the symbolic link.

### Issue: "SQLSTATE[HY000]: General error"
**Solution**: Check migration order. Run `php artisan migrate:fresh` to reset.

### Issue: API returns 401 Unauthorized
**Solution**: Ensure you're including the Bearer token in the Authorization header.

---

## Support & Contact

For issues or questions, please refer to:
- Laravel Documentation: https://laravel.com/docs
- Filament Documentation: https://filamentphp.com/docs
- Laravel Sanctum: https://laravel.com/docs/sanctum

---

**Last Updated**: December 2025
**Version**: 1.0.0


