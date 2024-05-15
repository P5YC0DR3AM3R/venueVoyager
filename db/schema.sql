-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS stadiums;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create stadiums table
CREATE TABLE stadiums (
  id SERIAL PRIMARY KEY,
  stadium VARCHAR(100) NOT NULL,
  team VARCHAR(50) NOT NULL,
  league VARCHAR(50),
  division VARCHAR(50),
  city VARCHAR(50) NOT NULL,
  state VARCHAR(50) NOT NULL,
  latitude VARCHAR(100),
  logitude VARCHAR(100),
  image VARCHAR(255)
);

-- Create posts table
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  content TEXT NOT NULL,
  user_id INTEGER REFERENCES users(id),
  stadium_id INTEGER REFERENCES stadiums(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
