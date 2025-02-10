CREATE TABLE IF NOT EXISTS public.projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    coordinates public.geometry(Polygon, 4326),
    photos TEXT[],
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.blocks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES public.projects(id),
    name VARCHAR(100) NOT NULL,
    coordinates public.geometry(Polygon, 4326),
    description TEXT
);

CREATE TABLE IF NOT EXISTS public.lots (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    coordinates public.geometry(Polygon, 4326),
    status VARCHAR(100) DEFAULT 'available',
    surface NUMERIC(10, 2) NOT NULL,
    discount NUMERIC(10, 2),
    initial_payment NUMERIC(10, 2),
    number_of_installments INTEGER DEFAULT 6,
    monto_financiado NUMERIC(10, 2),
    cuota_mensual NUMERIC(10, 2),
    price NUMERIC NOT NULL,
    reserved_until TIMESTAMP,
    reserved_by VARCHAR(100),
    reserved_for VARCHAR(100),
    description VARCHAR(100),
    block_id INTEGER REFERENCES public.blocks(id)
);

CREATE TABLE IF NOT EXISTS public.streets (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES public.projects(id),
    name VARCHAR(100) NOT NULL,
    coordinates public.geometry(LineString, 4326) NOT NULL
);