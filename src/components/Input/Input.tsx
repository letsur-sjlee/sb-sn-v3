/**
 * Input 컴포넌트
 *
 * 사용자가 텍스트를 입력할 수 있는 폼 입력 필드입니다.
 * Figma 디자인 스펙을 기반으로 2가지 크기(size)와 다양한 상태
 * (기본, 포커스, 에러, 비활성화)를 지원합니다.
 *
 * ## 크기 (size)
 * - sm : py-md(8px) + px-lg(12px), text-sm(14px)
 * - md : py-md-lg(10px) + px-[14px], text-base(16px) — 기본값
 *
 * ## 상태 (state)
 * - 기본(Default/Placeholder/Filled): 흰 배경 + border-border + shadow-xs
 * - 포커스(Focused): border-2 두께 변경 + 브랜드 테두리 색상 (일반/에러 구분)
 * - 에러(Destructive): border-error-subtle + 우측 AlertCircle 아이콘
 * - 비활성화(Disabled): 회색 배경 + 비활성화 테두리 + cursor-not-allowed
 *
 * ## 포커스 구현 방식
 * border 대신 ring-inset(box-shadow inset)을 사용합니다.
 * box-shadow는 레이아웃에 영향을 주지 않으므로 stroke 두께가 height에 포함되지 않으며,
 * 1px → 2px 전환 시에도 layout shift가 발생하지 않습니다.
 *
 * ## 접근성 (WCAG 2.1 AA)
 * - <label> htmlFor ↔ input id 연결
 * - id가 없으면 React useId()로 자동 생성
 * - aria-invalid: 에러 상태에서 스크린 리더에 오류 알림
 * - aria-describedby: 힌트/에러 텍스트와 input을 프로그래밍적으로 연결
 * - aria-required: 필수 입력 필드를 스크린 리더에 명시적으로 알림
 *
 * @example
 * // 기본 사용법
 * <Input label="이메일" placeholder="example@email.com" />
 *
 * @example
 * // 에러 상태
 * <Input
 *   label="비밀번호"
 *   destructive
 *   hint="8자 이상 입력해주세요"
 * />
 *
 * @example
 * // 아이콘 포함
 * <Input
 *   label="검색"
 *   leadingIcon={Search}
 *   placeholder="검색어를 입력하세요"
 * />
 *
 * @example
 * // 필수 필드
 * <Input label="이름" required />
 */
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { type LucideIcon, AlertCircle } from "lucide-react";
import { useId, type Ref } from "react";
import { Icon } from "../Icon";

// ─────────────────────────────────────────────
// Input 내부 아이콘 크기 상수
// ─────────────────────────────────────────────

/** leading 아이콘 크기 — Figma 스펙: 20px */
const INPUT_LEADING_ICON_SIZE = "md" as const;

/** trailing error 아이콘 크기 — Figma 스펙: 16px */
const INPUT_ERROR_ICON_SIZE = "sm" as const;

// ─────────────────────────────────────────────
// CVA variant 정의
// ─────────────────────────────────────────────

/**
 * inputBoxVariants
 *
 * 입력 필드를 감싸는 외부 박스(wrapper div)의 스타일을 관리합니다.
 * border, background, 그림자, 커서 등 시각적 상태를 표현합니다.
 *
 * [포커스 구현 방식]
 * border-2 방식을 사용합니다 (ring이 아닌 실제 테두리 두께 변경).
 * border 1px → 2px 전환 시 발생하는 layout shift를 방지하기 위해
 * focus-within:overflow-hidden을 함께 적용합니다 (Figma 스펙 동일).
 *
 * [패딩 설계 원칙 — Button 컴포넌트와 동일]
 * size variant에 padding을 포함하지 않고, 모든 padding은
 * compoundVariants에서 케이스별로 명시합니다.
 * (Tailwind v4 커스텀 토큰 클래스 선언 순서로 인한 override 버그 방지)
 */
const inputBoxVariants = cva(
  // ── base: 입력 박스 공통 스타일 ──────────────────────────────
  // flex + items-center: 아이콘과 input 요소를 가로로 나란히 배치
  // gap-md: 아이콘과 텍스트 사이 8px 간격
  // w-full: 컨테이너 너비에 맞게 꽉 채움
  // rounded-sm: Figma 스펙 radius-sm (6px)
  // transition: 테두리 색상 전환 부드럽게
  //
  // [border → ring-inset 방식]
  // border 대신 ring-inset(box-shadow inset)을 사용합니다.
  // box-shadow는 레이아웃에 영향을 주지 않으므로:
  // - 1px → 2px 전환 시 height/width 변화 없음 (layout shift 없음)
  // - overflow-hidden 불필요
  // - 높이는 padding + line-height만으로 결정
  [
    "flex items-center",
    "gap-md",
    "w-full",
    "rounded-sm",
    "transition-colors duration-150",
  ].join(" "),
  {
    variants: {
      /**
       * size — 입력 박스의 크기
       * height는 padding + line-height로 결정됩니다.
       * ring-inset 방식이므로 stroke가 height에 포함되지 않습니다.
       * typography(font-size, line-height)는 여기서 지정하고,
       * padding은 compoundVariants에서 처리합니다.
       */
      size: {
        // sm: text-sm(14px) + leading-sm(20px)
        // py-md(8px) * 2 + 20px = 36px 정확히 유지
        sm: "text-sm leading-sm",

        // md: text-base(16px) + leading-base(24px)
        // py-md-lg(10px) * 2 + 24px = 44px 정확히 유지
        md: "text-base leading-base",
      },

      /**
       * destructive — 에러/유효성 실패 상태
       * ring-inset 방식: box-shadow inset으로 테두리 표현
       * → stroke 두께 변경(1px↔2px)이 레이아웃에 영향 없음
       */
      destructive: {
        false: [
          "bg-bg-primary",
          // 기본: 1px inset ring + shadow-xs
          "ring-1 ring-inset ring-border shadow-xs",
          // 포커스: 2px inset ring + brand 색상 (shadow 제거)
          "focus-within:ring-2 focus-within:ring-border-brand focus-within:shadow-none",
        ].join(" "),
        true: [
          "bg-bg-primary",
          // 에러 기본: 1px inset ring + error-subtle 색상
          "ring-1 ring-inset ring-border-error-subtle",
          // 에러 포커스: 2px inset ring + error 색상
          "focus-within:ring-2 focus-within:ring-border-error",
        ].join(" "),
      },

      /**
       * disabled — 비활성화 상태
       * 포커스 효과를 덮어쓰기 위해 disabled variant가 마지막에 평가됩니다.
       */
      disabled: {
        true: [
          "bg-bg-disabled-subtle",
          "ring-1 ring-inset ring-border-disabled",
          "cursor-not-allowed",
          // 비활성화 시 포커스 ring 변화 없음
          "focus-within:ring-1 focus-within:ring-border-disabled focus-within:shadow-none",
        ].join(" "),
        false: "",
      },
    },

    /**
     * compoundVariants — 두 가지 이상 variant 조합 스타일
     *
     * 패딩 케이스:
     * - sm size: py-md(8px) px-lg(12px)
     * - md size: py-md-lg(10px) px-[14px]
     *
     * disabled 상태에서는 destructive 스타일이 덮어쓰이지 않도록
     * disabled variant가 마지막에 선언됩니다.
     */
    compoundVariants: [
      // sm 크기 패딩
      {
        size: "sm",
        className: "py-md px-lg",
      },
      // md 크기 패딩
      // px-[14px]: spacing 토큰에 14px 단계가 없으므로 arbitrary value 사용
      {
        size: "md",
        className: "py-md-lg px-[14px]",
      },
    ],

    defaultVariants: {
      size: "md",
      destructive: false,
      disabled: false,
    },
  }
);

// ─────────────────────────────────────────────
// Props 타입 정의
// ─────────────────────────────────────────────

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /**
   * 입력 필드 위에 표시되는 라벨 텍스트
   * htmlFor와 input id를 자동으로 연결하여 접근성을 보장합니다.
   */
  label?: string;

  /**
   * 필수 입력 표시 여부 (빨간 * 기호 표시)
   * HTML required 속성과는 별개로 시각적 표시만 담당합니다.
   * 실제 폼 유효성 검사는 native required prop을 함께 사용하세요.
   * 기본값: false
   */
  showRequired?: boolean;

  /**
   * 입력 필드 아래에 표시되는 힌트 또는 에러 메시지
   * destructive=true일 때는 에러 색상(text-text-error-primary)으로 표시됩니다.
   * 그 외에는 보조 텍스트 색상(text-text-tertiary)으로 표시됩니다.
   */
  hint?: string;

  /**
   * 에러/유효성 실패 상태 여부
   * true로 설정하면:
   * - 테두리가 에러 색상으로 변경됩니다
   * - 우측에 AlertCircle 아이콘이 나타납니다
   * - hint 텍스트가 에러 색상으로 표시됩니다
   * - aria-invalid 속성이 추가됩니다
   * 기본값: false
   */
  destructive?: boolean;

  /**
   * 입력 필드의 크기
   * - sm: 더 작은 폼이나 밀집된 UI에 사용 (텍스트 14px)
   * - md: 일반적인 폼 입력에 사용 (텍스트 16px, 기본값)
   */
  size?: "sm" | "md";

  /**
   * 입력 필드 좌측에 표시할 아이콘
   * lucide-react에서 import한 아이콘 컴포넌트를 전달합니다.
   * 예) import { Search } from "lucide-react"
   */
  leadingIcon?: LucideIcon;

  /**
   * DOM ref — React 19에서는 forwardRef 없이 일반 prop으로 사용
   * <input> 요소에 직접 접근이 필요할 때 사용합니다.
   */
  ref?: Ref<HTMLInputElement>;
}

// ─────────────────────────────────────────────
// 컴포넌트 구현 (React 19 — forwardRef 불필요)
// ─────────────────────────────────────────────

/**
 * 디자인 시스템 Input 컴포넌트
 *
 * 텍스트 입력 필드로, 라벨·힌트·에러 상태·아이콘을 포함한
 * 완전한 폼 입력 UI를 제공합니다.
 * WCAG 2.1 AA 접근성 기준을 준수합니다.
 */
export function Input({
  label,
  showRequired = false,
  hint,
  destructive = false,
  size = "md",
  leadingIcon: LeadingIcon,
  disabled,
  className,
  id: externalId,
  ref,
  ...props
}: InputProps) {
  // React의 useId()를 사용하여 고유한 ID를 자동 생성합니다.
  // 외부에서 id prop이 전달된 경우 그것을 우선 사용합니다.
  // label의 htmlFor와 input의 id를 같은 값으로 연결해 접근성을 확보합니다.
  const generatedId = useId();
  const inputId = externalId ?? generatedId;

  // 힌트 텍스트의 id — aria-describedby로 input과 연결합니다.
  // 스크린 리더가 input에 포커스할 때 hint 텍스트도 함께 읽어줍니다.
  const hintId = hint ? `${inputId}-hint` : undefined;

  return (
    // 외부 래퍼: 라벨 + 입력 박스 + 힌트를 세로로 배치합니다.
    // flex-col + gap-sm: 요소 사이 세로 간격 6px
    <div className={twMerge("flex flex-col gap-sm w-[320px]", className)}>

      {/* 라벨 영역 — label prop이 있을 때만 렌더링 */}
      {label && (
        <div className="flex items-center gap-xxs">
          {/*
           * <label> 요소: htmlFor와 input id를 연결하여
           * 라벨 클릭 시 input에 포커스가 가도록 합니다.
           * disabled 상태에서는 opacity-50으로 시각적으로 비활성화를 나타냅니다.
           */}
          <label
            htmlFor={inputId}
            className={twMerge(
              "text-sm leading-sm font-medium text-text-primary",
              disabled && "opacity-50"
            )}
          >
            {label}
          </label>

          {/* 필수 표시 * — showRequired=true일 때만 렌더링 */}
          {showRequired && (
            <span
              className="text-sm leading-sm text-fg-required"
              aria-hidden // 스크린 리더는 aria-required를 읽으므로 * 기호는 장식용
            >
              *
            </span>
          )}
        </div>
      )}

      {/* 입력 박스 래퍼 — 테두리·배경·그림자·포커스 스타일 담당 */}
      {/*
       * cva의 inputBoxVariants로 상태별 스타일을 적용합니다.
       * disabled prop이 boolean으로 변환되어야 하므로 !!disabled 사용합니다.
       */}
      <div
        className={inputBoxVariants({
          size,
          destructive,
          disabled: !!disabled,
        })}
      >
        {/* Leading 아이콘 — leadingIcon prop이 있을 때만 렌더링 */}
        {LeadingIcon && (
          <Icon
            icon={LeadingIcon}
            size={INPUT_LEADING_ICON_SIZE}
            // disabled 상태에서는 아이콘도 비활성화 색상으로 변경
            color={disabled ? "disabled" : "tertiary"}
            // 아이콘은 장식용이므로 스크린 리더가 읽지 않도록 처리
            aria-hidden
          />
        )}

        {/*
         * 실제 <input> 요소
         *
         * - flex-1 min-w-0: 가용 공간을 모두 차지하되 overflow 방지
         * - bg-transparent: 입력 박스 래퍼의 배경색을 그대로 사용
         * - outline-none: 브라우저 기본 포커스 링 제거 (래퍼에서 커스텀 처리)
         * - 색상: disabled면 text-disabled, 아니면 text-primary (placeholder는 CSS로 처리)
         */}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          // 에러 상태를 스크린 리더에 전달: aria-invalid="true"
          aria-invalid={destructive || undefined}
          // 힌트/에러 텍스트를 input과 프로그래밍적으로 연결
          aria-describedby={hintId}
          // 필수 입력 여부를 스크린 리더에 명시적으로 전달
          aria-required={showRequired || undefined}
          className={[
            // 공간 차지 및 기본 레이아웃
            "flex-1 min-w-0",
            // 배경 투명 — 래퍼의 배경색 사용
            "bg-transparent",
            // 브라우저 기본 포커스 아웃라인 제거
            "outline-none",
            // 자동완성 배경 제거 (브라우저 기본값 override)
            "autofill:shadow-[inset_0_0_0_1000px_var(--color-bg-primary)]",
            // 입력된 텍스트 색상
            disabled ? "text-text-disabled cursor-not-allowed" : "text-text-primary",
            // placeholder 텍스트 색상 — CSS 수정자 사용
            "placeholder:text-text-placeholder",
          ].join(" ")}
          {...props}
        />

        {/* Trailing error 아이콘 — destructive=true일 때만 렌더링 */}
        {/*
         * AlertCircle 아이콘으로 에러 상태를 시각적으로 표시합니다.
         * Figma 스펙: 16px (sm), error-primary 색상
         * aria-hidden: aria-invalid와 hint로 이미 에러를 전달하므로 장식용 처리
         */}
        {destructive && (
          <Icon
            icon={AlertCircle}
            size={INPUT_ERROR_ICON_SIZE}
            color="error-primary"
            aria-hidden
          />
        )}
      </div>

      {/* 힌트/에러 텍스트 — hint prop이 있을 때만 렌더링 */}
      {hint && (
        <p
          id={hintId}
          className={twMerge(
            "text-sm leading-sm",
            // 에러 상태: 에러 색상, 일반 상태: 3차 텍스트 색상
            destructive ? "text-text-error-primary" : "text-text-tertiary"
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}
