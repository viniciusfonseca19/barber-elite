import { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import AppointmentForm from '../components/appointments/AppointmentForm'
import styles from './ClientDashboard.module.css'

export default function ClientDashboard() {
  const [successCount, setSuccessCount] = useState(0)

  function handleSuccess() {
    setSuccessCount((n) => n + 1)
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <div className={styles.container}>

          {/* Hero */}
          <section className={styles.hero}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Agende seu <span className={styles.highlight}>horário</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Escolha o serviço, data e horário. É rápido e simples.
              </p>
            </div>
            <div className={styles.heroMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaDot} />
                Seg – Sáb
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaDot} />
                09:30 – 12:00
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaDot} />
                14:00 – 18:00
              </div>
            </div>
          </section>

          {/* Formulário de agendamento */}
          <section className={styles.formSection}>
            <div className={styles.formCard}>
              <h2 className={styles.sectionTitle}>Novo agendamento</h2>
              <AppointmentForm onSuccess={handleSuccess} />
            </div>

            {/* Card de informações laterais */}
            <aside className={styles.sidebar}>
              <div className={styles.infoCard}>
                <h3 className={styles.infoTitle}>Como funciona</h3>
                <ol className={styles.steps}>
                  <li className={styles.step}>
                    <span className={styles.stepNum}>1</span>
                    <div>
                      <strong>Preencha seus dados</strong>
                      <p>Nome completo e telefone para contato.</p>
                    </div>
                  </li>
                  <li className={styles.step}>
                    <span className={styles.stepNum}>2</span>
                    <div>
                      <strong>Escolha data e horário</strong>
                      <p>Disponível seg–sáb nos turnos da manhã e tarde.</p>
                    </div>
                  </li>
                  <li className={styles.step}>
                    <span className={styles.stepNum}>3</span>
                    <div>
                      <strong>Selecione o serviço</strong>
                      <p>Veja os preços e escolha o que precisa.</p>
                    </div>
                  </li>
                  <li className={styles.step}>
                    <span className={styles.stepNum}>4</span>
                    <div>
                      <strong>Confirme e pronto!</strong>
                      <p>Seu horário estará reservado.</p>
                    </div>
                  </li>
                </ol>
              </div>

              {successCount > 0 && (
                <div className={styles.successBanner}>
                  <span className={styles.successIcon}>✓</span>
                  <div>
                    <strong>Agendamento confirmado!</strong>
                    <p>Apareça no horário marcado. Obrigado!</p>
                  </div>
                </div>
              )}
            </aside>
          </section>

        </div>
      </main>
    </div>
  )
}