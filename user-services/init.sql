
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100),
    phone VARCHAR(20),
    photo TEXT,
    user_type VARCHAR(20) CHECK (user_type IN ('comprador', 'vendedor')),
    dni VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
