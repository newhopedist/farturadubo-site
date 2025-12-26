-- Inserir produto principal: Ureia Fertilizante
INSERT INTO products (slug, name, description, category, price, active, imagem_url) VALUES 
('ureia-fertilizante', 'Ureia Fertilizante 45% N', 'Ureia de alta qualidade com 45% de nitrogênio. Fertilizante de liberação rápida, ideal para todas as culturas. Disponível em embalagens de 5kg, 25kg, 500kg e 1000kg.', 'fertilizante', 45.00, true, '/25KG.webp');

-- Inserir preços por peso/embalaagem
INSERT INTO product_prices (produto_id, peso, preco, estoque, ativo) VALUES 
-- Produto 1 (ureia) - diferentes tamanhos
(1, '5kg', 45.00, 100, true),
(1, '25kg', 180.00, 50, true),
(1, '500kg', 3200.00, 20, true),
(1, '1000kg', 6000.00, 10, true);

-- Inserir produtos adicionais para variedade
INSERT INTO products (slug, name, description, category, price, active, imagem_url) VALUES 
('farturamax-adubo', 'FARTURAMAX Adubo Organomineral', 'Adubo organomineral de alta eficiência para agricultura. Formulado com matéria orgânica e nutrientes essenciais.', 'adubo', 85.00, true, '/Packs.webp'),
('fartureia-especial', 'FARTUREIA Especial', 'Fertilizante especial desenvolvido para culturas que necessitam de maior quantidade de nitrogênio.', 'fertilizante', 220.00, true, '/5KG.webp');

-- Inserir preços para produtos adicionais
INSERT INTO product_prices (produto_id, peso, preco, estoque, ativo) VALUES 
-- FARTURAMAX
(2, '25kg', 85.00, 75, true),
(2, '500kg', 1500.00, 15, true),
(2, '1000kg', 2800.00, 8, true),

-- FARTUREIA Especial
(3, '25kg', 220.00, 40, true),
(3, '500kg', 4000.00, 12, true),
(3, '1000kg', 7500.00, 5, true);