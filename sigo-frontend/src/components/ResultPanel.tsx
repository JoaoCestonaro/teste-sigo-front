import type { ApiResult } from "@/lib/api";

export function ResultPanel({
  title,
  result,
}: {
  title: string;
  result: ApiResult | null;
}) {
  if (!result) {
    return (
      <div className="rounded-md border border-dashed border-slate-200 p-3 text-xs text-slate-500">
        {title}: no data
      </div>
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700">
      <p className="text-xs font-semibold text-slate-700">
        {title} (status {result.status})
      </p>
      <pre className="mt-2 max-h-60 overflow-auto whitespace-pre-wrap">
        {JSON.stringify(result.data, null, 2)}
      </pre>
    </div>
  );
}
