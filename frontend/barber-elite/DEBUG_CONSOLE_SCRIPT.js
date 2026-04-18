// SCRIPT DE DEBUG PARA COLAR NO CONSOLE
// Cole este script inteiro no console do navegador (F12 > Console)

console.clear();
console.log('🔧 === INICIANDO DIAGNÓSTICO ===\n');

// 1. Verificar localStorage
const token = localStorage.getItem('barber_elite_token');
const sessionId = localStorage.getItem('barber_elite_sessionId');
const debugLogs = JSON.parse(localStorage.getItem('barber_elite_debug_log') || '[]');

console.log('📋 TOKEN:');
console.log(token ? `✅ Existe (${token.length} caracteres)` : '❌ NÃO EXISTE');
console.log('');

console.log('📋 SESSION ID:');
console.log(sessionId ? `✅ Existe: ${sessionId}` : '❌ NÃO EXISTE');
console.log('');

console.log('🍪 COOKIES:');
console.log(document.cookie ? document.cookie : '❌ COOKIES VAZIOS');
console.log('');

console.log('📝 DEBUG LOGS:');
if (debugLogs.length > 0) {
  debugLogs.forEach((log) => {
    console.log(`[${log.timestamp}] ${log.message}`);
  });
} else {
  console.log('❌ Nenhum log encontrado');
}
console.log('');

console.log('💾 LOCALSTORAGE COMPLETO:');
console.log(JSON.stringify(localStorage, null, 2));
console.log('');

console.log('🔧 === FIM DO DIAGNÓSTICO ===');
