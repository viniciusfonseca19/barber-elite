import { useEffect, useState } from 'react'
import authService from '../services/authService'

export default function DebugPage() {
  const [debugInfo, setDebugInfo] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('barber_elite_token')
    const sessionId = localStorage.getItem('barber_elite_sessionId')
    const logs = authService.getDebugLogs()

    setDebugInfo({
      token: token ? `${token.substring(0, 50)}...` : 'Não encontrado',
      sessionId: sessionId || 'Não encontrado',
      cookies: document.cookie || 'Vazio',
      localStorage: {
        barber_elite_token: token ? 'Existe' : 'Não existe',
        barber_elite_sessionId: sessionId ? 'Existe' : 'Não existe',
      },
      logs: logs,
      localStorage_raw: JSON.stringify(localStorage, null, 2),
    })
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#1e1e1e', color: '#d4d4d4', minHeight: '100vh' }}>
      <h1>🔧 Debug Page</h1>
      
      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>📝 Token</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{debugInfo.token}</pre>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>📝 Session ID</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{debugInfo.sessionId}</pre>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>🍪 Cookies</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{debugInfo.cookies}</pre>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>💾 LocalStorage</h2>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {JSON.stringify(debugInfo.localStorage, null, 2)}
        </pre>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>📋 Debug Logs</h2>
        {debugInfo.logs && debugInfo.logs.length > 0 ? (
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
            {debugInfo.logs.map((log, i) => `[${log.timestamp}] ${log.message}`).join('\n')}
          </pre>
        ) : (
          <p>Nenhum log encontrado</p>
        )}
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>🔍 LocalStorage Raw</h2>
        <button onClick={() => {
          const info = { ...debugInfo }
          info.localStorage_raw = JSON.stringify(localStorage, null, 2)
          setDebugInfo(info)
        }}>
          Atualizar
        </button>
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all', marginTop: '10px', fontSize: '11px' }}>
          {debugInfo.localStorage_raw}
        </pre>
      </section>

      <section style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#252526', borderRadius: '5px' }}>
        <h2>🗑️ Ações</h2>
        <button 
          onClick={() => {
            authService.clearDebugLogs()
            alert('Logs de debug limpos')
          }}
          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer' }}
        >
          Limpar Debug Logs
        </button>
        <button 
          onClick={() => {
            localStorage.clear()
            alert('LocalStorage completamente limpo')
            window.location.reload()
          }}
          style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', backgroundColor: '#d9534f', color: 'white' }}
        >
          ⚠️ Limpar Tudo
        </button>
        <button 
          onClick={() => window.location.href = '/login'}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Voltar para Login
        </button>
      </section>
    </div>
  )
}
