/**
 * Button 컴포넌트 Storybook 스토리
 *
 * 이 파일은 Button 컴포넌트의 모든 variant를 시각적으로 확인하고
 * 인터랙티브하게 테스트할 수 있는 스토리 모음입니다.
 *
 * 스토리 구성:
 * 1. Default       — Primary md 기본 상태
 * 2. AllHierarchies — 6종 hierarchy 한눈에 비교
 * 3. AllSizes      — Primary 기준 4종 size 비교
 * 4. WithIcons     — leadingIcon / trailingIcon / iconOnly 예시
 * 5. Playground    — Controls로 모든 prop을 자유롭게 조작
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Plus, ArrowRight, Search, Download, ChevronDown } from "lucide-react";
import { Button } from "./Button";

// ─────────────────────────────────────────────
// Meta 설정
// ─────────────────────────────────────────────

const meta = {
  title: "Components/Button",
  component: Button,
  // autodocs: 컴포넌트 JSDoc과 Props를 기반으로 문서 페이지를 자동 생성합니다
  tags: ["autodocs"],
  argTypes: {
    hierarchy: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "gray", "link-color", "link-gray"],
      description: "버튼의 시각적 계층을 선택합니다. 페이지에서 해당 버튼의 중요도를 반영합니다.",
      table: {
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "버튼의 크기를 선택합니다. (sm=36px / md=40px / lg=44px / xl=48px)",
      table: {
        defaultValue: { summary: "md" },
      },
    },
    iconOnly: {
      control: "boolean",
      description: "true로 설정하면 아이콘만 표시되는 정사각형 버튼이 됩니다. aria-label이 필수입니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    disabled: {
      control: "boolean",
      description: "버튼을 비활성화 상태로 만듭니다. 클릭이 불가능해집니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: "text",
      description: "버튼에 표시될 텍스트 내용입니다.",
    },
    // leadingIcon / trailingIcon은 Lucide 아이콘 컴포넌트를 받으므로
    // Storybook Controls에서 직접 선택하기 어렵습니다.
    // WithIcons 스토리에서 각 조합을 확인하세요.
    leadingIcon: { table: { disable: true } },
    trailingIcon: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  parameters: {
    // 스토리 캔버스 배경색을 밝은 색으로 고정
    backgrounds: {
      default: "light",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────
// 1. Default — 기본 상태
// ─────────────────────────────────────────────

/**
 * Primary hierarchy, md size 기본 상태입니다.
 * 대부분의 경우 이 기본값을 그대로 사용합니다.
 */
export const Default: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    children: "Button CTA",
    disabled: false,
  },
};

// ─────────────────────────────────────────────
// 2. AllHierarchies — 6종 계층 비교
// ─────────────────────────────────────────────

/**
 * 6가지 hierarchy를 md size 기준으로 한 줄씩 나열합니다.
 * 각 계층의 시각적 차이를 한눈에 비교할 수 있습니다.
 */
export const AllHierarchies: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-md)] items-start p-[var(--spacing-2xl)]">
      {/* 섹션 제목 */}
      <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-xs)]">
        Hierarchy 6종 — md size 기준
      </p>

      {/* 일반 상태 */}
      <div className="flex flex-wrap gap-[var(--spacing-md)] items-center">
        <Button hierarchy="primary">Primary</Button>
        <Button hierarchy="secondary">Secondary</Button>
        <Button hierarchy="tertiary">Tertiary</Button>
        <Button hierarchy="gray">Gray</Button>
        <Button hierarchy="link-color">Link Color</Button>
        <Button hierarchy="link-gray">Link Gray</Button>
      </div>

      {/* 비활성화 상태 */}
      <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mt-[var(--spacing-sm)]">
        Disabled 상태
      </p>
      <div className="flex flex-wrap gap-[var(--spacing-md)] items-center">
        <Button hierarchy="primary" disabled>Primary</Button>
        <Button hierarchy="secondary" disabled>Secondary</Button>
        <Button hierarchy="tertiary" disabled>Tertiary</Button>
        <Button hierarchy="gray" disabled>Gray</Button>
        <Button hierarchy="link-color" disabled>Link Color</Button>
        <Button hierarchy="link-gray" disabled>Link Gray</Button>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────
// 3. AllSizes — 4종 크기 비교
// ─────────────────────────────────────────────

/**
 * Primary hierarchy 기준으로 4가지 size를 비교합니다.
 * 버튼 높이가 sm(36px) → xl(48px)로 순차적으로 증가합니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-md)] p-[var(--spacing-2xl)]">
      <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-xs)]">
        Size 4종 — Primary hierarchy 기준
      </p>

      {/* 가로 정렬 — 크기 순서대로 */}
      <div className="flex flex-wrap gap-[var(--spacing-md)] items-end">
        <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
          <Button hierarchy="primary" size="sm">Small (36px)</Button>
          <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">sm</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
          <Button hierarchy="primary" size="md">Medium (40px)</Button>
          <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">md</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
          <Button hierarchy="primary" size="lg">Large (44px)</Button>
          <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">lg</span>
        </div>
        <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
          <Button hierarchy="primary" size="xl">XL (48px)</Button>
          <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">xl</span>
        </div>
      </div>

      {/* secondary로도 확인 */}
      <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mt-[var(--spacing-sm)]">
        Secondary hierarchy 기준
      </p>
      <div className="flex flex-wrap gap-[var(--spacing-md)] items-end">
        <Button hierarchy="secondary" size="sm">Small</Button>
        <Button hierarchy="secondary" size="md">Medium</Button>
        <Button hierarchy="secondary" size="lg">Large</Button>
        <Button hierarchy="secondary" size="xl">XLarge</Button>
      </div>
    </div>
  ),
};

// ─────────────────────────────────────────────
// 4. WithIcons — 아이콘 조합 예시
// ─────────────────────────────────────────────

/**
 * leadingIcon, trailingIcon, iconOnly 세 가지 아이콘 활용 방식을 보여줍니다.
 * 버튼 내 아이콘은 모든 size에서 20px(md)로 고정됩니다.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-[var(--spacing-lg)] p-[var(--spacing-2xl)]">

      {/* Leading Icon — 왼쪽 아이콘 */}
      <div>
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-sm)]">
          Leading Icon (왼쪽 아이콘)
        </p>
        <div className="flex flex-wrap gap-[var(--spacing-md)] items-center">
          <Button hierarchy="primary" leadingIcon={Plus}>항목 추가</Button>
          <Button hierarchy="secondary" leadingIcon={Download}>다운로드</Button>
          <Button hierarchy="tertiary" leadingIcon={Search}>검색하기</Button>
        </div>
      </div>

      {/* Trailing Icon — 오른쪽 아이콘 */}
      <div>
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-sm)]">
          Trailing Icon (오른쪽 아이콘)
        </p>
        <div className="flex flex-wrap gap-[var(--spacing-md)] items-center">
          <Button hierarchy="primary" trailingIcon={ArrowRight}>다음 단계</Button>
          <Button hierarchy="secondary" trailingIcon={ChevronDown}>옵션 선택</Button>
          <Button hierarchy="link-color" trailingIcon={ArrowRight}>자세히 보기</Button>
        </div>
      </div>

      {/* Leading + Trailing — 양쪽 아이콘 */}
      <div>
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-sm)]">
          Leading + Trailing (양쪽 아이콘)
        </p>
        <div className="flex flex-wrap gap-[var(--spacing-md)] items-center">
          <Button hierarchy="secondary" leadingIcon={Search} trailingIcon={ChevronDown}>
            필터 검색
          </Button>
          <Button hierarchy="primary" leadingIcon={Download} trailingIcon={ArrowRight}>
            내보내기
          </Button>
        </div>
      </div>

      {/* Icon Only — 아이콘 단독 */}
      <div>
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-sm)]">
          Icon Only — 4가지 size (aria-label 필수)
        </p>
        <div className="flex flex-wrap gap-[var(--spacing-md)] items-end">
          <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
            <Button
              hierarchy="primary"
              size="sm"
              iconOnly
              leadingIcon={Plus}
              aria-label="항목 추가"
            >
              항목 추가
            </Button>
            <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">sm</span>
          </div>
          <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
            <Button
              hierarchy="primary"
              size="md"
              iconOnly
              leadingIcon={Plus}
              aria-label="항목 추가"
            >
              항목 추가
            </Button>
            <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">md</span>
          </div>
          <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
            <Button
              hierarchy="primary"
              size="lg"
              iconOnly
              leadingIcon={Plus}
              aria-label="항목 추가"
            >
              항목 추가
            </Button>
            <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">lg</span>
          </div>
          <div className="flex flex-col items-center gap-[var(--spacing-xs)]">
            <Button
              hierarchy="primary"
              size="xl"
              iconOnly
              leadingIcon={Plus}
              aria-label="항목 추가"
            >
              항목 추가
            </Button>
            <span className="text-[var(--font-size-xs)] text-[var(--color-text-tertiary)]">xl</span>
          </div>
        </div>

        {/* Icon Only — hierarchy별 비교 */}
        <p className="text-[var(--font-size-sm)] text-[var(--color-text-secondary)] font-medium mb-[var(--spacing-sm)] mt-[var(--spacing-md)]">
          Icon Only — md size, hierarchy별
        </p>
        <div className="flex flex-wrap gap-[var(--spacing-md)] items-center">
          <Button hierarchy="primary" size="md" iconOnly leadingIcon={Search} aria-label="검색">검색</Button>
          <Button hierarchy="secondary" size="md" iconOnly leadingIcon={Search} aria-label="검색">검색</Button>
          <Button hierarchy="tertiary" size="md" iconOnly leadingIcon={Search} aria-label="검색">검색</Button>
          <Button hierarchy="gray" size="md" iconOnly leadingIcon={Search} aria-label="검색">검색</Button>
        </div>
      </div>

    </div>
  ),
};

// ─────────────────────────────────────────────
// 5. Playground — 모든 prop 자유 조작
// ─────────────────────────────────────────────

/**
 * Storybook Controls를 통해 모든 prop을 자유롭게 조작할 수 있는 스토리입니다.
 * hierarchy, size, iconOnly, disabled, 텍스트 등을 패널에서 실시간으로 변경해보세요.
 */
export const Playground: Story = {
  args: {
    hierarchy: "primary",
    size: "md",
    iconOnly: false,
    disabled: false,
    children: "Button CTA",
  },
};
