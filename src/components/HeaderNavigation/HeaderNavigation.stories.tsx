/**
 * HeaderNavigation 스토리
 */
import type { Meta, StoryObj } from "@storybook/react";
import { HeaderNavigation } from "./HeaderNavigation";

const meta = {
  title: "Components/HeaderNavigation",
  component: HeaderNavigation,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logo: { control: false, description: "헤더 좌측 로고 영역 (기본값: Logomark)" },
    children: { control: false, description: "로고와 rightSlot 사이 중앙 영역" },
    rightSlot: { control: false, description: "헤더 우측 액션 영역" },
    className: { control: "text", description: "외부 스타일 확장용" },
  },
} satisfies Meta<typeof HeaderNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 로고만 있는 가장 기본적인 헤더입니다.
 */
export const Default: Story = {
  args: {},
};
