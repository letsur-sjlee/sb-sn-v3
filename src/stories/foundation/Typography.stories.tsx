import type { Meta, StoryObj } from "@storybook/react";

/**
 * 본문 텍스트 크기 스케일
 * tokens.css에 정의된 --font-size-* 및 --line-height-* 토큰을 참조합니다.
 */
const textSizes = [
  {
    label: "Text XS",
    token: "--font-size-xs",
    size: "var(--font-size-xs)",
    lineHeight: "var(--line-height-xs)",
    detail: "12px / 18px",
  },
  {
    label: "Text XS-SM",
    token: "--font-size-xs-sm",
    size: "var(--font-size-xs-sm)",
    lineHeight: "var(--line-height-xs-sm)",
    detail: "13px / 19px",
  },
  {
    label: "Text SM",
    token: "--font-size-sm",
    size: "var(--font-size-sm)",
    lineHeight: "var(--line-height-sm)",
    detail: "14px / 20px",
  },
  {
    label: "Text MD",
    token: "--font-size-md",
    size: "var(--font-size-md)",
    lineHeight: "var(--line-height-md)",
    detail: "16px / 24px",
  },
  {
    label: "Text LG",
    token: "--font-size-lg",
    size: "var(--font-size-lg)",
    lineHeight: "var(--line-height-lg)",
    detail: "18px / 28px",
  },
  {
    label: "Text XL",
    token: "--font-size-xl",
    size: "var(--font-size-xl)",
    lineHeight: "var(--line-height-xl)",
    detail: "20px / 30px",
  },
];

/**
 * 디스플레이(제목) 텍스트 크기 스케일
 * 히어로, 대형 제목 등에 사용하는 display 단계 토큰입니다.
 */
const displaySizes = [
  {
    label: "Display XS",
    token: "--font-size-display-xs",
    size: "var(--font-size-display-xs)",
    lineHeight: "var(--line-height-display-xs)",
    detail: "24px / 32px",
  },
  {
    label: "Display SM",
    token: "--font-size-display-sm",
    size: "var(--font-size-display-sm)",
    lineHeight: "var(--line-height-display-sm)",
    detail: "30px / 38px",
  },
  {
    label: "Display MD",
    token: "--font-size-display-md",
    size: "var(--font-size-display-md)",
    lineHeight: "var(--line-height-display-md)",
    detail: "36px / 44px",
  },
  {
    label: "Display LG",
    token: "--font-size-display-lg",
    size: "var(--font-size-display-lg)",
    lineHeight: "var(--line-height-display-lg)",
    detail: "48px / 60px",
  },
  {
    label: "Display XL",
    token: "--font-size-display-xl",
    size: "var(--font-size-display-xl)",
    lineHeight: "var(--line-height-display-xl)",
    detail: "60px / 72px",
  },
  {
    label: "Display 2XL",
    token: "--font-size-display-2xl",
    size: "var(--font-size-display-2xl)",
    lineHeight: "var(--line-height-display-2xl)",
    detail: "72px / 90px",
  },
];

/** 폰트 굵기(font-weight) 단계 목록 */
const fontWeights = [
  { name: "Regular", value: "400" },
  { name: "Medium", value: "500" },
  { name: "Semibold", value: "600" },
  { name: "Bold", value: "700" },
];

/**
 * Foundation / Typography
 *
 * Pretendard Variable 폰트를 기반으로 한 타입 스케일을 시각화합니다.
 * - Text XS ~ XL: 본문, 캡션, 라벨 등 본문 텍스트용
 * - Display XS ~ 2XL: 페이지 제목, 히어로 섹션용 대형 텍스트
 * - Font Weights: Regular(400) ~ Bold(700) 4단계
 */
function TypographyPage() {
  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "var(--font-family-base), system-ui, sans-serif",
        maxWidth: "960px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
        Typography
      </h1>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "40px" }}>
        Font family: <code>Pretendard Variable</code> —{" "}
        <code>--font-family-base</code>
      </p>

      {/* 본문 텍스트 스케일 */}
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "20px",
          paddingBottom: "8px",
          borderBottom: "1px solid #e1e1e1",
        }}
      >
        Text Sizes
      </h2>
      <div style={{ marginBottom: "48px" }}>
        {textSizes.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "24px",
              padding: "12px 0",
              borderBottom: "1px solid #f5f5f5",
            }}
          >
            <div style={{ width: "220px", flexShrink: 0 }}>
              <div style={{ fontSize: "12px", color: "#888" }}>{item.label}</div>
              <code style={{ fontSize: "11px", color: "#aaa" }}>{item.token}</code>
              <div style={{ fontSize: "11px", color: "#bbb" }}>{item.detail}</div>
            </div>
            <span style={{ fontSize: item.size, lineHeight: item.lineHeight }}>
              The quick brown fox jumps over the lazy dog
            </span>
          </div>
        ))}
      </div>

      {/* 디스플레이 텍스트 스케일 */}
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "20px",
          paddingBottom: "8px",
          borderBottom: "1px solid #e1e1e1",
        }}
      >
        Display Sizes
      </h2>
      <div style={{ marginBottom: "48px" }}>
        {displaySizes.map((item) => (
          <div
            key={item.label}
            style={{ padding: "16px 0", borderBottom: "1px solid #f5f5f5" }}
          >
            <div style={{ marginBottom: "6px" }}>
              <span style={{ fontSize: "12px", color: "#888" }}>
                {item.label}
              </span>
              <code
                style={{
                  fontSize: "11px",
                  color: "#aaa",
                  marginLeft: "8px",
                }}
              >
                {item.token}
              </code>
              <span
                style={{
                  fontSize: "11px",
                  color: "#bbb",
                  marginLeft: "8px",
                }}
              >
                {item.detail}
              </span>
            </div>
            <span
              style={{
                fontSize: item.size,
                lineHeight: item.lineHeight,
                fontWeight: 600,
                display: "block",
              }}
            >
              Hello, World
            </span>
          </div>
        ))}
      </div>

      {/* 폰트 굵기 */}
      <h2
        style={{
          fontSize: "18px",
          fontWeight: 600,
          marginBottom: "20px",
          paddingBottom: "8px",
          borderBottom: "1px solid #e1e1e1",
        }}
      >
        Font Weights
      </h2>
      <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
        {fontWeights.map((w) => (
          <div key={w.name} style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "48px",
                fontWeight: w.value,
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              Ag
            </div>
            <div style={{ fontSize: "13px", color: "#555" }}>{w.name}</div>
            <div style={{ fontSize: "12px", color: "#888" }}>{w.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Typography",
  component: TypographyPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TypographyPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Text XS ~ Display 2XL 타입 스케일과 Regular~Bold 폰트 굵기를 모두 표시합니다. */
export const Default: Story = {};
