import type { Meta, StoryObj } from "@storybook/react";

/**
 * 간격 토큰 전체 목록
 * tokens.css에 정의된 --spacing-* Semantic 토큰을 시각적 막대로 표현합니다.
 * none(0px)에서 11xl(160px)까지 18단계로 구성됩니다.
 */
const spacingTokens = [
  { name: "none", var: "--spacing-none", px: "0px" },
  { name: "xxs", var: "--spacing-xxs", px: "2px" },
  { name: "xs", var: "--spacing-xs", px: "4px" },
  { name: "sm", var: "--spacing-sm", px: "6px" },
  { name: "md", var: "--spacing-md", px: "8px" },
  { name: "md-lg", var: "--spacing-md-lg", px: "10px" },
  { name: "lg", var: "--spacing-lg", px: "12px" },
  { name: "xl", var: "--spacing-xl", px: "16px" },
  { name: "2xl", var: "--spacing-2xl", px: "20px" },
  { name: "3xl", var: "--spacing-3xl", px: "24px" },
  { name: "4xl", var: "--spacing-4xl", px: "32px" },
  { name: "5xl", var: "--spacing-5xl", px: "40px" },
  { name: "6xl", var: "--spacing-6xl", px: "48px" },
  { name: "7xl", var: "--spacing-7xl", px: "64px" },
  { name: "8xl", var: "--spacing-8xl", px: "80px" },
  { name: "9xl", var: "--spacing-9xl", px: "96px" },
  { name: "10xl", var: "--spacing-10xl", px: "128px" },
  { name: "11xl", var: "--spacing-11xl", px: "160px" },
];

/**
 * Foundation / Spacing
 *
 * UI 요소 사이의 여백을 관리하는 간격 토큰 스케일을 시각화합니다.
 * 각 토큰의 이름, 픽셀값, 그리고 실제 크기를 나타내는 색상 막대를 함께 표시합니다.
 *
 * 사용 예시:
 * - padding: p-md (8px), p-xl (16px)
 * - margin: m-3xl (24px)
 * - gap: gap-lg (12px)
 */
function SpacingPage() {
  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "960px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
        Spacing
      </h1>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "40px" }}>
        Spacing scale tokens — none (0px) to 11xl (160px)
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {spacingTokens.map((token) => (
          <div
            key={token.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid #f5f5f5",
            }}
          >
            {/* 토큰 이름 */}
            <code
              style={{
                width: "140px",
                fontSize: "12px",
                color: "#555",
                flexShrink: 0,
              }}
            >
              --spacing-{token.name}
            </code>
            {/* 픽셀값 */}
            <span
              style={{
                width: "48px",
                fontSize: "12px",
                color: "#888",
                flexShrink: 0,
                textAlign: "right",
              }}
            >
              {token.px}
            </span>
            {/* 크기를 직접 보여주는 색상 막대 */}
            <div
              style={{
                height: "20px",
                width: `var(${token.var})`,
                minWidth: "2px",
                background: "var(--color-primary, #00c781)",
                borderRadius: "3px",
                opacity: 0.8,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Spacing",
  component: SpacingPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof SpacingPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** none(0px)부터 11xl(160px)까지 18단계 간격 스케일을 막대 그래프로 시각화합니다. */
export const Default: Story = {};
