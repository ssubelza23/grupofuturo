
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    photo TEXT,
    user_type VARCHAR(20) CHECK (user_type IN ('comprador', 'vendedor')) NOT NULL,
    dni VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insertar un usuario de ejemplo
INSERT INTO users (username, first_name, last_name, email, password, phone, photo, user_type, dni)
VALUES ('johndoe', 'John', 'Doe', 'johndoe@example.com', 'hashed_password', '123456', 'path/to/photo.jpg', 'comprador', '12345678');