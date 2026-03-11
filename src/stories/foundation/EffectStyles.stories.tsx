import type { Meta, StoryObj } from "@storybook/react";

/**
 * Foundation / Effect Styles
 *
 * 디자인 시스템의 시각 효과(Effect) 토큰을 시각화하는 스토리입니다.
 * Shadow(그림자)와 Focus Ring(포커스 표시선) 두 가지 섹션으로 구성됩니다.
 *
 * Shadow: 요소에 깊이감과 현실감을 주는 그림자 스타일. xs(가장 약함) → 3xl(가장 강함) 7단계.
 * Focus Ring: 키보드로 요소를 선택했을 때 나타나는 테두리. WCAG 2.1 AA 접근성 기준 필수 요소.
 */

// ─────────────────────────────────────────────
// Shadow 데이터 정의
// 각 단계별 shadow 이름과 CSS 변수명을 정의합니다.
// ─────────────────────────────────────────────

/** Shadow 단계별 데이터 */
const shadowTokens = [
  {
    name: "shadow-xs",
    var: "--shadow-xs",
    description: "가장 미세한 그림자. 작은 카드, 입력 필드 등에 사용.",
  },
  {
    name: "shadow-sm",
    var: "--shadow-sm",
    description: "소형 그림자. 드롭다운 메뉴, 툴팁 등에 사용.",
  },
  {
    name: "shadow-md",
    var: "--shadow-md",
    description: "중간 그림자. 모달 하단 카드, 팝오버 등에 사용.",
  },
  {
    name: "shadow-lg",
    var: "--shadow-lg",
    description: "대형 그림자. 다이얼로그, 사이드 패널 등에 사용.",
  },
  {
    name: "shadow-xl",
    var: "--shadow-xl",
    description: "매우 큰 그림자. 주요 모달 창에 사용.",
  },
  {
    name: "shadow-2xl",
    var: "--shadow-2xl",
    description: "2XL 그림자. 풀스크린에 가까운 오버레이에 사용.",
  },
  {
    name: "shadow-3xl",
    var: "--shadow-3xl",
    description: "가장 강한 그림자. 최상위 레이어 요소에 사용.",
  },
] as const;

// ─────────────────────────────────────────────
// Focus Ring 데이터 정의
// 각 ring 종류와 참조하는 색상 토큰을 정의합니다.
// ─────────────────────────────────────────────

/** Focus Ring 종류별 데이터 */
const focusRingTokens = [
  {
    name: "focus-ring",
    var: "--color-ring",
    colorRef: "brand-500",
    description: "기본 포커스 링. 대부분의 인터랙티브 요소에 사용.",
  },
  {
    name: "focus-ring-alt",
    var: "--color-ring-hover",
    colorRef: "brand-600",
    description: "대체 포커스 링. 브랜드 색상 강조가 필요한 경우 사용.",
  },
  {
    name: "focus-ring-gray",
    var: "--color-ring-gray",
    colorRef: "gray-500",
    description: "중립 포커스 링. 배경이 브랜드 색상인 요소에 사용.",
  },
  {
    name: "focus-ring-error",
    var: "--color-ring-error",
    colorRef: "error-500",
    description: "오류 상태 포커스 링. 유효성 검사 실패 시 사용.",
  },
] as const;

// ─────────────────────────────────────────────
// 공통 인라인 스타일 상수
// Colors.stories.tsx와 동일한 패턴을 사용합니다.
// ─────────────────────────────────────────────

/** 섹션 제목 텍스트 스타일 */
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

/** 배지(Tier 표시) 스타일 */
const badge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 600,
  padding: "2px 6px",
  borderRadius: "4px",
  letterSpacing: "0.02em",
};

// ─────────────────────────────────────────────
// Shadow 카드 컴포넌트
// 각 shadow 단계를 흰 카드 위에 시각적으로 표현합니다.
// ─────────────────────────────────────────────

/**
 * ShadowCard
 * 한 단계의 shadow를 흰 카드에 적용하여 실제 그림자 효과를 미리 볼 수 있게 합니다.
 */
function ShadowCard({
  name,
  cssVar,
}: {
  name: string;
  cssVar: string;
}) {
  return (
    <div
      style={{
        width: "256px",
        height: "240px",
        backgroundColor: "#ffffff",
        /* 테두리는 Figma 원본에 따라 반투명 검정 8% 적용 */
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: "var(--radius-xl, 12px)",
        padding: "var(--spacing-3xl, 24px)",
        /* CSS 변수를 사용하여 해당 단계의 shadow 적용 */
        boxShadow: `var(${cssVar})`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flexShrink: 0,
      }}
    >
      {/* 카드 상단: shadow 이름 표시 */}
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#333",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {name}
      </span>
      {/* 카드 하단 오른쪽: CSS 변수명 표시 */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <code
          style={{
            fontSize: "10px",
            color: "#aaa",
            fontFamily: "monospace",
          }}
        >
          {cssVar}
        </code>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Focus Ring 카드 컴포넌트
// 각 focus ring 종류를 카드에 box-shadow로 적용하여 보여줍니다.
// ─────────────────────────────────────────────

/**
 * FocusRingCard
 * Focus ring box-shadow를 카드에 직접 적용하여
 * 실제 접근성 포커스 표시선이 어떻게 보이는지 미리 확인할 수 있습니다.
 */
function FocusRingCard({
  name,
  cssVar,
  colorRef,
}: {
  name: string;
  cssVar: string;
  colorRef: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        /* 테두리는 --color-border(gray-300) 사용 */
        border: "1px solid var(--color-border, #d3d3d3)",
        borderRadius: "var(--radius-xl, 12px)",
        padding: "var(--spacing-3xl, 24px)",
        height: "240px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        /* focus ring을 box-shadow 2px 고정 두께로 적용 */
        boxShadow: `0px 0px 0px 2px var(${cssVar})`,
      }}
    >
      {/* 카드 상단: focus ring 이름 */}
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "#333",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {name}
      </span>
      {/* 카드 하단: 참조 색상 토큰명 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <code
          style={{
            fontSize: "11px",
            color: "#888",
            fontFamily: "monospace",
          }}
        >
          {cssVar}
        </code>
        <span
          style={{
            fontSize: "10px",
            color: "#aaa",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {colorRef}
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Shadows 페이지 컴포넌트
// ─────────────────────────────────────────────

/**
 * ShadowsPage
 * 7단계 shadow 토큰을 카드 그리드로 시각화합니다.
 * Figma 원본 레이아웃: flex-wrap, gap 48px, 카드 크기 256×240px
 */
function ShadowsPage() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
            Shadows
          </h1>
          {/* Tier 2 배지: shadows는 semantic 토큰 레벨 */}
          <span
            style={{ ...badge, background: "#e3f2fd", color: "#1565c0" }}
          >
            Tier 2 — Semantic
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          Shadows allow you to add depth and realism to designs by positioning
          elements on a z-axis.
        </p>
      </div>

      {/* 섹션 구분선 + 라벨 */}
      <div style={{ marginBottom: "32px" }}>
        <h2 style={{ ...sectionTitle }}>Shadows</h2>
      </div>

      {/* Shadow 카드 그리드 — flex-wrap으로 줄바꿈 처리 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "48px",
          /* 카드 그림자가 잘리지 않도록 충분한 패딩 확보 */
          padding: "32px",
          margin: "-32px",
        }}
      >
        {shadowTokens.map((token) => (
          <ShadowCard
            key={token.name}
            name={token.name}
            cssVar={token.var}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Focus Rings 페이지 컴포넌트
// ─────────────────────────────────────────────

/**
 * FocusRingsPage
 * 4종 focus ring 토큰을 카드 그리드로 시각화합니다.
 * Figma 원본 레이아웃: auto-fill grid, minmax(280px, 1fr), 카드 높이 240px
 */
function FocusRingsPage() {
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "6px",
          }}
        >
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>
            Focus rings
          </h1>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          A focus ring identifies the currently focused element on your page.
        </p>
      </div>

      {/* 섹션 구분선 + 라벨 + 설명 */}
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ ...sectionTitle }}>Focus rings</h2>
        <p style={{ fontSize: "13px", color: "#888", margin: 0 }}>
          Single layer focus rings are used for elements such as toggles and
          checkboxes that don't require a shadow.
        </p>
      </div>

      {/* Focus Ring 카드 그리드 — auto-fill로 반응형 레이아웃 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {focusRingTokens.map((token) => (
          <FocusRingCard
            key={token.name}
            name={token.name}
            cssVar={token.var}
            colorRef={token.colorRef}
          />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Storybook Meta & Stories
// ─────────────────────────────────────────────

const meta = {
  title: "Foundation/Effect Styles",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

type Story = StoryObj;

/**
 * Shadow — xs에서 3xl까지 7단계 그림자 효과 토큰을 카드로 시각화합니다.
 * 각 카드에 실제 box-shadow가 적용되어 있어 그림자 강도를 직접 비교할 수 있습니다.
 */
export const Shadows: Story = {
  render: () => <ShadowsPage />,
};

/**
 * Focus Rings — 4종 포커스 링 토큰을 카드로 시각화합니다.
 * 키보드 접근성을 위해 사용되는 각 ring의 색상과 용도를 확인할 수 있습니다.
 * WCAG 2.1 AA 접근성 기준 준수를 위해 모든 인터랙티브 요소에 적용해야 합니다.
 */
export const FocusRings: Story = {
  render: () => <FocusRingsPage />,
};
