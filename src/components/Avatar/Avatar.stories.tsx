/**
 * Avatar 컴포넌트 Storybook 스토리
 *
 * 스토리 구성:
 * 1. Default    — md 크기 플레이스홀더 기본 상태
 * 2. AllSizes   — 6가지 크기 비교
 * 3. Playground — Controls로 size prop 조작
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "아바타 크기 (xs=24px / sm=32px / md=40px / lg=48px / xl=56px / 2xl=64px)",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    // 외부 확장용 escape-hatch — controls 패널에서 숨김
    className: { table: { disable: true } },
    ref:       { table: { disable: true } },
  },
  parameters: {
    backgrounds: {
      default: "light",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────
// 1. Default — md 크기 플레이스홀더
// ─────────────────────────────────────────────

/**
 * 기본 상태입니다.
 * User 아이콘 플레이스홀더가 표시됩니다. 크기 기본값은 md(40px)입니다.
 */
export const Default: Story = {
  args: {
    size: "md",
  },
};

// ─────────────────────────────────────────────
// 2. AllSizes — 6가지 크기 비교
// ─────────────────────────────────────────────

/**
 * 6가지 크기의 플레이스홀더 아바타를 나란히 비교합니다.
 * xs: 0.5px / sm: 0.75px / md~2xl: 1px 테두리 두께 차이를 확인할 수 있습니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <Avatar size={size} />
          <span style={{ fontSize: "12px", color: "#6b7280" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ─────────────────────────────────────────────
// 3. Playground — size prop 인터랙티브 조작
// ─────────────────────────────────────────────

/**
 * Controls 패널에서 size prop을 자유롭게 조작해볼 수 있는 스토리입니다.
 */
export const Playground: Story = {
  args: {
    size: "md",
  },
};
