import type {
  NavigationBreadcrumb,
  NavigationItem,
  ResolvedNavigationMeta,
} from "./navigation.types";

export const NAVIGATION_CATALOG: NavigationItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    keywords: ["dashboard", "inicio", "painel"],
    features: ["acessar painel", "validar endpoints"],
    category: "Principal",
    icon: "home",
    priority: 100,
  },
  {
    key: "login",
    label: "Login",
    path: "/login",
    keywords: ["login", "acesso", "autenticacao"],
    features: ["entrar no sistema"],
    category: "Conta",
    icon: "person",
    priority: 90,
  },
];

const normalizePath = (path: string): string => {
  const trimmed = path.trim();
  const withoutTrailingSlash = trimmed.replace(/\/+$/, "");
  return withoutTrailingSlash || "/";
};

const formatSegmentLabel = (segment: string): string => {
  if (!segment) return "";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
};

const findItemByPath = (path: string): NavigationItem | undefined => {
  const normalizedPath = normalizePath(path);
  return NAVIGATION_CATALOG.find(
    (item) => normalizePath(item.path) === normalizedPath
  );
};

export const resolveNavigationMeta = (path: string): ResolvedNavigationMeta => {
  const normalizedPath = normalizePath(path);
  const item = findItemByPath(normalizedPath);

  if (item) {
    return {
      title: item.label,
      breadcrumbs: [
        {
          key: item.key,
          label: item.label,
          path: item.path,
        },
      ],
    };
  }

  const segments = normalizedPath.split("/").filter(Boolean);
  const breadcrumbs = segments.map((segment, index): NavigationBreadcrumb => {
    const segmentPath = `/${segments.slice(0, index + 1).join("/")}`;
    return {
      key: segment,
      label: formatSegmentLabel(segment),
      path: segmentPath,
    };
  });

  return {
    title:
      breadcrumbs.length > 0
        ? breadcrumbs[breadcrumbs.length - 1].label
        : "SIGO",
    breadcrumbs,
  };
};
