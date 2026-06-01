import { TextInput } from "@/components/Form/TextInput";

type ConnectionSettingsProps = {
  baseUrl: string;
  onBaseUrlChange: (value: string) => void;
  token?: string;
};

export function ConnectionSettings({
  baseUrl,
  onBaseUrlChange,
  token,
}: ConnectionSettingsProps) {
  return (
    <details className="sigo-card-soft group overflow-hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-[var(--sigo-blue-deep)]">
        <span>Configuração avançada</span>
        <span className="text-xs font-semibold text-[var(--sigo-muted)] group-open:hidden">
          Mostrar
        </span>
        <span className="hidden text-xs font-semibold text-[var(--sigo-muted)] group-open:inline">
          Ocultar
        </span>
      </summary>
      <div className="grid gap-4 border-t border-[var(--sigo-border)] bg-white p-4">
        <TextInput
          label="URL base da API"
          value={baseUrl}
          onChange={onBaseUrlChange}
          placeholder="http://localhost:5044"
          helperText="Use apenas se precisar apontar o front para outra API."
        />
        {token !== undefined ? (
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--sigo-border)] bg-[var(--sigo-surface-soft)] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[var(--sigo-text)]">
                Estado da sessao
              </p>
              <p className="text-xs font-medium text-[var(--sigo-muted)]">
                O token fica armazenado internamente e nao e exibido aqui.
              </p>
            </div>
            <span className={`sigo-badge ${token ? "sigo-badge-success" : ""}`}>
              {token ? "Sessao ativa" : "Sem sessao"}
            </span>
          </div>
        ) : null}
      </div>
    </details>
  );
}
