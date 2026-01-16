const { createClient } = require('@supabase/supabase-js');

try {
  console.log('Tentando criar cliente com strings vazias...');
  const supabase = createClient('', '');
  console.log('Cliente criado com sucesso!');
  
  console.log('Tentando fazer query...');
  supabase.from('products').select('*').then(({ data, error }) => {
    console.log('Query result:', { data, error });
  }).catch(err => {
    console.log('Query catch:', err);
  });

} catch (err) {
  console.error('Erro ao criar cliente:', err.message);
}