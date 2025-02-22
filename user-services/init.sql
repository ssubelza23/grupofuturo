
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) DEFAULT NULL,
    email VARCHAR(100) DEFAULT NULL,
    password VARCHAR(100),
    phone VARCHAR(20) DEFAULT NULL,
    photo TEXT DEFAULT NULL,
    user_type VARCHAR(20) CHECK (user_type IN ('comprador', 'vendedor')) DEFAULT NULL,
    dni VARCHAR(20) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
