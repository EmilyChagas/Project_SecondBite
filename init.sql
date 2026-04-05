-- init.sql

-- Tabela de usuários
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de roles
CREATE TABLE user_roles (
    user_id UUID NOT NULL REFERENCES users(id),
    roles VARCHAR(50) NOT NULL
);

-- Tabela de consumidores
CREATE TABLE consumers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cpf VARCHAR(15) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(200),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id)
);

-- Tabela de feirantes
CREATE TABLE marketers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(200),
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    stall_name VARCHAR(100),
    operating_schedule VARCHAR(100),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id)
);

-- Tabela de produtos
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    size_type VARCHAR(10) NOT NULL,
    validation DATE NOT NULL,
    price DECIMAL(18,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    quantity INTEGER NOT NULL,
    is_auto_discount BOOLEAN DEFAULT TRUE NOT NULL,
    manual_discount_percentage INTEGER,
    created_at TIMESTAMP DEFAULT NOW(),
    modified_at TIMESTAMP DEFAULT NOW(),
    marketer_id UUID NOT NULL REFERENCES marketers(id)
);

-- Tabela de imagens dos produtos
CREATE TABLE product_images (
    product_id UUID NOT NULL REFERENCES products(id),
    image_filename VARCHAR(500)
);

-- ==========================================
-- INSERTS
-- ==========================================

-- Usuário Consumer (senha: 124678)
INSERT INTO users (id, name, email, password)
VALUES (
    'a1b2c3d4-0000-0000-0000-000000000001',
    'João Silva',
    'joao@email.com',
    '$2a$10$N/VWO2PbYFcp1.MWfx3l/e5etOvInHIZo3NtVz0V4jUT8skJirbh2' -- correspondente à senha
);

INSERT INTO user_roles (user_id, roles) VALUES ('a1b2c3d4-0000-0000-0000-000000000001', 'CONSUMER');

INSERT INTO consumers (id, cpf, phone, address, user_id)
VALUES (
    gen_random_uuid(),
    '123.456.789-00',
    '(11) 99999-9999',
    'Rua das Palmeiras, 100',
    'a1b2c3d4-0000-0000-0000-000000000001'
);

-- Usuário Marketer (senha: 123senha)
INSERT INTO users (id, name, email, password)
VALUES (
    'a1b2c3d4-0000-0000-0000-000000000002',
    'Maria Feirante',
    'maria@email.com',
    '$2a$10$uuUpb5.Q155o2.mcmOFPVOhz1bgM1HzrvaipRA8BPZmr7vcE/6Tre' -- correspondente à senha
);

INSERT INTO user_roles (user_id, roles) VALUES ('a1b2c3d4-0000-0000-0000-000000000002', 'MARKETER');

INSERT INTO marketers (id, cnpj, phone, address, latitude, longitude, stall_name, operating_schedule, user_id)
VALUES (
    'c1b2c3d4-0000-0000-0000-000000000002',
    '12.345.678/0001-90',
    '(11) 98888-8888',
    'Feira Livre, Praça Central',
    -23.5505,
    -46.6333,
    'Barraca da Maria',
    'Seg-Sab 06:00-14:00',
    'a1b2c3d4-0000-0000-0000-000000000002'
);

-- Produtos
INSERT INTO products (id, name, description, size_type, validation, price, category, quantity, is_auto_discount, marketer_id)
VALUES
(
    'b1000000-0000-0000-0000-000000000001',
    'Tomate Italiano', 'Tomate fresco tipo italiano', 'kg',
    CURRENT_DATE + INTERVAL '3 days', 6.00, 'VEGETABLE', 50, true,
    'c1b2c3d4-0000-0000-0000-000000000002'
),
(
    'b1000000-0000-0000-0000-000000000002',
    'Banana Nanica', 'Banana nanica madura', 'kg',
    CURRENT_DATE + INTERVAL '2 days', 5.00, 'FRUIT', 30, true,
    'c1b2c3d4-0000-0000-0000-000000000002'
),
(
    'b1000000-0000-0000-0000-000000000003',
    'Maçã Gala', 'Maçã gala doce e crocante', 'kg',
    CURRENT_DATE + INTERVAL '4 days', 8.00, 'FRUIT', 25, false,
    'c1b2c3d4-0000-0000-0000-000000000002'
),
(
    'b1000000-0000-0000-0000-000000000004',
    'Cenoura', 'Cenoura orgânica', 'kg',
    CURRENT_DATE + INTERVAL '5 days', 3.50, 'ROOT', 40, false,
    'c1b2c3d4-0000-0000-0000-000000000002'
),
(
    'b1000000-0000-0000-0000-000000000005',
    'Brócolis Ninja', 'Brócolis ninja fresco', 'unidade',
    CURRENT_DATE + INTERVAL '2 days', 7.00, 'VEGETABLE', 12, true,
    'c1b2c3d4-0000-0000-0000-000000000002'
),
(
    'b1000000-0000-0000-0000-000000000006',
    'Uva Verde Itália', 'Uva itália verde e suculenta', 'kg',
    CURRENT_DATE + INTERVAL '4 days', 9.00, 'FRUIT', 20, false,
    'c1b2c3d4-0000-0000-0000-000000000002'
);

-- Imagens dos produtos
INSERT INTO product_images (product_id, image_filename) VALUES
('b1000000-0000-0000-0000-000000000001', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLlpvqUAMmQqQ_VlQzF6laowr-1T-fxbaPfw&s'),
('b1000000-0000-0000-0000-000000000002', 'https://ceagesp.gov.br/wp-content/uploads/2017/06/Banana-Nanica-28.9.2011-645-600x400.jpg'),
('b1000000-0000-0000-0000-000000000003', 'https://blog.epagri.sc.gov.br/wp-content/uploads/2022/12/Maca-Caste-Gala-Monte-Castelo-3.jpg'),
('b1000000-0000-0000-0000-000000000004', 'https://www.coisasdaroca.com/wp-content/uploads/2018/02/Cenoura-1.jpg'),
('b1000000-0000-0000-0000-000000000005', 'https://static.biologianet.com/2019/04/brocolis.jpg'),
('b1000000-0000-0000-0000-000000000006', 'https://anfrut.com.br/wp-content/uploads/2023/04/Uva-Italia.jpg');