require('dotenv').config();
const pool = require('./config/database');

const createTables = async () => {
  const createProjectsTable = `
 CREATE TABLE public.projects (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    location character varying(100) NOT NULL,
    coordinates public.geometry(Polygon,4326),
    photos text[],
    description text
);
  `;

  const createBlocksTable = `
  CREATE TABLE public.blocks (
    id integer NOT NULL,
    project_id integer,
    name character varying(100) NOT NULL,
    coordinates public.geometry(Polygon,4326),
    description text
);
  `;

  const createLotsTable = `
 CREATE TABLE public.lots (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    coordinates public.geometry(Polygon,4326),
    status character varying(100) DEFAULT 'available'::character varying,
    surface numeric(10,2) NOT NULL,
    discount numeric(10,2),
    initial_payment numeric(10,2),
    number_of_installments integer DEFAULT 6,
    monto_financiado numeric(10,2),
    cuota_mensual numeric(10,2),
    price numeric NOT NULL,
    reserved_until timestamp without time zone,
    reserved_by character varying(100),
    reserved_for character varying(100),
    description character varying(100),
    block_id integer
);
  `;

  const createStreetsTable = `
  CREATE TABLE public.streets (
    id integer NOT NULL,
    project_id integer,
    name character varying(100) NOT NULL,
    coordinates public.geometry(LineString,4326) NOT NULL
);
  `;

  try {
    await pool.query(createProjectsTable);
    await pool.query(createBlocksTable);
    await pool.query(createLotsTable);
    await pool.query(createStreetsTable);
    console.log('Tablas creadas exitosamente');
  } catch (err) {
    console.error('Error al crear las tablas:', err);
  } finally {
    pool.end();
  }
};

createTables();