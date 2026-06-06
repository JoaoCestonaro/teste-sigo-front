import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { WorkshopFlowAnimation } from "@/components/LandingPage/WorkshopFlowAnimation";
import styles from "./landing-page.module.css";

const modules = [
  {
    title: "Ordens de serviço",
    text: "Controle serviços, peças, valores, prazos, observações e responsáveis em um único registro.",
  },
  {
    title: "Clientes e veículos",
    text: "Mantenha histórico por cliente, placa, modelo, marca, chassi, quilometragem e atendimentos realizados.",
  },
  {
    title: "Estoque de peças",
    text: "Acompanhe peças, fornecedores, quantidades, garantias, valores e vínculo com pedidos.",
  },
  {
    title: "Equipe da oficina",
    text: "Organize funcionários, cargos, serviços executados e participação em cada atendimento.",
  },
  {
    title: "Relatórios gerenciais",
    text: "Filtre dados por período, cliente, veículo, status, pagamento, serviços e peças.",
  },
  {
    title: "Área do cliente",
    text: "Ofereça transparência para acompanhar pedidos, histórico de manutenção e custos do veículo.",
  },
];

const audiences = [
  {
    role: "Oficinas",
    value: "centralizam operação, estoque e atendimento sem depender de planilhas soltas.",
  },
  {
    role: "Funcionários",
    value: "consultam pedidos, veículos, peças e serviços com menos retrabalho.",
  },
  {
    role: "Clientes",
    value: "acompanham o histórico do veículo e entendem melhor o que foi realizado.",
  },
];

const outcomes = [
  "Menos retrabalho administrativo",
  "Mais clareza no histórico de manutenção",
  "Controle de peças e serviços por pedido",
  "Dados organizados para tomada de decisão",
  "Comunicação mais transparente com o cliente",
  "Acesso web para diferentes perfis de usuário",
];

const steps = [
  "Cadastre clientes, oficinas, funcionários e veículos",
  "Abra pedidos com serviços, peças e responsáveis",
  "Acompanhe status, custos e histórico em tempo real",
  "Use relatórios para melhorar decisões da oficina",
];

export const metadata: Metadata = {
  title: "SIGO | Sistema de Gestão para Oficinas",
  description:
    "SIGO é um sistema web para informatização e gerenciamento de oficinas, com ordens de serviço, veículos, clientes, peças, funcionários, relatórios e área do cliente.",
  keywords: [
    "SIGO",
    "sistema para oficina",
    "gestão de oficinas",
    "ordem de serviço oficina",
    "controle de peças",
    "histórico de manutenção",
    "sistema web para oficina mecânica",
  ],
  alternates: {
    canonical: "/landing-page",
  },
};

export default function LandingPage() {
  return (
    <main className={styles.page}>
      <a className={styles.skipLink} href="#conteudo">
        Pular para o conteúdo
      </a>

      <header className={styles.header}>
        <Link className={styles.brand} href="/landing-page" aria-label="SIGO">
          <Image
            src="/sigo-logo.png"
            alt="Logo SIGO"
            width={52}
            height={52}
            className={styles.logo}
          />
          <span>
            <strong>SIGO</strong>
            <small>Sistema de gestão de oficinas</small>
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Navegação da landing page">
          <a href="#modulos">Módulos</a>
          <a href="#fluxo">Fluxo</a>
          <a href="#beneficios">Benefícios</a>
        </nav>

        <Link className={styles.navButton} href="/login">
          Entrar
        </Link>
      </header>

      <section id="conteudo" className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Projeto Integrador Fatec Jales</span>
          <h1 id="hero-title">Gestão de oficinas com ordens, veículos e peças no mesmo lugar.</h1>
          <p>
            O SIGO moderniza o atendimento de oficinas mecânicas ao centralizar
            clientes, veículos, ordens de serviço, estoque, equipe e relatórios
            em uma plataforma web objetiva.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/cadastro">
              Criar acesso
            </Link>
            <Link className={styles.secondaryButton} href="/login">
              Entrar no sistema
            </Link>
          </div>

          <dl className={styles.metrics} aria-label="Destaques do SIGO">
            <div>
              <dt>Perfis</dt>
              <dd>Oficina, funcionário e cliente</dd>
            </div>
            <div>
              <dt>Controle</dt>
              <dd>OS, peças, veículos e serviços</dd>
            </div>
            <div>
              <dt>Foco</dt>
              <dd>Eficiência e transparência</dd>
            </div>
          </dl>
        </div>

        <div className={styles.productVisual} aria-label="Prévia visual do painel SIGO">
          <div className={styles.dashboardShell}>
            <div className={styles.dashboardTop}>
              <span />
              <span />
              <span />
            </div>
            <div className={styles.dashboardBody}>
              <aside>
                <strong>SIGO</strong>
                <span>Pedidos</span>
                <span>Veículos</span>
                <span>Clientes</span>
                <span>Peças</span>
              </aside>
              <section>
                <div className={styles.panelTitle}>
                  <span>Ordem #2481</span>
                  <strong>Em andamento</strong>
                </div>
                <div className={styles.progressLine}>
                  <span />
                </div>
                <div className={styles.dataGrid}>
                  <div>
                    <small>Cliente</small>
                    <strong>Mariana Alves</strong>
                  </div>
                  <div>
                    <small>Veículo</small>
                    <strong>HB20 2021</strong>
                  </div>
                  <div>
                    <small>Peças</small>
                    <strong>3 itens</strong>
                  </div>
                  <div>
                    <small>Serviço</small>
                    <strong>Revisão completa</strong>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section id="modulos" className={styles.section} aria-labelledby="modulos-title">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Módulos principais</span>
          <h2 id="modulos-title">Tudo que a oficina precisa acompanhar sem perder informação.</h2>
          <p>
            A documentação do projeto define um sistema integrado para substituir
            processos manuais, planilhas dispersas e registros desconectados.
          </p>
        </div>

        <div className={styles.moduleGrid}>
          {modules.map((module) => (
            <article className={styles.moduleCard} key={module.title}>
              <h3>{module.title}</h3>
              <p>{module.text}</p>
            </article>
          ))}
        </div>
      </section>

      <div id="fluxo">
        <WorkshopFlowAnimation />
      </div>

      <section className={styles.section} aria-labelledby="publicos-title">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Acesso por perfil</span>
          <h2 id="publicos-title">Cada usuário enxerga o que precisa para trabalhar melhor.</h2>
        </div>

        <div className={styles.audienceGrid}>
          {audiences.map((audience) => (
            <article key={audience.role}>
              <span>{audience.role}</span>
              <p>{audience.value}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="beneficios" className={styles.benefitsSection} aria-labelledby="beneficios-title">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Impacto esperado</span>
          <h2 id="beneficios-title">Mais organização para a oficina e mais confiança para o cliente.</h2>
          <p>
            O SIGO foi pensado para reduzir burocracia, melhorar a rastreabilidade
            das manutenções e apoiar decisões com dados mais confiáveis.
          </p>
        </div>

        <ul className={styles.outcomeList}>
          {outcomes.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="como-funciona">
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Como funciona</span>
          <h2 id="como-funciona">Um fluxo simples para informatizar a rotina da oficina.</h2>
        </div>

        <ol className={styles.steps}>
          {steps.map((step, index) => (
            <li key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.finalCta} aria-labelledby="cta-title">
        <span className={styles.eyebrow}>SIGO</span>
        <h2 id="cta-title">Leve a gestão da oficina para um ambiente web centralizado.</h2>
        <p>
          Use a página de cadastro para criar o acesso ou entre no sistema para
          gerenciar clientes, veículos, pedidos, peças e relatórios.
        </p>
        <div className={styles.heroActions}>
          <Link className={styles.primaryButton} href="/cadastro">
            Começar cadastro
          </Link>
          <Link className={styles.secondaryButton} href="/login">
            Acessar login
          </Link>
        </div>
      </section>
    </main>
  );
}
