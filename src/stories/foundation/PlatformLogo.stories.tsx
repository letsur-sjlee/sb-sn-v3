/**
 * Foundation / Platform Logo
 *
 * 플랫폼 로고 에셋을 시각화하는 스토리입니다.
 * Figma 디자인 시스템의 Logomark 컴포넌트(32×32px 기본)를 기반으로 합니다.
 *
 * ## 스토리 구성
 * - Logomark — 로고마크 단독 표시 (크기별 비교 포함, 심볼 색상 변경 가능)
 */
import type { Meta, StoryObj } from "@storybook/react";

// ─────────────────────────────────────────────
// 인라인 SVG 컴포넌트 (fill="currentColor" 적용)
// CSS color로 심볼 색상 변경 가능
// ─────────────────────────────────────────────

function Logomark({ size = 32, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color, display: "block" }}
    >
      <path d="M13.9 2H18.1V7.6H13.9V2Z" fill="currentColor" />
      <path d="M30 13.9H24.4V18.1H30V13.9Z" fill="currentColor" />
      <path d="M18.1 24.4H13.9V30H18.1V24.4Z" fill="currentColor" />
      <path d="M7.6 13.9H2V18.1H7.6V13.9Z" fill="currentColor" />
      <path d="M25.2975 9.67021L25.3118 9.68458V9.65591L25.2975 9.67021Z" fill="currentColor" />
      <path
        d="M22.3298 6.68817L25.2975 9.67021L20.6523 14.3154C19.7348 15.233 19.7348 16.7383 20.6523 17.6559L25.3118 22.3154L22.3298 25.3118L17.6703 20.6523C16.7527 19.7348 15.2473 19.7348 14.3298 20.6523L9.67026 25.3118L6.68818 22.3154L11.3477 17.6702C12.2652 16.7527 12.2652 15.2473 11.3477 14.3297L6.68818 9.67025L9.68459 6.68817L14.3298 11.3477C15.2473 12.2652 16.7527 12.2652 17.6703 11.3477L22.3298 6.68817Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─────────────────────────────────────────────
// 크기 단계 정의 (Figma 스펙: 기본 32×32px)
// ─────────────────────────────────────────────

const logoSizes = [
  { label: "16", size: 16 },
  { label: "24", size: 24 },
  { label: "32", size: 32 },
  { label: "48", size: 48 },
  { label: "64", size: 64 },
] as const;

// ─────────────────────────────────────────────
// 공통 인라인 스타일 상수
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

// ─────────────────────────────────────────────
// LogomarkPage 컴포넌트
// ─────────────────────────────────────────────

/**
 * LogomarkPage
 * 로고마크를 밝은/어두운 배경에서 크기별로 시각화합니다.
 * symbolColor prop으로 Controls에서 심볼 색상을 변경할 수 있습니다.
 */
function LogomarkPage({ symbolColor = "#ffffff" }: { symbolColor?: string }) {
  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "1200px",
      }}
    >
      {/* 페이지 헤더 */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0, marginBottom: "6px" }}>
          Platform Logo
        </h1>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          브랜드 아이덴티티를 나타내는 로고마크입니다. 기본 크기는 32×32px입니다.
        </p>
      </div>

      {/* Light 배경 섹션 */}
      <div style={{ marginBottom: "48px" }}>
        <h2 style={sectionTitle}>Light Background</h2>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "32px",
            flexWrap: "wrap",
            padding: "40px",
            backgroundColor: "#ffffff",
            border: "1px solid #eee",
            borderRadius: "12px",
          }}
        >
          {logoSizes.map(({ label, size }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            >
              <Logomark size={size} color="#111111" />
              <span style={{ fontSize: "11px", color: "#9ca3af" }}>{label}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* Dark 배경 섹션 — symbolColor로 심볼 색상 변경 가능 */}
      <div style={{ marginBottom: "48px" }}>
        <h2 style={sectionTitle}>Dark Background</h2>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "32px",
            flexWrap: "wrap",
            padding: "40px",
            backgroundColor: "#111111",
            borderRadius: "12px",
          }}
        >
          {logoSizes.map(({ label, size }) => (
            <div
              key={label}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}
            >
              <Logomark size={size} color={symbolColor} />
              <span style={{ fontSize: "11px", color: "#6b7280" }}>{label}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* 에셋 정보 */}
      <div>
        <h2 style={sectionTitle}>Asset Info</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {[
            { label: "파일명", value: "Logomark.svg" },
            { label: "포맷", value: "SVG (벡터)" },
            { label: "기본 크기", value: "32 × 32px" },
            { label: "경로", value: "logo/Logomark.svg" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "12px 16px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
                border: "1px solid #eee",
              }}
            >
              <div style={{ fontSize: "11px", color: "#9ca3af", marginBottom: "4px" }}>
                {label}
              </div>
              <code style={{ fontSize: "13px", color: "#374151", fontFamily: "monospace" }}>
                {value}
              </code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Storybook Meta & Stories
// ─────────────────────────────────────────────

const meta = {
  title: "Foundation/Platform Logo",
  parameters: { layout: "fullscreen" },
  argTypes: {
    symbolColor: {
      control: "color",
      description: "Dark Background 섹션의 심볼 색상",
      table: { defaultValue: { summary: "#ffffff" } },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/**
 * Logomark — 플랫폼 로고마크를 밝은/어두운 배경에서 크기별로 비교합니다.
 * Controls 패널의 symbolColor로 Dark Background 섹션의 심볼 색상을 변경할 수 있습니다.
 */
export const Logomark_: Story = {
  args: { symbolColor: "#ffffff" },
  render: ({ symbolColor }: { symbolColor?: string }) => (
    <LogomarkPage symbolColor={symbolColor} />
  ),
};
