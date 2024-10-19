import styles from './index.module.css'

export default function Planos() {
    return (
        <section className={styles.planos}>
            <div className={styles.planos_item}>
                <h2>Plano Básico</h2>
                <span>R$</span>
                <p className={styles.planos_price}>0,00</p>
                <ul>
                    <li>* Limite de quizzes diários.</li>
                    <hr/>
                    <li>* Relatórios básicos de desempenho.</li>
                    <hr/>
                    <li>* Exibição de anúncios entre os quizzes.</li>
                </ul>
                <button className={styles.planos_btn}>Escolher</button>
            </div>
            <div className={styles.planos_item}>
                <h2>Plano Premium</h2>
                <span>R$</span>
                <p className={styles.planos_price}>19,00</p>
                <ul>
                    <li>* Sem limite diário de quizzes.</li>
                    <hr/>
                    <li>* Acesso a quizzes e conteúdos especiais.</li>
                    <hr/>
                    <li>* Experiência sem interrupções com a remoção de anúncios.</li>
                </ul>
                <button className={styles.planos_btn}>Escolher</button>
            </div>
        </section>
    )
}