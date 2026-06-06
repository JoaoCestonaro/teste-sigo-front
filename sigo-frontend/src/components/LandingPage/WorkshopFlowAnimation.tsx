"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/landing-page/landing-page.module.css";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export function WorkshopFlowAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const indicator = indicatorRef.current;
    if (!section || !indicator) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const render = () => {
      frameRef.current = null;

      if (reducedMotion.matches || window.innerWidth < 760) {
        indicator.style.transform = "translate3d(0, 0, 0)";
        indicator.style.opacity = "1";
        return;
      }

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;
      const progress = clamp(
        (viewportHeight * 0.78 - rect.top) / (rect.height - viewportHeight * 0.42),
        0,
        1
      );

      const x = progress * 92;
      const y = Math.sin(progress * Math.PI * 1.2) * -18;
      indicator.style.transform = `translate3d(${x}%, ${y}px, 0)`;
      indicator.style.opacity = `${0.72 + progress * 0.28}`;
    };

    const requestRender = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(render);
    };

    requestRender();
    window.addEventListener("scroll", requestRender, { passive: true });
    window.addEventListener("resize", requestRender);
    reducedMotion.addEventListener("change", requestRender);

    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener("scroll", requestRender);
      window.removeEventListener("resize", requestRender);
      reducedMotion.removeEventListener("change", requestRender);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.flowSection}
      aria-labelledby="fluxo-oficina"
    >
      <div className={styles.flowInner}>
        <div className={styles.sectionHeader}>
          <span className={styles.eyebrow}>Fluxo integrado</span>
          <h2 id="fluxo-oficina">A ordem de serviço deixa de ficar espalhada.</h2>
          <p>
            O SIGO conecta cliente, veículo, peças, serviços e equipe em uma
            sequência única. A informação acompanha o atendimento do cadastro ao
            relatório final.
          </p>
        </div>

        <div className={styles.flowBoard} aria-hidden="true">
          <div className={styles.flowRail}>
            <div ref={indicatorRef} className={styles.flowIndicator}>
              OS
            </div>
          </div>

          <div className={styles.flowCards}>
            <div>
              <span>01</span>
              <strong>Cliente e veículo</strong>
              <small>Dados, placa, marca e histórico reunidos.</small>
            </div>
            <div>
              <span>02</span>
              <strong>Serviços e peças</strong>
              <small>Itens usados, garantias, valores e estoque.</small>
            </div>
            <div>
              <span>03</span>
              <strong>Equipe e status</strong>
              <small>Funcionários envolvidos e andamento da OS.</small>
            </div>
            <div>
              <span>04</span>
              <strong>Relatórios</strong>
              <small>Indicadores para gestão e transparência.</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
