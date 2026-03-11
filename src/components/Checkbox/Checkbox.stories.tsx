/**
 * Checkbox 컴포넌트 Storybook 스토리
 *
 * 스토리 구성:
 * 1. Default        — md 크기 기본 상태
 * 2. Checked        — 체크된 상태
 * 3. Indeterminate  — 부분 선택 상태
 * 4. WithLabel      — 레이블 텍스트 포함
 * 5. WithLabelHint  — 레이블 + 힌트 텍스트 포함
 * 6. AllSizes       — sm / md 크기 비교
 * 7. AllStates      — 모든 상태 매트릭스
 * 8. Disabled       — 비활성화 상태 모음
 * 9. Playground     — Controls로 모든 prop 인터랙티브 조작
 */
import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

// ─────────────────────────────────────────────
// Meta 설정
// ─────────────────────────────────────────────

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "체크박스 크기 (sm=16px / md=20px)",
      table: { defaultValue: { summary: "md" } },
    },
    checked: {
      control: "boolean",
      description: "체크 여부 (controlled 모드)",
    },
    indeterminate: {
      control: "boolean",
      description: "부분 선택 상태",
      table: { defaultValue: { summary: "false" } },
    },
    disabled: {
      control: "boolean",
      description: "비활성화 여부",
      table: { defaultValue: { summary: "false" } },
    },
    label: {
      control: "text",
      description: "레이블 텍스트",
    },
    hint: {
      control: "text",
      description: "레이블 아래에 표시할 힌트 텍스트",
    },
    // 외부 확장용 — controls 패널에서 숨김
    className: { table: { disable: true } },
    ref:       { table: { disable: true } },
  },
  parameters: {
    backgrounds: { default: "light" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────
// 1. Default — 기본 상태
// ─────────────────────────────────────────────

/**
 * 기본 상태(unchecked)입니다. 크기 기본값은 md(20px)입니다.
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

// ─────────────────────────────────────────────
// 2. Checked — 체크된 상태
// ─────────────────────────────────────────────

/**
 * 체크된 상태입니다. 어두운 배경에 흰색 Check 아이콘이 표시됩니다.
 */
export const Checked: Story = {
  args: {
    size: "md",
    checked: true,
    onChange: () => {},
  },
};

// ─────────────────────────────────────────────
// 3. Indeterminate — 부분 선택 상태
// ─────────────────────────────────────────────

/**
 * 부분 선택(indeterminate) 상태입니다.
 * 트리 선택이나 "모두 선택" 체크박스에서 일부만 선택되었을 때 사용합니다.
 */
export const Indeterminate: Story = {
  args: {
    size: "md",
    indeterminate: true,
  },
};

// ─────────────────────────────────────────────
// 4. WithLabel — 레이블 포함
// ─────────────────────────────────────────────

/**
 * 레이블 텍스트가 포함된 상태입니다.
 */
export const WithLabel: Story = {
  args: {
    size: "md",
    label: "Remember me",
  },
};

// ─────────────────────────────────────────────
// 5. WithLabelHint — 레이블 + 힌트 포함
// ─────────────────────────────────────────────

/**
 * 레이블과 힌트 텍스트가 모두 포함된 상태입니다.
 * Figma 기준 레이아웃입니다.
 */
export const WithLabelHint: Story = {
  args: {
    size: "md",
    label: "Remember me",
    hint: "Save my login details for next time.",
  },
};

// ─────────────────────────────────────────────
// 6. AllSizes — 크기 비교
// ─────────────────────────────────────────────

/**
 * sm(16px)과 md(20px) 크기를 나란히 비교합니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
      {(["sm", "md"] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <Checkbox size={size} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────
// 7. AllStates — 상태 매트릭스
// ─────────────────────────────────────────────

const STATE_LABEL_STYLE: React.CSSProperties = {
  fontSize: "11px",
  color: "#9ca3af",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

/**
 * sm / md × 모든 상태를 매트릭스로 시각화합니다.
 * 열: Unchecked / Checked / Indeterminate / Disabled / Disabled Checked
 */
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "40px repeat(5, 1fr)", gap: "20px 16px", alignItems: "center" }}>
      {/* 헤더 */}
      <span />
      {["Unchecked", "Checked", "Indeterminate", "Disabled", "Disabled Checked"].map((label) => (
        <span key={label} style={STATE_LABEL_STYLE}>{label}</span>
      ))}

      {/* sm 행 */}
      <span style={{ ...STATE_LABEL_STYLE, color: "#374151" }}>sm</span>
      <Checkbox size="sm" />
      <Checkbox size="sm" checked onChange={() => {}} />
      <Checkbox size="sm" indeterminate />
      <Checkbox size="sm" disabled />
      <Checkbox size="sm" checked disabled onChange={() => {}} />

      {/* md 행 */}
      <span style={{ ...STATE_LABEL_STYLE, color: "#374151" }}>md</span>
      <Checkbox size="md" />
      <Checkbox size="md" checked onChange={() => {}} />
      <Checkbox size="md" indeterminate />
      <Checkbox size="md" disabled />
      <Checkbox size="md" checked disabled onChange={() => {}} />
    </div>
  ),
};

// ─────────────────────────────────────────────
// 8. Disabled — 비활성화 상태 모음
// ─────────────────────────────────────────────

/**
 * 비활성화 상태 3종: unchecked / checked / indeterminate
 * 레이블 + 힌트 텍스트도 함께 비활성화됩니다.
 */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox disabled label="Remember me" hint="Save my login details for next time." />
      <Checkbox disabled checked onChange={() => {}} label="Remember me" hint="Save my login details for next time." />
      <Checkbox disabled indeterminate label="Remember me" hint="Save my login details for next time." />
    </div>
  ),
};

// ─────────────────────────────────────────────
// 9. Playground — 인터랙티브 조작
// ─────────────────────────────────────────────

/**
 * Controls 패널에서 모든 prop을 자유롭게 조작해볼 수 있는 스토리입니다.
 * checked 상태는 클릭으로 직접 토글 가능합니다.
 */
function PlaygroundCheckbox(args: React.ComponentProps<typeof Checkbox>) {
  const [checked, setChecked] = useState(args.checked ?? false);

  // Controls 패널에서 checked 값 변경 시 내부 state 동기화
  useEffect(() => {
    setChecked(args.checked ?? false);
  }, [args.checked]);

  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
}

export const Playground: Story = {
  render: (args) => <PlaygroundCheckbox {...args} />,
  args: {
    size: "md",
    indeterminate: false,
    disabled: false,
    label: "Remember me",
    hint: "Save my login details for next time.",
  },
};
