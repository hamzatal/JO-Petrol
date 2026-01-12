# JO Petrol - Users Management System

نظام عرض المستخدمين لشركة JO Petrol باستخدام React + Laravel + SQL Server

## المتطلبات
- PHP 8.1+ و Composer
- Node.js 16+ و npm  
- SQL Server 2019+
- Laravel 10+
- React 18+

## التثبيت السريع

### 1. قاعدة البيانات (SQL Server)
```sql
CREATE DATABASE JoPetrolDB;
GO
USE JoPetrolDB;
GO
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE
);
GO
INSERT INTO users (name, email) VALUES 
('Ahmad Al-Mohammad', 'ahmad@example.com'),
('Sara Hassan', 'sara@example.com'),
('Omar Khalil', 'omar@example.com');
GO
