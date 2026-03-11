import type { Meta, StoryObj } from "@storybook/react";

/**
 * 모서리 반경 토큰 전체 목록
 * tokens.css에 정의된 --radius-* Semantic 토큰을 정사각형 박스로 표현합니다.
 * none(0px, 각진 모서리)에서 full(9999px, 완전한 원형)까지 11단계입니다.
 */
const radiusTokens = [
  { name: "none", var: "--radius-none", px: "0px" },
  { name: "xxs", var: "--radius-xxs", px: "2px" },
  { name: "xs", var: "--radius-xs", px: "4px" },
  { name: "sm", var: "--radius-sm", px: "6px" },
  { name: "md", var: "--radius-md", px: "8px" },
  { name: "lg", var: "--radius-lg", px: "10px" },
  { name: "xl", var: "--radius-xl", px: "12px" },
  { name: "2xl", var: "--radius-2xl", px: "16px" },
  { name: "3xl", var: "--radius-3xl", px: "20px" },
  { name: "4xl", var: "--radius-4xl", px: "24px" },
  { name: "full", var: "--radius-full", px: "9999px" },
];

/**
 * Foundation / Radius
 *
 * 버튼, 카드, 입력 필드 등의 모서리 둥글기를 정의하는
 * Border Radius 토큰 스케일을 시각화합니다.
 *
 * 사용 예시:
 * - rounded-sm (6px): 작은 버튼, 배지
 * - rounded-md (8px): 일반 버튼, 입력 필드
 * - rounded-xl (12px): 카드, 모달
 * - rounded-full (9999px): 칩, 토글 등 완전한 원형
 */
function RadiusPage() {
  return (
    <div
      style={{
        padding: "32px",
        fontFamily: "system-ui, sans-serif",
        maxWidth: "960px",
      }}
    >
      <h1 style={{ fontSize: "28px", fontWeight: 700, marginBottom: "8px" }}>
        Border Radius
      </h1>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "40px" }}>
        Radius scale tokens — none (0px) to full (9999px)
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "32px" }}>
        {radiusTokens.map((token) => (
          <div
            key={token.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* 실제 반경을 적용한 정사각형 박스 */}
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "var(--color-primary, #00c781)",
                borderRadius: `var(${token.var})`,
                opacity: 0.85,
              }}
            />
            <code style={{ fontSize: "11px", color: "#555" }}>
              --radius-{token.name}
            </code>
            <span style={{ fontSize: "11px", color: "#888" }}>{token.px}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta = {
  title: "Foundation/Radius",
  component: RadiusPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof RadiusPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** none(0px)부터 full(9999px)까지 11단계 모서리 반경 스케일을 박스로 시각화합니다. */
export const Default: Story = {};
