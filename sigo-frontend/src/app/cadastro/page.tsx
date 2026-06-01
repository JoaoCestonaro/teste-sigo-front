"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { fetchJson } from "@/lib/api";
import { NavBar } from "@/components/Sidebar/NavBar";
import { TextInput } from "@/components/Form/TextInput";
import { routes } from "@/navigation/routes";
import { PublicOnlyRoute } from "@/components/Auth/RouteGuards";
import {
  enumOptionsByKey,
  formatCep,
  formatCpfCnpj,
  onlyDigits,
  stateOptions,
} from "@/lib/fieldMetadata";
import { fetchCepAddress } from "@/lib/cep";

type CadastroForm = {
  Nome: string;
  Email: string;
  senha: string;
  Senha: string;
  Documento: string;
  Obs: string;
  razao: string;
  DataNasc: string;
  Numero: number;
  Rua: string;
  Cidade: string;
  Cep: string;
  Bairro: string;
  Estado: string;
  Pais: string;
  Complemento: string;
  Sexo: number;
};

const buildDefaultForm = (): CadastroForm => ({
  Nome: "",
  Email: "",
  senha: "",
  Senha: "",
  Documento: "",
  Obs: "",
  razao: "",
  DataNasc: "",
  Numero: 0,
  Rua: "",
  Cidade: "",
  Cep: "",
  Bairro: "",
  Estado: "",
  Pais: "",
  Complemento: "",
  Sexo: 1,
});

const normalizeDigits = (value: string) => value.replace(/\D/g, "");

const isCnpjDocument = (value: string) => normalizeDigits(value).length > 11;

const extractErrorMessage = (data: unknown): string | null => {
  if (!data || typeof data !== "object") return null;
  const record = data as Record<string, unknown>;
  const message =
    (record.Message as string | undefined) ||
    (record.message as string | undefined) ||
    (record.title as string | undefined) ||
    (record.detail as string | undefined);

  if (message && message.trim()) return message;

  const errors = record.Errors ?? record.errors ?? record.data;
  if (errors && typeof errors === "object") {
    const values = Object.values(errors as Record<string, unknown>);
    const list = values.flatMap((value) => {
      if (typeof value === "string") return [value];
      if (Array.isArray(value)) {
        return value.filter((item) => typeof item === "string");
      }
      return [];
    });
    if (list.length > 0) return list.join(" | ");
  }

  return null;
};

type NumberFieldProps = {
  label: string;
  value: number;
  onChange: (value: string) => void;
};

function NumberField({ label, value, onChange }: NumberFieldProps) {
  return (
    <label className="sigo-label">
      <span>{label}</span>
      <input
        className="sigo-input"
        type="number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type SelectFieldProps = {
  label: string;
  value: string | number;
  options: Array<{ value: string | number; label: string }>;
  onChange: (value: string) => void;
};

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <label className="sigo-label">
      <span>{label}</span>
      <select
        className="sigo-input"
        value={String(value)}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={String(option.value)} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function CadastroPage() {
  const router = useRouter();
  const { baseUrl, setBaseUrl } = useAuth();
  const [formData, setFormData] = useState<CadastroForm>(buildDefaultForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCepLookup, setLastCepLookup] = useState("");

  const isCnpj = useMemo(
    () => isCnpjDocument(formData.Documento),
    [formData.Documento]
  );

  const updateField = (key: keyof CadastroForm, value: string) => {
    const maskedValue =
      key === "Documento"
        ? formatCpfCnpj(value)
        : key === "Cep"
          ? formatCep(value)
          : value;
    setFormData((prev) => ({ ...prev, [key]: maskedValue }));
  };

  const updateNumberField = (key: keyof CadastroForm, value: string) => {
    const parsed = Number(value);
    setFormData((prev) => ({
      ...prev,
      [key]: Number.isNaN(parsed) ? 0 : parsed,
    }));
  };

  useEffect(() => {
    const cepDigits = onlyDigits(formData.Cep);
    if (cepDigits.length !== 8 || cepDigits === lastCepLookup) return;

    let isMounted = true;
    setLastCepLookup(cepDigits);

    fetchCepAddress(baseUrl, cepDigits).then((address) => {
      if (!isMounted || !address) return;
      setFormData((prev) => ({
        ...prev,
        Rua: address.rua || prev.Rua,
        Bairro: address.bairro || prev.Bairro,
        Cidade: address.cidade || prev.Cidade,
        Estado: address.estado || prev.Estado,
        Complemento: address.complemento || prev.Complemento,
        Pais: address.pais || prev.Pais,
      }));
    });

    return () => {
      isMounted = false;
    };
  }, [baseUrl, formData.Cep, lastCepLookup]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const endpoint = isCnpj ? "/api/oficinas" : "/api/clientes";
    const documentDigits = onlyDigits(formData.Documento);
    const cepDigits = onlyDigits(formData.Cep);
    const payload = isCnpj
      ? {
          Nome: formData.Nome,
          CNPJ: documentDigits,
          Email: formData.Email,
          Numero: formData.Numero,
          Rua: formData.Rua,
          Cidade: formData.Cidade,
          Cep: Number(cepDigits || 0),
          Bairro: formData.Bairro,
          Estado: formData.Estado,
          Pais: formData.Pais,
          Complemento: formData.Complemento,
          Senha: formData.Senha,
        }
      : {
          Nome: formData.Nome,
          Email: formData.Email,
          senha: formData.senha,
          Cpf_Cnpj: documentDigits,
          Obs: formData.Obs,
          razao: formData.razao,
          DataNasc: formData.DataNasc,
          Numero: formData.Numero,
          Rua: formData.Rua,
          Cidade: formData.Cidade,
          Cep: cepDigits,
          Bairro: formData.Bairro,
          Estado: formData.Estado,
          Pais: formData.Pais,
          Complemento: formData.Complemento,
          Sexo: formData.Sexo,
        };

    const result = await fetchJson(baseUrl, endpoint, {
      method: "POST",
      body: payload,
    });

    if (result.ok) {
      router.replace(routes.login);
      return;
    }

    const message = extractErrorMessage(result.data) ?? "Falha ao cadastrar";
    setError(message);
    setIsLoading(false);
  };

  return (
    <PublicOnlyRoute>
      <div className="sigo-page">
      <NavBar />
      <main className="sigo-shell flex min-h-[calc(100vh-5rem)] items-center justify-center py-8 lg:py-12">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-2xl border border-[var(--sigo-border)] bg-white shadow-[var(--sigo-shadow-lg)] lg:grid-cols-[0.95fr_1.35fr] lg:divide-x lg:divide-[var(--sigo-border)]">
          <section className="flex flex-col justify-between bg-[linear-gradient(to_bottom_right,rgba(8,47,99,0.96),rgba(7,95,189,0.84)),url('https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80')] bg-cover bg-center p-8 text-white lg:p-10">
            <div>
              <div className="mb-7 flex h-24 w-24 items-center justify-center lg:h-32 lg:w-32">
                <img
                  src="/sigo-logo.png"
                  alt="Logo SIGO"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-blue-100">
                Novo cadastro
              </p>
              <h1 className="mt-3 text-3xl font-black leading-tight text-white lg:text-4xl">
                Entre para o SIGO
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-blue-50 lg:text-base lg:leading-7">
                Informe os dados principais para criar seu cadastro e acessar o sistema de gestão de oficinas mais completo do mercado. Clientes e oficinas, todos em um só lugar.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            </div>
          </section>

          <section className="flex max-h-none flex-col bg-white lg:max-h-[calc(100vh-7rem)]">
            <div className="border-b border-[var(--sigo-border)] px-6 py-6 sm:px-8">
              <div className="mb-5 flex items-center gap-3 lg:hidden">
                <span className="flex h-16 w-16 items-center justify-center">
                  <img
                    src="/sigo-logo.png"
                    alt="Logo SIGO"
                    className="h-full w-full object-contain"
                  />
                </span>
                <p className="text-sm font-semibold text-[var(--sigo-muted)]">
                  Sistema de gestao de oficinas
                </p>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="mt-2 text-3xl font-black text-[var(--sigo-text)]">
                    Cadastro
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[var(--sigo-muted)]">
                    Preencha os dados princípais
                  </p>
                </div>
              </div>
            </div>

            <form
              className="sigo-scrollbar grid gap-5 overflow-y-auto p-6 sm:p-8"
              onSubmit={handleSubmit}
            >
              <div className="grid gap-4 md:grid-cols-2">
                <TextInput
                  label="Nome"
                  value={formData.Nome}
                  onChange={(value) => updateField("Nome", value)}
                />
                <TextInput
                  label="Email"
                  value={formData.Email}
                  onChange={(value) => updateField("Email", value)}
                  type="email"
                />
                <TextInput
                  label={isCnpj ? "CNPJ" : "CPF"}
                  value={formData.Documento}
                  onChange={(value) => updateField("Documento", value)}
                  placeholder={isCnpj ? "00.000.000/0000-00" : "000.000.000-00"}
                />
                {isCnpj ? (
                  <TextInput
                    label="Senha"
                    value={formData.Senha}
                    onChange={(value) => updateField("Senha", value)}
                    type="password"
                  />
                ) : (
                  <TextInput
                    label="Senha"
                    value={formData.senha}
                    onChange={(value) => updateField("senha", value)}
                    type="password"
                  />
                )}
              </div>

              {!isCnpj ? (
                <div className="grid gap-4 md:grid-cols-3">
                  <TextInput
                    label="Observação"
                    value={formData.Obs}
                    onChange={(value) => updateField("Obs", value)}
                  />
                  <TextInput
                    label="Razão social"
                    value={formData.razao}
                    onChange={(value) => updateField("razao", value)}
                  />
                  <TextInput
                    label="Data de nascimento"
                    value={formData.DataNasc}
                    onChange={(value) => updateField("DataNasc", value)}
                    type="date"
                  />
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-3">
                <NumberField
                  label="Número"
                  value={formData.Numero}
                  onChange={(value) => updateNumberField("Numero", value)}
                />
                <TextInput
                  label="Rua"
                  value={formData.Rua}
                  onChange={(value) => updateField("Rua", value)}
                  className="md:col-span-2"
                />
                <TextInput
                  label="Cidade"
                  value={formData.Cidade}
                  onChange={(value) => updateField("Cidade", value)}
                />
                <TextInput
                  label="CEP"
                  value={formData.Cep}
                  onChange={(value) => updateField("Cep", value)}
                  placeholder="00000-000"
                />
                <TextInput
                  label="Bairro"
                  value={formData.Bairro}
                  onChange={(value) => updateField("Bairro", value)}
                />
                <SelectField
                  label="Estado"
                  value={formData.Estado}
                  options={stateOptions}
                  onChange={(value) => updateField("Estado", value)}
                />
                <TextInput
                  label="Pais"
                  value={formData.Pais}
                  onChange={(value) => updateField("Pais", value)}
                />
                <TextInput
                  label="Complemento"
                  value={formData.Complemento}
                  onChange={(value) => updateField("Complemento", value)}
                />
              </div>

              {!isCnpj ? (
                <div className="grid gap-4 md:grid-cols-3">
                  <SelectField
                    label="Sexo"
                    value={formData.Sexo}
                    options={enumOptionsByKey.sexo}
                    onChange={(value) => updateNumberField("Sexo", value)}
                  />
                </div>
              ) : null}

              {error ? (
                <div className="sigo-error px-4 py-3 text-sm font-semibold">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 border-t border-[var(--sigo-border)] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  className="text-sm font-bold text-[var(--sigo-muted)] hover:text-[var(--sigo-blue)]"
                  href={routes.login}
                >
                  Voltar para login
                </Link>
                <button
                  type="submit"
                  className="sigo-button sigo-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Salvando..." : "Criar conta"}
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      </div>
    </PublicOnlyRoute>
  );
}
