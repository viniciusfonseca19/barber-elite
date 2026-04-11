import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import AppointmentCard from '../components/appointments/AppointmentCard'
import Spinner from '../components/common/Spinner'
import Button from '../components/common/Button'
import { useAppointments } from '../hooks/useAppointments'
import { useToast } from '../hooks/useToast'
import clientService from '../services/clientService'
import { formatDate } from '../utils/formatters'
import styles from './AdminDashboard.module.css'

const TABS = [
  { id: 'scheduled', label: 'Agendados' },
  { id: 'all', label: 'Todos' },
  { id: 'clients', label: 'Clientes' },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('scheduled')
  const [clients, setClients] = useState([])
  const [clientsLoading, setClientsLoading] = useState(false)
  const toast = useToast()

  const mode = activeTab === 'all' ? 'all' : 'scheduled'
  const { appointments, loading, cancel, refetch } = useAppointments(mode)

  async function loadClients() {
    if (clients.length > 0) return
    setClientsLoading(true)
    try {
      const data = await clientService.findAll()
      setClients(data)
    } catch {
      toast.error('Erro ao carregar clientes')
    } finally {
      setClientsLoading(false)
    }
  }

  function handleTabChange(tab) {
    setActiveTab(tab)
    if (tab === 'clients') loadClients()
  }

  async function handleBlock(clientId, currentlyBlocked) {
    try {
      const action = currentlyBlocked ? clientService.unblock : clientService.block
      const updated = await action(clientId)
      setClients((prev) => prev.map((c) => (c.id === clientId ? updated : c)))
      toast.success(currentlyBlocked ? 'Cliente desbloqueado' : 'Cliente bloqueado')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erro ao atualizar cliente')
    }
  }

  // Estatísticas rápidas
  const stats = {
    total: appointments.length,
    scheduled: appointments.filter((a) => a.status === 'SCHEDULED').length,
    cancelled: appointments.filter((a) => a.status === 'CANCELLED').length,
    revenue: appointments
      .filter((a) => a.status === 'SCHEDULED')
      .reduce((sum, a) => sum + Number(a.service.price), 0),
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* Header */}
          <div className={styles.pageHeader}>
            <div>
              <h1 className={styles.pageTitle}>Painel do Barbeiro</h1>
              <p className={styles.pageSubtitle}>Gerencie seus agendamentos e clientes</p>
            </div>
            <Button variant="secondary" size="sm" onClick={refetch}>
              ↻ Atualizar
            </Button>
          </div>

          {/* Stats cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Agendados</span>
              <span className={styles.statValue}>{stats.scheduled}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Cancelados</span>
              <span className={[styles.statValue, styles.danger].join(' ')}>{stats.cancelled}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>Total</span>
              <span className={styles.statValue}>{stats.total}</span>
            </div>
            <div className={[styles.statCard, styles.goldCard].join(' ')}>
              <span className={styles.statLabel}>Receita prevista</span>
              <span className={[styles.statValue, styles.gold].join(' ')}>
                {stats.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className={styles.tabs} role="tablist">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={[styles.tab, activeTab === tab.id ? styles.activeTab : ''].join(' ')}
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Conteúdo das tabs */}
          <div role="tabpanel">

            {/* Agendamentos */}
            {activeTab !== 'clients' && (
              <>
                {loading ? (
                  <Spinner text="Carregando agendamentos..." />
                ) : appointments.length === 0 ? (
                  <div className={styles.empty}>
                    <span className={styles.emptyIcon}>📅</span>
                    <p>Nenhum agendamento encontrado.</p>
                  </div>
                ) : (
                  <div className={styles.appointmentsList}>
                    {/* Agrupa por data */}
                    {groupByDate(appointments).map(({ date, items }) => (
                      <div key={date} className={styles.dateGroup}>
                        <h3 className={styles.dateGroupLabel}>{formatDate(date)}</h3>
                        <div className={styles.cardsGrid}>
                          {items.map((a) => (
                            <AppointmentCard
                              key={a.id}
                              appointment={a}
                              isAdmin
                              onCancel={cancel}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Clientes */}
            {activeTab === 'clients' && (
              <>
                {clientsLoading ? (
                  <Spinner text="Carregando clientes..." />
                ) : clients.length === 0 ? (
                  <div className={styles.empty}>
                    <span className={styles.emptyIcon}>👤</span>
                    <p>Nenhum cliente cadastrado.</p>
                  </div>
                ) : (
                  <div className={styles.clientsTable}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Nome</th>
                          <th>Telefone</th>
                          <th>Status</th>
                          <th>Desde</th>
                          <th>Ação</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clients.map((c) => (
                          <tr key={c.id} className={c.isBlocked ? styles.blockedRow : ''}>
                            <td className={styles.clientName}>{c.fullName}</td>
                            <td className={styles.muted}>{c.phone}</td>
                            <td>
                              <span className={[
                                styles.statusPill,
                                c.isBlocked ? styles.blocked : styles.active
                              ].join(' ')}>
                                {c.isBlocked ? 'Bloqueado' : 'Ativo'}
                              </span>
                            </td>
                            <td className={styles.muted}>{formatDate(c.createdAt)}</td>
                            <td>
                              <Button
                                variant={c.isBlocked ? 'secondary' : 'danger'}
                                size="sm"
                                onClick={() => handleBlock(c.id, c.isBlocked)}
                              >
                                {c.isBlocked ? 'Desbloquear' : 'Bloquear'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}

// Helper: agrupa appointments por data (YYYY-MM-DD)
function groupByDate(appointments) {
  const map = new Map()
  for (const a of appointments) {
    const date = a.scheduledAt.slice(0, 10)
    if (!map.has(date)) map.set(date, [])
    map.get(date).push(a)
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, items]) => ({ date, items }))
}