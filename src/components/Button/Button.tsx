/**
 * Button 컴포넌트
 *
 * 사용자가 클릭하여 특정 동작을 실행하는 버튼입니다.
 * Figma 디자인 스펙을 기반으로 6가지 시각적 계층(hierarchy)과
 * 4가지 크기(size)를 지원하며, 좌우 아이콘 및 아이콘 단독 모드를 제공합니다.
 *
 * ## hierarchy (시각적 계층) 6종
 * - primary   : 브랜드 색상 배경 — 페이지에서 가장 중요한 행동에 사용
 * - secondary  : 흰색 배경 + 테두리 — 일반적인 보조 행동에 사용
 * - tertiary   : 투명 배경 — 강조가 필요 없는 보조 행동에 사용
 * - gray       : 진한 회색 배경 — 중립적이지만 시각적으로 강한 행동에 사용
 * - link-color : 브랜드 색상 텍스트 링크 스타일 — 인라인 링크 형태 버튼
 * - link-gray  : 회색 텍스트 링크 스타일 — 덜 강조된 인라인 링크 형태 버튼
 *
 * ## size 4종
 * - sm : height 36px
 * - md : height 40px (기본값)
 * - lg : height 44px
 * - xl : height 48px
 *
 * ## focused 상태 — hierarchy별 ring 색상 (Figma 스펙)
 * - primary   : ring-ring-hover (brand-600, #00ab7f)
 * - secondary : ring-ring       (brand-500, #00c781)
 * - tertiary  : ring-ring       (brand-500, #00c781)
 * - gray      : ring-ring-gray  (gray-500, #6e6e6e)
 * - link-color: ring-ring       (brand-500, #00c781)
 * - link-gray : ring-ring       (brand-500, #00c781)
 *
 * @example
 * // 기본 사용법
 * <Button hierarchy="primary">저장하기</Button>
 *
 * @example
 * // 아이콘 포함
 * <Button hierarchy="secondary" size="lg" leadingIcon={Plus}>항목 추가</Button>
 *
 * @example
 * // 아이콘 단독
 * <Button hierarchy="primary" size="md" iconOnly leadingIcon={Search} aria-label="검색" />
 */
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { type LucideIcon } from "lucide-react";
import { type Ref } from "react";
import { Icon } from "../Icon";

// ─────────────────────────────────────────────
// 버튼 내 아이콘 크기 — 모든 size에서 20px(md) 고정
// Figma 스펙: sm/md/lg/xl 모두 icon size = 20px
// ─────────────────────────────────────────────
const BUTTON_ICON_SIZE = "md" as const;

// ─────────────────────────────────────────────
// CVA variant 정의
// ─────────────────────────────────────────────

/**
 * buttonVariants
 *
 * cva(class-variance-authority)를 사용하여 버튼의 모든 시각적 변형을 체계적으로 관리합니다.
 * - base: 모든 variant에 공통 적용되는 스타일
 * - variants: hierarchy / size / iconOnly 세 가지 축으로 스타일 분리
 * - compoundVariants: 패딩은 size variant에 두지 않고, 케이스별로 명시적으로 지정
 *
 * [패딩 설계 원칙]
 * Tailwind v4에서 커스텀 spacing 토큰(--spacing-md-lg 등)으로 생성된 유틸리티 클래스는
 * CSS 파일 선언 순서에 따라 일반 py-0보다 나중에 위치할 수 있습니다.
 * 같은 specificity에서는 나중에 선언된 클래스가 이기므로, compoundVariants에서
 * py-0으로 override하더라도 py-md-lg가 남아 보일 수 있습니다.
 *
 * 이를 방지하기 위해 size variant에서 패딩을 완전히 제거하고,
 * compoundVariants에서 3가지 케이스별로 명시적으로 패딩을 부여합니다:
 *   1. 일반 버튼 (non-link + non-iconOnly): hierarchy별 x패딩 + size별 y패딩
 *   2. iconOnly 버튼: size별 정사각형 패딩
 *   3. link 계열: 패딩 0 + h-auto + rounded-xs
 */
const buttonVariants = cva(
  // ── base: 모든 버튼에 공통 적용 ──────────────────────────────────────────
  // inline-flex: 인라인이지만 flexbox 정렬 사용
  // items-center / justify-center: 텍스트·아이콘 세로/가로 중앙 정렬
  // gap: 아이콘과 텍스트 사이 간격 (xs = 4px)
  // font-medium: 중간 굵기 폰트 (Figma 스펙)
  // transition-colors: 호버·포커스 색상 전환 애니메이션
  // cursor-pointer: 클릭 가능한 커서
  // select-none: 텍스트 드래그 선택 방지
  // focus-visible: 키보드 포커스 링 (WCAG 2.1 AA 접근성)
  //   - ring 색상은 hierarchy별로 다르므로 각 hierarchy variant에서 개별 지정
  //   - Figma 스펙: box-shadow 0 0 0 2px <color> — offset 없이 테두리에 바로 붙음
  // disabled: 비활성화 상태 스타일 — native disabled 속성 활용
  [
    "inline-flex items-center justify-center",
    "gap-xs",
    "font-medium",
    "transition-colors duration-150",
    "cursor-pointer select-none",
    "whitespace-nowrap",
    // 키보드 포커스 링 base — ring 색상은 hierarchy variant에서 지정
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    // 비활성화 상태
    "disabled:cursor-not-allowed disabled:pointer-events-none",
  ].join(" "),
  {
    variants: {
      /**
       * hierarchy — 버튼의 시각적 계층 (6종)
       * 각 계층은 배경색, 테두리, 텍스트 색상, hover 상태, focused ring 색상을 독립적으로 정의합니다.
       */
      hierarchy: {
        // primary: 브랜드 배경 + 흰색 텍스트 — 가장 강조되는 행동
        // focused: ring-ring-hover (brand-600, #00ab7f) — Figma 스펙
        primary: [
          "bg-bg-brand",
          "text-fg-white",
          "border-transparent",
          "hover:bg-bg-brand-hover",
          "focus-visible:ring-ring-hover",
          // disabled: 배경을 비활성화 색상으로 변경
          "disabled:bg-bg-disabled",
          "disabled:text-text-disabled",
          "disabled:border-transparent",
        ].join(" "),

        // secondary: 흰색 배경 + 테두리 + 기본 텍스트 — 일반 보조 행동
        // focused: ring-ring (brand-500, #00c781) — Figma 스펙
        secondary: [
          "bg-bg-primary",
          "text-text-primary",
          "border border-border",
          "hover:bg-bg-primary-hover",
          "focus-visible:ring-ring",
          // disabled
          "disabled:bg-bg-disabled",
          "disabled:text-text-disabled",
          "disabled:border-border-disabled",
        ].join(" "),

        // tertiary: 투명 배경 + 기본 텍스트 — 약한 강조의 행동
        // focused: ring-ring (brand-500, #00c781) — Figma 스펙
        tertiary: [
          "bg-transparent",
          "text-text-primary",
          "border-transparent",
          "hover:bg-bg-primary-hover",
          "focus-visible:ring-ring",
          // disabled
          "disabled:bg-bg-disabled",
          "disabled:text-text-disabled",
          "disabled:border-transparent",
        ].join(" "),

        // gray: 진한 회색 배경 + 흰색 텍스트 — 중립적 강조
        // focused: ring-ring-gray (gray-500, #6e6e6e) — Figma 스펙
        // hover 시 더 진한 회색(gray-800, #1D2939)으로 변경
        gray: [
          "bg-bg-primary-solid",
          "text-fg-white",
          "border-transparent",
          // hover 시 gray-800(#1D2939) — @theme에 등록되지 않은 primitive 직접 참조 유지
          "hover:bg-[var(--color-colors-gray-800)]",
          "focus-visible:ring-ring-gray",
          // disabled
          "disabled:bg-bg-disabled",
          "disabled:text-text-disabled",
          "disabled:border-transparent",
        ].join(" "),

        // link-color: 브랜드 색상 텍스트 링크 스타일
        // focused: ring-ring (brand-500, #00c781) — Figma 스펙
        // hover 시 더 진한 링크 색상 + 밑줄
        "link-color": [
          "bg-transparent",
          "text-text-link",
          "border-transparent",
          "hover:text-text-link-hover",
          "hover:underline",
          "focus-visible:ring-ring",
          // disabled: 배경 없음, 텍스트만 비활성화 색상으로
          "disabled:bg-transparent",
          "disabled:text-text-disabled",
          "disabled:border-transparent",
          "disabled:no-underline",
        ].join(" "),

        // link-gray: 회색 텍스트 링크 스타일
        // focused: ring-ring (brand-500, #00c781) — Figma 스펙
        // hover 시 secondary-hover 색상 + 밑줄
        "link-gray": [
          "bg-transparent",
          "text-text-primary",
          "border-transparent",
          "hover:text-text-secondary-hover",
          "hover:underline",
          "focus-visible:ring-ring",
          // disabled: 배경 없음, 텍스트만 비활성화 색상으로
          "disabled:bg-transparent",
          "disabled:text-text-disabled",
          "disabled:border-transparent",
          "disabled:no-underline",
        ].join(" "),
      },

      /**
       * size — 버튼 크기 (4종)
       * height, border-radius, typography만 정의합니다.
       *
       * [중요] padding은 여기에 포함하지 않습니다.
       * Tailwind v4에서 커스텀 토큰 기반 클래스(py-md-lg 등)는 CSS 선언 순서상
       * 일반 py-0보다 나중에 위치할 수 있어, compoundVariants에서 py-0으로 override해도
       * 실제로는 커스텀 토큰 값이 남아있을 수 있습니다.
       * 이를 방지하기 위해 패딩은 모두 compoundVariants에서 케이스별로 명시합니다.
       */
      size: {
        // sm: height 36px, rounded-sm(6px), text-sm
        sm: [
          "h-9",
          "rounded-sm",
          "text-sm",
          "leading-sm",
        ].join(" "),

        // md: height 40px, rounded-sm(6px), text-sm
        md: [
          "h-10",
          "rounded-sm",
          "text-sm",
          "leading-sm",
        ].join(" "),

        // lg: height 44px, rounded-md(8px), text-base
        lg: [
          "h-11",
          "rounded-md",
          "text-base",
          "leading-base",
        ].join(" "),

        // xl: height 48px, rounded-md(8px), text-base
        xl: [
          "h-12",
          "rounded-md",
          "text-base",
          "leading-base",
        ].join(" "),
      },

      /**
       * iconOnly — 아이콘 단독 버튼 여부
       * true일 때 compoundVariants에서 정사각형 패딩이 적용됩니다.
       * false(기본값)일 때 compoundVariants에서 일반 좌우 패딩이 적용됩니다.
       */
      iconOnly: {
        true: "",   // 실제 패딩은 compoundVariants에서 처리
        false: "",
      },
    },

    /**
     * compoundVariants — 두 가지 이상의 variant 조합에 적용되는 스타일
     *
     * 패딩 부여 케이스:
     * 1. 일반 버튼 (iconOnly=false, non-link): size별 y패딩 + 고정 x패딩
     * 2. iconOnly 버튼: size별 정사각형 패딩
     * 3. link 계열: 패딩 완전 제거 + h-auto + rounded-xs
     *
     * [설계 의도]
     * size variant에서 패딩을 제거하고 compoundVariants에서 모든 패딩을 지정하는 이유:
     * Tailwind v4에서 CSS 선언 순서에 따라 커스텀 토큰 클래스가 일반 클래스보다
     * 나중에 선언될 수 있습니다. 이 경우 동일한 specificity에서는 나중 선언이 이기므로,
     * py-0이 py-md-lg를 제거하지 못하는 버그가 발생합니다.
     * compoundVariants에 패딩을 집중시키면 각 케이스에서 딱 필요한 패딩만 적용되어
     * 충돌이 원천적으로 발생하지 않습니다.
     */
    compoundVariants: [
      // ── 1. 일반 버튼 (iconOnly=false): non-link hierarchy + 각 size별 패딩 ────
      // Figma 스펙: sm py-md(8px) px-lg(12px) / md py-md-lg(10px) px-[14px]
      //             lg py-md-lg(10px) px-xl(16px) / xl py-lg(12px) px-[18px]

      // sm — py-md(8px), px-lg(12px)
      {
        iconOnly: false,
        hierarchy: ["primary", "secondary", "tertiary", "gray"],
        size: "sm",
        className: "py-md px-lg",
      },
      // md — py-md-lg(10px), px-[14px]
      // px-[14px]: spacing 토큰에 14px 단계가 없으므로 arbitrary value 유지
      {
        iconOnly: false,
        hierarchy: ["primary", "secondary", "tertiary", "gray"],
        size: "md",
        className: "py-md-lg px-[14px]",
      },
      // lg — py-md-lg(10px), px-xl(16px)
      {
        iconOnly: false,
        hierarchy: ["primary", "secondary", "tertiary", "gray"],
        size: "lg",
        className: "py-md-lg px-xl",
      },
      // xl — py-lg(12px), px-[18px]
      // px-[18px]: spacing 토큰에 18px 단계가 없으므로 arbitrary value 유지
      {
        iconOnly: false,
        hierarchy: ["primary", "secondary", "tertiary", "gray"],
        size: "xl",
        className: "py-lg px-[18px]",
      },

      // ── 2. iconOnly 버튼: size별 정사각형 패딩 ────────────────────────────
      // Figma 스펙: sm p-md(8px) / md p-md-lg(10px) / lg p-lg(12px) / xl p-[14px]

      // iconOnly sm: p-md (8px 사방)
      {
        iconOnly: true,
        size: "sm",
        className: "p-md",
      },
      // iconOnly md: p-md-lg (10px 사방)
      {
        iconOnly: true,
        size: "md",
        className: "p-md-lg",
      },
      // iconOnly lg: p-lg (12px 사방)
      {
        iconOnly: true,
        size: "lg",
        className: "p-lg",
      },
      // iconOnly xl: p-[14px] (14px 사방)
      // spacing 토큰에 14px 사방 단계가 없으므로 arbitrary value 유지
      {
        iconOnly: true,
        size: "xl",
        className: "p-[14px]",
      },

      // ── 3. link 계열: 패딩 완전 제거 + h-auto + rounded-xs ───────────────
      // Figma 스펙: link 버튼은 padding 없음 (height = text line-height만큼)
      // size variant의 h-9/h-10/h-11/h-12를 h-auto로 override
      // rounded-xs(4px): size variant의 rounded-sm/md를 link 전용 radius로 override

      // link-color 모든 size
      {
        hierarchy: "link-color",
        size: ["sm", "md", "lg", "xl"],
        className: "h-auto p-0 rounded-xs",
      },
      // link-gray 모든 size
      {
        hierarchy: "link-gray",
        size: ["sm", "md", "lg", "xl"],
        className: "h-auto p-0 rounded-xs",
      },
    ],

    defaultVariants: {
      hierarchy: "primary",
      size: "md",
      iconOnly: false,
    },
  }
);

// ─────────────────────────────────────────────
// Props 타입 정의
// ─────────────────────────────────────────────

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * 아이콘 단독 버튼 여부
   * true로 설정하면 텍스트를 숨기고 아이콘만 표시하며,
   * 정사각형 패딩이 적용됩니다.
   * 반드시 aria-label을 함께 지정해 접근성을 확보하세요.
   * 기본값: false
   */
  iconOnly?: boolean;
  /**
   * 버튼 왼쪽에 표시할 아이콘
   * lucide-react에서 import한 아이콘 컴포넌트를 그대로 전달합니다.
   * 예) import { Plus } from "lucide-react"
   */
  leadingIcon?: LucideIcon;
  /**
   * 버튼 오른쪽에 표시할 아이콘
   * iconOnly가 true일 때는 표시되지 않습니다.
   * 예) import { ChevronDown } from "lucide-react"
   */
  trailingIcon?: LucideIcon;
  /**
   * DOM ref — React 19에서는 forwardRef 없이 일반 prop으로 사용
   */
  ref?: Ref<HTMLButtonElement>;
}

// ─────────────────────────────────────────────
// 컴포넌트 구현 (React 19 — forwardRef 불필요)
// ─────────────────────────────────────────────

/**
 * 디자인 시스템 Button 컴포넌트
 *
 * 6가지 시각적 계층(hierarchy)과 4가지 크기(size)를 지원합니다.
 * 좌우 아이콘 및 아이콘 단독 모드를 지원하며,
 * 모든 variant에서 키보드 포커스 링(WCAG 2.1 AA)을 제공합니다.
 * hierarchy별로 Figma 스펙에 맞는 focus ring 색상이 적용됩니다.
 */
export function Button({
  hierarchy,
  size,
  iconOnly = false,
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  children,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      // twMerge: CVA가 생성한 클래스와 외부에서 전달된 className을 충돌 없이 병합
      className={twMerge(
        buttonVariants({ hierarchy, size, iconOnly }),
        className
      )}
      {...props}
    >
      {/* 좌측 아이콘 — leadingIcon이 있을 때만 렌더링 */}
      {LeadingIcon && (
        <Icon
          icon={LeadingIcon}
          size={BUTTON_ICON_SIZE}
          // 버튼 내 아이콘은 텍스트 색상을 상속받아 자동으로 맞춰집니다
          color="inherit"
          // 버튼 자체에 aria-label이 있으므로 아이콘은 장식용(aria-hidden)
          aria-hidden
        />
      )}

      {/* 버튼 텍스트 — iconOnly 모드일 때는 숨김 처리 */}
      {/* sr-only: 화면에서는 보이지 않지만 스크린 리더는 읽을 수 있습니다 */}
      {iconOnly ? (
        <span className="sr-only">{children}</span>
      ) : (
        children
      )}

      {/* 우측 아이콘 — trailingIcon이 있고 iconOnly가 아닐 때만 렌더링 */}
      {TrailingIcon && !iconOnly && (
        <Icon
          icon={TrailingIcon}
          size={BUTTON_ICON_SIZE}
          color="inherit"
          aria-hidden
        />
      )}
    </button>
  );
}
