import type { Meta, StoryObj } from "@storybook/react";

// ─────────────────────────────────────────────
// Tier 1 — Primitive 토큰 (Supernova 자동생성, base/color.css)
// ─────────────────────────────────────────────

const primitiveGroups = [
  {
    title: "Gray",
    tokens: [
      { label: "gray-25", var: "--color-colors-gray-25", hex: "#f9f9f9" },
      { label: "gray-50", var: "--color-colors-gray-50", hex: "#f5f5f5" },
      { label: "gray-100", var: "--color-colors-gray-100", hex: "#eeeeee" },
      { label: "gray-200", var: "--color-colors-gray-200", hex: "#e1e1e1" },
      { label: "gray-300", var: "--color-colors-gray-300", hex: "#d3d3d3" },
      { label: "gray-400", var: "--color-colors-gray-400", hex: "#bfbfbf" },
      { label: "gray-500", var: "--color-colors-gray-500", hex: "#888888" },
      { label: "gray-600", var: "--color-colors-gray-600", hex: "#6e6e6e" },
      { label: "gray-700", var: "--color-colors-gray-700", hex: "#555555" },
      { label: "gray-800", var: "--color-colors-gray-800", hex: "#333333" },
      { label: "gray-900", var: "--color-colors-gray-900", hex: "#222222" },
      { label: "gray-950", var: "--color-colors-gray-950", hex: "#111111" },
    ],
  },
  {
    title: "Brand",
    tokens: [
      { label: "brand-25", var: "--color-colors-brand-25", hex: "#f6fef9" },
      { label: "brand-50", var: "--color-colors-brand-50", hex: "#e7faec" },
      { label: "brand-100", var: "--color-colors-brand-100", hex: "#c9fcd6" },
      { label: "brand-200", var: "--color-colors-brand-200", hex: "#95f9b8" },
      { label: "brand-300", var: "--color-colors-brand-300", hex: "#5fee9f" },
      { label: "brand-400", var: "--color-colors-brand-400", hex: "#37dd92" },
      { label: "brand-500", var: "--color-colors-brand-500", hex: "#00c781" },
      { label: "brand-600", var: "--color-colors-brand-600", hex: "#00ab7f" },
      { label: "brand-700", var: "--color-colors-brand-700", hex: "#008f79" },
      { label: "brand-800", var: "--color-colors-brand-800", hex: "#00736d" },
      { label: "brand-900", var: "--color-colors-brand-900", hex: "#005b5f" },
      { label: "brand-950", var: "--color-colors-brand-950", hex: "#084647" },
    ],
  },
  {
    title: "Red",
    tokens: [
      { label: "red-25", var: "--color-colors-red-25", hex: "#fffbfa" },
      { label: "red-50", var: "--color-colors-red-50", hex: "#fdf0e9" },
      { label: "red-100", var: "--color-colors-red-100", hex: "#ffe7db" },
      { label: "red-200", var: "--color-colors-red-200", hex: "#ffcab8" },
      { label: "red-300", var: "--color-colors-red-300", hex: "#ffa795" },
      { label: "red-400", var: "--color-colors-red-400", hex: "#ff867a" },
      { label: "red-500", var: "--color-colors-red-500", hex: "#ff4f4f" },
      { label: "red-600", var: "--color-colors-red-600", hex: "#db3947" },
      { label: "red-700", var: "--color-colors-red-700", hex: "#b72740" },
      { label: "red-800", var: "--color-colors-red-800", hex: "#931939" },
      { label: "red-900", var: "--color-colors-red-900", hex: "#7a0f34" },
      { label: "red-950", var: "--color-colors-red-950", hex: "#55160c" },
    ],
  },
  {
    title: "Yellow",
    tokens: [
      { label: "yellow-50", var: "--color-colors-yellow-50", hex: "#fffaeb" },
      { label: "yellow-100", var: "--color-colors-yellow-100", hex: "#fef0c7" },
      { label: "yellow-200", var: "--color-colors-yellow-200", hex: "#fedf89" },
      { label: "yellow-300", var: "--color-colors-yellow-300", hex: "#fec84b" },
      { label: "yellow-400", var: "--color-colors-yellow-400", hex: "#fdb022" },
      { label: "yellow-500", var: "--color-colors-yellow-500", hex: "#f79009" },
      { label: "yellow-600", var: "--color-colors-yellow-600", hex: "#dc6803" },
      { label: "yellow-700", var: "--color-colors-yellow-700", hex: "#b54708" },
      { label: "yellow-800", var: "--color-colors-yellow-800", hex: "#93370d" },
      { label: "yellow-900", var: "--color-colors-yellow-900", hex: "#7a2e0e" },
      { label: "yellow-950", var: "--color-colors-yellow-950", hex: "#4e1d09" },
    ],
  },
  {
    title: "Green",
    tokens: [
      { label: "green-50", var: "--color-colors-green-50", hex: "#e7faec" },
      { label: "green-100", var: "--color-colors-green-100", hex: "#c9fcd6" },
      { label: "green-200", var: "--color-colors-green-200", hex: "#95f9b8" },
      { label: "green-300", var: "--color-colors-green-300", hex: "#5fee9f" },
      { label: "green-400", var: "--color-colors-green-400", hex: "#37dd92" },
      { label: "green-500", var: "--color-colors-green-500", hex: "#00c781" },
      { label: "green-600", var: "--color-colors-green-600", hex: "#00ab7f" },
      { label: "green-700", var: "--color-colors-green-700", hex: "#008f79" },
      { label: "green-800", var: "--color-colors-green-800", hex: "#00736d" },
      { label: "green-900", var: "--color-colors-green-900", hex: "#005b5f" },
      { label: "green-950", var: "--color-colors-green-950", hex: "#084647" },
    ],
  },
  {
    title: "Blue",
    tokens: [
      { label: "blue-50", var: "--color-colors-blue-50", hex: "#e3efff" },
      { label: "blue-100", var: "--color-colors-blue-100", hex: "#cbe2ff" },
      { label: "blue-200", var: "--color-colors-blue-200", hex: "#8fc0ff" },
      { label: "blue-300", var: "--color-colors-blue-300", hex: "#549fff" },
      { label: "blue-400", var: "--color-colors-blue-400", hex: "#2d89ff" },
      { label: "blue-500", var: "--color-colors-blue-500", hex: "#0070ff" },
      { label: "blue-600", var: "--color-colors-blue-600", hex: "#0262dd" },
      { label: "blue-700", var: "--color-colors-blue-700", hex: "#074cba" },
      { label: "blue-800", var: "--color-colors-blue-800", hex: "#013d9c" },
      { label: "blue-900", var: "--color-colors-blue-900", hex: "#003083" },
      { label: "blue-950", var: "--color-colors-blue-950", hex: "#002266" },
    ],
  },
  {
    title: "Purple",
    tokens: [
      { label: "purple-50", var: "--color-colors-purple-50", hex: "#f0e7f9" },
      { label: "purple-100", var: "--color-colors-purple-100", hex: "#ead5fd" },
      { label: "purple-200", var: "--color-colors-purple-200", hex: "#d4acfc" },
      { label: "purple-300", var: "--color-colors-purple-300", hex: "#b782f8" },
      { label: "purple-400", var: "--color-colors-purple-400", hex: "#9d61f2" },
      { label: "purple-500", var: "--color-colors-purple-500", hex: "#7630ea" },
      { label: "purple-600", var: "--color-colors-purple-600", hex: "#5b23c9" },
      { label: "purple-700", var: "--color-colors-purple-700", hex: "#4318a8" },
      { label: "purple-800", var: "--color-colors-purple-800", hex: "#2e0f87" },
      { label: "purple-900", var: "--color-colors-purple-900", hex: "#200970" },
      { label: "purple-950", var: "--color-colors-purple-950", hex: "#2c1c5f" },
    ],
  },
  {
    title: "Base",
    tokens: [
      { label: "white", var: "--color-colors-base-white", hex: "#ffffff" },
      { label: "black", var: "--color-colors-base-black", hex: "#000000" },
    ],
  },
];

// ─────────────────────────────────────────────
// Tier 2 — Semantic 토큰 (tokens.css)
// primitive: 참조하는 Primitive 토큰 이름
// ─────────────────────────────────────────────

const semanticGroups = [
  {
    title: "Brand",
    tokens: [
      { label: "--color-primary", var: "--color-primary", primitive: "brand-500" },
      { label: "--color-primary-hover", var: "--color-primary-hover", primitive: "brand-600" },
      { label: "--color-primary-foreground", var: "--color-primary-foreground", primitive: "base-white" },
      { label: "--color-secondary", var: "--color-secondary", primitive: "gray-100" },
      { label: "--color-secondary-foreground", var: "--color-secondary-foreground", primitive: "gray-700" },
      { label: "--color-secondary-hover", var: "--color-secondary-hover", primitive: "gray-200" },
    ],
  },
  {
    title: "Status",
    tokens: [
      { label: "--color-destructive", var: "--color-destructive", primitive: "red-600" },
      { label: "--color-destructive-foreground", var: "--color-destructive-foreground", primitive: "base-white" },
      { label: "--color-success", var: "--color-success", primitive: "green-600" },
      { label: "--color-success-foreground", var: "--color-success-foreground", primitive: "base-white" },
      { label: "--color-warning", var: "--color-warning", primitive: "yellow-600" },
      { label: "--color-warning-foreground", var: "--color-warning-foreground", primitive: "base-white" },
    ],
  },
  {
    title: "Text",
    tokens: [
      { label: "--color-text-primary", var: "--color-text-primary", primitive: "gray-900" },
      { label: "--color-text-secondary", var: "--color-text-secondary", primitive: "gray-700" },
      { label: "--color-text-secondary-hover", var: "--color-text-secondary-hover", primitive: "gray-800" },
      { label: "--color-text-tertiary", var: "--color-text-tertiary", primitive: "gray-600" },
      { label: "--color-text-tertiary-hover", var: "--color-text-tertiary-hover", primitive: "gray-700" },
      { label: "--color-text-quaternary", var: "--color-text-quaternary", primitive: "gray-500" },
      { label: "--color-text-disabled", var: "--color-text-disabled", primitive: "gray-500" },
      { label: "--color-text-placeholder", var: "--color-text-placeholder", primitive: "gray-400" },
      { label: "--color-text-white", var: "--color-text-white", primitive: "base-white" },
      { label: "--color-text-link", var: "--color-text-link", primitive: "blue-500" },
      { label: "--color-text-link-hover", var: "--color-text-link-hover", primitive: "blue-600" },
      { label: "--color-text-brand-primary", var: "--color-text-brand-primary", primitive: "brand-900" },
      { label: "--color-text-brand-secondary", var: "--color-text-brand-secondary", primitive: "brand-700" },
      { label: "--color-text-brand-secondary-hover", var: "--color-text-brand-secondary-hover", primitive: "brand-800" },
      { label: "--color-text-brand-tertiary", var: "--color-text-brand-tertiary", primitive: "brand-600" },
      { label: "--color-text-error-primary", var: "--color-text-error-primary", primitive: "red-600" },
      { label: "--color-text-error-primary-hover", var: "--color-text-error-primary-hover", primitive: "red-700" },
      { label: "--color-text-success-primary", var: "--color-text-success-primary", primitive: "green-600" },
      { label: "--color-text-warning-primary", var: "--color-text-warning-primary", primitive: "yellow-600" },
    ],
  },
  {
    title: "Foreground (Icon)",
    tokens: [
      { label: "--color-fg-primary", var: "--color-fg-primary", primitive: "gray-900" },
      { label: "--color-fg-secondary", var: "--color-fg-secondary", primitive: "gray-700" },
      { label: "--color-fg-secondary-hover", var: "--color-fg-secondary-hover", primitive: "gray-800" },
      { label: "--color-fg-tertiary", var: "--color-fg-tertiary", primitive: "gray-600" },
      { label: "--color-fg-tertiary-hover", var: "--color-fg-tertiary-hover", primitive: "gray-700" },
      { label: "--color-fg-quaternary", var: "--color-fg-quaternary", primitive: "gray-400" },
      { label: "--color-fg-quaternary-hover", var: "--color-fg-quaternary-hover", primitive: "gray-500" },
      { label: "--color-fg-white", var: "--color-fg-white", primitive: "base-white" },
      { label: "--color-fg-disabled", var: "--color-fg-disabled", primitive: "gray-400" },
      { label: "--color-fg-disabled-subtle", var: "--color-fg-disabled-subtle", primitive: "gray-300" },
      { label: "--color-fg-brand-primary", var: "--color-fg-brand-primary", primitive: "brand-500" },
      { label: "--color-fg-brand-secondary", var: "--color-fg-brand-secondary", primitive: "brand-400" },
      { label: "--color-fg-brand-secondary-hover", var: "--color-fg-brand-secondary-hover", primitive: "brand-600" },
      { label: "--color-fg-error-primary", var: "--color-fg-error-primary", primitive: "red-600" },
      { label: "--color-fg-error-secondary", var: "--color-fg-error-secondary", primitive: "red-500" },
      { label: "--color-fg-warning-primary", var: "--color-fg-warning-primary", primitive: "yellow-600" },
      { label: "--color-fg-warning-secondary", var: "--color-fg-warning-secondary", primitive: "yellow-500" },
      { label: "--color-fg-success-primary", var: "--color-fg-success-primary", primitive: "green-600" },
      { label: "--color-fg-success-secondary", var: "--color-fg-success-secondary", primitive: "green-500" },
      { label: "--color-fg-link", var: "--color-fg-link", primitive: "blue-500" },
      { label: "--color-fg-link-hover", var: "--color-fg-link-hover", primitive: "blue-600" },
      { label: "--color-fg-required", var: "--color-fg-required", primitive: "red-500" },
    ],
  },
  {
    title: "Background",
    tokens: [
      { label: "--color-bg-primary", var: "--color-bg-primary", primitive: "base-white" },
      { label: "--color-bg-primary-hover", var: "--color-bg-primary-hover", primitive: "gray-50" },
      { label: "--color-bg-primary-solid", var: "--color-bg-primary-solid", primitive: "gray-950" },
      { label: "--color-bg-secondary", var: "--color-bg-secondary", primitive: "gray-50" },
      { label: "--color-bg-secondary-hover", var: "--color-bg-secondary-hover", primitive: "gray-100" },
      { label: "--color-bg-secondary-subtle", var: "--color-bg-secondary-subtle", primitive: "gray-25" },
      { label: "--color-bg-secondary-solid", var: "--color-bg-secondary-solid", primitive: "gray-600" },
      { label: "--color-bg-tertiary", var: "--color-bg-tertiary", primitive: "gray-100" },
      { label: "--color-bg-quaternary", var: "--color-bg-quaternary", primitive: "gray-200" },
      { label: "--color-bg-active", var: "--color-bg-active", primitive: "gray-50" },
      { label: "--color-bg-disabled", var: "--color-bg-disabled", primitive: "gray-100" },
      { label: "--color-bg-disabled-subtle", var: "--color-bg-disabled-subtle", primitive: "gray-50" },
      { label: "--color-bg-overlay", var: "--color-bg-overlay", primitive: "base-black" },
      { label: "--color-bg-brand", var: "--color-bg-brand", primitive: "brand-500" },
      { label: "--color-bg-brand-hover", var: "--color-bg-brand-hover", primitive: "brand-600" },
      { label: "--color-bg-brand-primary", var: "--color-bg-brand-primary", primitive: "brand-50" },
      { label: "--color-bg-brand-secondary", var: "--color-bg-brand-secondary", primitive: "brand-100" },
      { label: "--color-bg-brand-section", var: "--color-bg-brand-section", primitive: "brand-700" },
      { label: "--color-bg-brand-section-subtle", var: "--color-bg-brand-section-subtle", primitive: "brand-600" },
      { label: "--color-bg-error", var: "--color-bg-error", primitive: "red-50" },
      { label: "--color-bg-error-solid", var: "--color-bg-error-solid", primitive: "red-600" },
      { label: "--color-bg-error-solid-hover", var: "--color-bg-error-solid-hover", primitive: "red-700" },
      { label: "--color-bg-warning", var: "--color-bg-warning", primitive: "yellow-50" },
      { label: "--color-bg-warning-solid", var: "--color-bg-warning-solid", primitive: "yellow-600" },
      { label: "--color-bg-success", var: "--color-bg-success", primitive: "green-50" },
      { label: "--color-bg-success-solid", var: "--color-bg-success-solid", primitive: "green-600" },
    ],
  },
  {
    title: "Border",
    tokens: [
      { label: "--color-border", var: "--color-border", primitive: "gray-300" },
      { label: "--color-border-secondary", var: "--color-border-secondary", primitive: "gray-200" },
      { label: "--color-border-tertiary", var: "--color-border-tertiary", primitive: "gray-100" },
      { label: "--color-border-disabled", var: "--color-border-disabled", primitive: "gray-300" },
      { label: "--color-border-disabled-subtle", var: "--color-border-disabled-subtle", primitive: "gray-200" },
      { label: "--color-border-brand", var: "--color-border-brand", primitive: "brand-500" },
      { label: "--color-border-brand-alt", var: "--color-border-brand-alt", primitive: "brand-600" },
      { label: "--color-border-error", var: "--color-border-error", primitive: "red-500" },
      { label: "--color-border-error-subtle", var: "--color-border-error-subtle", primitive: "red-300" },
      { label: "--color-border-secondary-alt", var: "--color-border-secondary-alt", primitive: "black/8%" },
    ],
  },
  {
    title: "Focus Ring",
    tokens: [
      { label: "--color-ring", var: "--color-ring", primitive: "brand-500" },
      { label: "--color-ring-error", var: "--color-ring-error", primitive: "red-500" },
    ],
  },
  {
    title: "Muted",
    tokens: [
      { label: "--color-muted", var: "--color-muted", primitive: "gray-100" },
      { label: "--color-muted-foreground", var: "--color-muted-foreground", primitive: "gray-500" },
    ],
  },
  {
    title: "Shadow Colors",
    tokens: [
      { label: "--shadow-color-xs", var: "--shadow-color-xs", primitive: "black/5%" },
      { label: "--shadow-color-sm-01", var: "--shadow-color-sm-01", primitive: "black/10%" },
      { label: "--shadow-color-md-01", var: "--shadow-color-md-01", primitive: "black/10%" },
      { label: "--shadow-color-lg-01", var: "--shadow-color-lg-01", primitive: "black/8%" },
      { label: "--shadow-color-xl-01", var: "--shadow-color-xl-01", primitive: "black/8%" },
      { label: "--shadow-color-2xl-01", var: "--shadow-color-2xl-01", primitive: "black/18%" },
      { label: "--shadow-color-3xl-01", var: "--shadow-color-3xl-01", primitive: "black/14%" },
      { label: "--shadow-color-skeumorphic-inner", var: "--shadow-color-skeumorphic-inner", primitive: "black/5%" },
    ],
  },
];

// ─────────────────────────────────────────────
// 공통 UI 컴포넌트
// ─────────────────────────────────────────────

const sectionTitle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#999",
  marginBottom: "12px",
  paddingBottom: "8px",
  borderBottom: "1px solid #eee",
};

const badge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 600,
  padding: "2px 6px",
  borderRadius: "4px",
  letterSpacing: "0.02em",
};

// ─────────────────────────────────────────────
// Primitive 팔레트 뷰
// ─────────────────────────────────────────────

function PrimitiveSwatch({ label, cssVar, hex }: { label: string; cssVar: string; hex: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px", width: "72px" }}>
      <div
        style={{
          width: "72px",
          height: "48px",
          borderRadius: "6px",
          background: `var(${cssVar}, ${hex})`,
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      />
      <div style={{ fontSize: "10px", color: "#666", lineBreak: "anywhere" }}>{label}</div>
      <div style={{ fontSize: "10px", color: "#aaa", fontFamily: "monospace" }}>{hex}</div>
    </div>
  );
}

function PrimitiveGroup({ title, tokens }: { title: string; tokens: { label: string; var: string; hex: string }[] }) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <h3 style={{ ...sectionTitle, marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>{title}</h3>
        <span style={{ ...badge, background: "#f0f0f0", color: "#888" }}>{tokens.length} tokens</span>
      </div>
      <div style={{ borderBottom: "1px solid #eee", marginBottom: "16px" }} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
        {tokens.map((t) => (
          <PrimitiveSwatch key={t.label} label={t.label} cssVar={t.var} hex={t.hex} />
        ))}
      </div>
    </section>
  );
}

/** Tier 1 — Primitive color palette (Supernova 자동생성, base/color.css) */
function PrimitiveColorsPage() {
  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif", maxWidth: "1040px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Colors</h1>
          <span style={{ ...badge, background: "#e8f5e9", color: "#2e7d32" }}>Tier 1 — Primitive</span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          Supernova에서 자동생성된 원시 색상 팔레트 (<code>base/color.css</code>). 직접 사용하지 말고 Semantic 토큰을 통해 참조합니다.
        </p>
      </div>
      {primitiveGroups.map((g) => (
        <PrimitiveGroup key={g.title} title={g.title} tokens={g.tokens} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Semantic 토큰 뷰
// ─────────────────────────────────────────────

function SemanticSwatch({
  label,
  cssVar,
  primitive,
}: {
  label: string;
  cssVar: string;
  primitive: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "10px 12px",
        borderRadius: "8px",
        border: "1px solid #f0f0f0",
        background: "#fafafa",
      }}
    >
      {/* 색상 스와치 */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "6px",
          background: `var(${cssVar})`,
          border: "1px solid rgba(0,0,0,0.1)",
          flexShrink: 0,
        }}
      />
      {/* 토큰 정보 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "3px", minWidth: 0 }}>
        <code style={{ fontSize: "12px", color: "#333", fontWeight: 600 }}>{label}</code>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "10px", color: "#aaa" }}>→</span>
          <code style={{ ...badge, background: "#f5f5f5", color: "#777", fontSize: "10px" }}>
            {primitive}
          </code>
        </div>
      </div>
    </div>
  );
}

function SemanticGroup({
  title,
  tokens,
}: {
  title: string;
  tokens: { label: string; var: string; primitive: string }[];
}) {
  return (
    <section style={{ marginBottom: "36px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <h3 style={{ ...sectionTitle, marginBottom: 0, borderBottom: "none", paddingBottom: 0 }}>{title}</h3>
        <span style={{ ...badge, background: "#f0f0f0", color: "#888" }}>{tokens.length} tokens</span>
      </div>
      <div style={{ borderBottom: "1px solid #eee", marginBottom: "16px" }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "8px",
        }}
      >
        {tokens.map((t) => (
          <SemanticSwatch key={t.label} label={t.label} cssVar={t.var} primitive={t.primitive} />
        ))}
      </div>
    </section>
  );
}

/** Tier 2 — Semantic color tokens (tokens.css). Primitive 참조 정보를 함께 표시합니다. */
function SemanticColorsPage() {
  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif", maxWidth: "960px" }}>
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Colors</h1>
          <span style={{ ...badge, background: "#e3f2fd", color: "#1565c0" }}>Tier 2 — Semantic</span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          의미 기반 색상 토큰 (<code>tokens.css</code>). 각 토큰이 참조하는 Primitive 토큰을 함께 표시합니다.
        </p>
      </div>
      {semanticGroups.map((g) => (
        <SemanticGroup key={g.title} title={g.title} tokens={g.tokens} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Storybook Meta & Stories
// ─────────────────────────────────────────────

const meta = {
  title: "Foundation/Colors",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/** Tier 1 — Supernova 자동생성 원시 색상 팔레트 */
export const Primitive: Story = {
  render: () => <PrimitiveColorsPage />,
};

/** Tier 2 — 의미 기반 Semantic 토큰. 참조하는 Primitive 토큰 정보 포함 */
export const Semantic: Story = {
  render: () => <SemanticColorsPage />,
};
