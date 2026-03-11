/**
 * Input 컴포넌트 Storybook 스토리
 *
 * 텍스트 입력 필드의 모든 상태와 변형을 시각적으로 확인하고
 * 인터랙티브하게 테스트할 수 있는 스토리입니다.
 *
 * ## 스토리 목록
 * 1. Default        — 기본 상태 (placeholder 표시)
 * 2. Filled         — 값이 입력된 상태
 * 3. FocusedNormal  — 포커스된 일반 상태 (autoFocus로 시뮬레이션)
 * 4. FocusedError   — 포커스된 에러 상태
 * 5. Destructive    — 에러 상태 (에러 메시지 + AlertCircle 아이콘)
 * 6. Disabled       — 비활성화 상태
 * 7. DisabledFilled — 값이 있는 비활성화 상태
 * 8. WithLeadingIcon — 좌측 아이콘 포함
 * 9. Required       — 필수 입력 표시 (* 기호)
 * 10. NoLabel       — 라벨 없이 사용하는 경우
 * 11. AllSizes      — sm/md 크기 비교
 * 12. AllStates     — 모든 상태 한 번에 비교
 * 13. Playground    — Controls로 모든 prop 조작 가능
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Search, Mail, User } from "lucide-react";
import { Input } from "./Input";

// ─────────────────────────────────────────────
// 메타 정의
// ─────────────────────────────────────────────

const meta = {
  title: "Components/Input",
  component: Input,

  // autodocs: JSDoc 주석을 기반으로 자동 문서 페이지 생성
  tags: ["autodocs"],

  // Controls 패널에서 각 prop을 어떻게 조작할지 설정합니다.
  argTypes: {
    /**
     * 크기 선택 — 드롭다운으로 sm/md 선택
     */
    size: {
      control: "select",
      options: ["sm", "md"],
      description: "입력 필드의 크기를 선택합니다. sm(14px 텍스트) 또는 md(16px 텍스트, 기본값)",
      table: {
        defaultValue: { summary: "md" },
      },
    },

    /**
     * 에러 상태 — 체크박스 토글
     */
    destructive: {
      control: "boolean",
      description: "에러/유효성 실패 상태입니다. true로 설정하면 에러 테두리와 AlertCircle 아이콘이 표시됩니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },

    /**
     * 비활성화 상태 — 체크박스 토글
     */
    disabled: {
      control: "boolean",
      description: "비활성화 상태입니다. 입력이 불가능하며 회색 스타일로 표시됩니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },

    /**
     * 필수 표시 — 체크박스 토글
     */
    showRequired: {
      control: "boolean",
      description: "라벨 옆에 빨간 * 기호를 표시합니다. 필수 입력 필드임을 시각적으로 알립니다.",
      table: {
        defaultValue: { summary: "false" },
      },
    },

    /**
     * 라벨 텍스트 — 입력창
     */
    label: {
      control: "text",
      description: "입력 필드 위에 표시되는 라벨 텍스트입니다.",
    },

    /**
     * 힌트/에러 메시지 — 입력창
     */
    hint: {
      control: "text",
      description: "입력 필드 아래에 표시되는 보조 텍스트입니다. destructive=true일 때 에러 색상으로 표시됩니다.",
    },

    /**
     * placeholder — 입력창
     */
    placeholder: {
      control: "text",
      description: "입력 값이 없을 때 표시되는 안내 텍스트입니다.",
    },

    // leadingIcon은 Controls에서 직접 설정하기 어려워 hidden 처리
    leadingIcon: {
      table: { disable: true },
    },
  },

  // 모든 스토리에 공통으로 적용되는 기본값
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    size: "md",
    destructive: false,
    disabled: false,
    showRequired: false,
  },

  // 스토리 렌더링 영역에 여백을 추가하여 보기 좋게 만듭니다.
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

// ─────────────────────────────────────────────
// 개별 스토리
// ─────────────────────────────────────────────

/**
 * 기본 상태
 * placeholder가 표시되는 가장 기본적인 모습입니다.
 */
export const Default: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
  },
};

/**
 * 값이 입력된 상태 (Filled)
 * 사용자가 이미 값을 입력한 경우의 모습입니다.
 */
export const Filled: Story = {
  args: {
    label: "이메일",
    defaultValue: "user@example.com",
  },
};

/**
 * 포커스된 상태 — 일반 (Focused Normal)
 * autoFocus prop으로 포커스 상태를 시뮬레이션합니다.
 * border가 2px 브랜드 색상으로 변경됩니다.
 */
export const FocusedNormal: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus: true,
  },
  name: "Focused (Normal)",
};

/**
 * 포커스된 에러 상태 (Focused Error)
 * 에러 상태에서 포커스된 경우, border가 2px 에러 색상으로 변경됩니다.
 */
export const FocusedError: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    destructive: true,
    hint: "올바른 이메일 형식을 입력해주세요",
    // eslint-disable-next-line jsx-a11y/no-autofocus
    autoFocus: true,
  },
  name: "Focused (Error)",
};

/**
 * 에러 상태 (Destructive)
 * 유효성 검사 실패 등 에러가 발생한 경우입니다.
 * 에러 테두리, AlertCircle 아이콘, 에러 메시지가 함께 표시됩니다.
 */
export const Destructive: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    destructive: true,
    hint: "비밀번호는 8자 이상이어야 합니다",
    defaultValue: "1234",
  },
};

/**
 * 비활성화 상태 — 빈 값 (Disabled)
 * 입력이 불가능한 상태입니다. 회색 배경과 비활성화 테두리가 적용됩니다.
 */
export const Disabled: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    disabled: true,
  },
};

/**
 * 비활성화 상태 — 값 있음 (Disabled Filled)
 * 읽기 전용처럼 값이 있지만 수정할 수 없는 상태입니다.
 */
export const DisabledFilled: Story = {
  args: {
    label: "이메일",
    defaultValue: "readonly@example.com",
    disabled: true,
    hint: "이 필드는 수정할 수 없습니다",
  },
  name: "Disabled (Filled)",
};

/**
 * 좌측 아이콘 포함 (With Leading Icon)
 * Search 아이콘이 입력 필드 왼쪽에 표시됩니다.
 */
export const WithLeadingIcon: Story = {
  args: {
    label: "검색",
    placeholder: "검색어를 입력하세요",
    leadingIcon: Search,
  },
};

/**
 * 아이콘 + 에러 상태 (Icon + Destructive)
 * 아이콘이 있는 상태에서 에러가 발생한 경우입니다.
 * 좌측에 leading icon, 우측에 AlertCircle이 함께 표시됩니다.
 */
export const WithLeadingIconDestructive: Story = {
  args: {
    label: "이메일",
    placeholder: "example@email.com",
    leadingIcon: Mail,
    destructive: true,
    hint: "올바른 이메일 형식을 입력해주세요",
    defaultValue: "invalid-email",
  },
  name: "With Icon + Destructive",
};

/**
 * 필수 입력 표시 (Required)
 * 라벨 옆에 빨간 * 기호가 표시됩니다.
 */
export const Required: Story = {
  args: {
    label: "이름",
    placeholder: "이름을 입력하세요",
    showRequired: true,
    required: true, // HTML form 유효성 검사용
  },
};

/**
 * 힌트 텍스트 포함 (With Hint)
 * 입력 필드 아래에 보조 안내 텍스트가 표시됩니다.
 */
export const WithHint: Story = {
  args: {
    label: "비밀번호",
    placeholder: "비밀번호를 입력하세요",
    hint: "영문, 숫자, 특수문자를 포함하여 8자 이상 입력해주세요",
    type: "password",
  },
};

/**
 * 라벨 없이 사용 (No Label)
 * label prop 없이 단독으로 사용하는 경우입니다.
 * 라벨이 없을 때는 aria-label을 반드시 추가해 접근성을 확보하세요.
 */
export const NoLabel: Story = {
  args: {
    label: undefined,
    placeholder: "검색어를 입력하세요",
    leadingIcon: Search,
    "aria-label": "검색",
  },
};

/**
 * 크기 비교 (All Sizes)
 * sm과 md 두 가지 크기를 나란히 비교합니다.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-xl w-80">
      <Input
        label="Small (sm)"
        placeholder="sm 크기 입력 필드"
        size="sm"
        hint="14px 텍스트, py-md(8px) + px-lg(12px)"
      />
      <Input
        label="Medium (md)"
        placeholder="md 크기 입력 필드"
        size="md"
        hint="16px 텍스트, py-md-lg(10px) + px-[14px]"
      />
    </div>
  ),
};

/**
 * 모든 상태 비교 (All States)
 * 입력 필드의 모든 상태를 한 화면에서 비교합니다.
 */
export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-xl w-80">
      {/* 기본 상태 */}
      <Input
        label="기본 (Default)"
        placeholder="placeholder 표시"
      />

      {/* 값 입력 상태 */}
      <Input
        label="값 있음 (Filled)"
        defaultValue="입력된 값"
      />

      {/* 에러 상태 */}
      <Input
        label="에러 (Destructive)"
        defaultValue="잘못된 값"
        destructive
        hint="오류가 발생했습니다"
      />

      {/* 비활성화 상태 */}
      <Input
        label="비활성화 (Disabled)"
        placeholder="입력 불가"
        disabled
      />

      {/* 아이콘 포함 */}
      <Input
        label="아이콘 포함 (With Icon)"
        placeholder="검색어를 입력하세요"
        leadingIcon={Search}
      />

      {/* 필수 필드 */}
      <Input
        label="필수 입력 (Required)"
        placeholder="필수 항목"
        showRequired
        required
      />

      {/* 힌트 텍스트 */}
      <Input
        label="힌트 포함 (With Hint)"
        placeholder="입력하세요"
        hint="이 항목은 선택 사항입니다"
      />
    </div>
  ),
};

/**
 * 폼 예시 (Form Example)
 * 실제 폼에서 사용하는 예시입니다.
 * 다양한 타입의 입력 필드를 조합한 모습을 보여줍니다.
 */
export const FormExample: Story = {
  render: () => (
    <form className="flex flex-col gap-xl w-96 p-2xl">
      <Input
        label="이름"
        placeholder="홍길동"
        showRequired
        required
        leadingIcon={User}
      />
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        showRequired
        required
        leadingIcon={Mail}
        hint="로그인에 사용됩니다"
      />
      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        showRequired
        required
        hint="영문, 숫자, 특수문자를 포함하여 8자 이상"
      />
      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        showRequired
        required
        destructive
        hint="비밀번호가 일치하지 않습니다"
      />
    </form>
  ),
};

/**
 * 인터랙티브 플레이그라운드 (Playground)
 * Controls 패널에서 모든 prop을 직접 조작하며 테스트할 수 있습니다.
 */
export const Playground: Story = {
  args: {
    label: "라벨",
    placeholder: "텍스트를 입력하세요",
    hint: "힌트 메시지",
    size: "md",
    destructive: false,
    disabled: false,
    showRequired: false,
  },
};
