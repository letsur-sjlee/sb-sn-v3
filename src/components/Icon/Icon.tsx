/**
 * Icon 컴포넌트
 *
 * lucide-react 아이콘을 디자인 시스템 토큰(size, color)과 연동하여
 * 일관된 방식으로 사용할 수 있게 해주는 래퍼 컴포넌트입니다.
 *
 * ## 사용법
 * ```tsx
 * import { Icon } from "@/components/Icon";
 * import { Search } from "lucide-react";
 *
 * <Icon icon={Search} size="md" color="primary" />
 * ```
 *
 * ## 크기 토큰 매핑
 * - xs  → --icon-size-xs  (12px)
 * - sm  → --icon-size-sm  (16px)
 * - md  → --icon-size-md  (20px) — 기본값
 * - lg  → --icon-size-lg  (24px)
 * - xl  → --icon-size-xl  (32px)
 * - 2xl → --icon-size-2xl (40px)
 */
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { type LucideIcon, type LucideProps } from "lucide-react";
import { type Ref } from "react";

// ─────────────────────────────────────────────
// CVA variant 정의
// ─────────────────────────────────────────────

const iconVariants = cva(
  // base: 인라인 블록 + 현재 컬러 상속
  "inline-flex shrink-0",
  {
    variants: {
      /**
       * 아이콘 크기 — --icon-size-* 토큰 기반
       * tailwind v4 @theme 블록에서 CSS 변수로 매핑합니다.
       */
      size: {
        xs: "[&>svg]:size-[var(--icon-size-xs)]",
        sm: "[&>svg]:size-[var(--icon-size-sm)]",
        md: "[&>svg]:size-[var(--icon-size-md)]",
        lg: "[&>svg]:size-[var(--icon-size-lg)]",
        xl: "[&>svg]:size-[var(--icon-size-xl)]",
        "2xl": "[&>svg]:size-[var(--icon-size-2xl)]",
      },
      /**
       * 아이콘 색상 — --color-fg-* Semantic 토큰 기반
       * text-* 유틸리티를 통해 currentColor로 SVG에 전달됩니다.
       */
      color: {
        inherit: "",
        primary: "text-[var(--color-fg-primary)]",
        secondary: "text-[var(--color-fg-secondary)]",
        tertiary: "text-[var(--color-fg-tertiary)]",
        quaternary: "text-[var(--color-fg-quaternary)]",
        white: "text-[var(--color-fg-white)]",
        disabled: "text-[var(--color-fg-disabled)]",
        "brand-primary": "text-[var(--color-fg-brand-primary)]",
        "brand-secondary": "text-[var(--color-fg-brand-secondary)]",
        "error-primary": "text-[var(--color-fg-error-primary)]",
        "error-secondary": "text-[var(--color-fg-error-secondary)]",
        "warning-primary": "text-[var(--color-fg-warning-primary)]",
        "warning-secondary": "text-[var(--color-fg-warning-secondary)]",
        "success-primary": "text-[var(--color-fg-success-primary)]",
        "success-secondary": "text-[var(--color-fg-success-secondary)]",
        link: "text-[var(--color-fg-link)]",
      },
    },
    defaultVariants: {
      size: "md",
      color: "inherit",
    },
  }
);

// ─────────────────────────────────────────────
// Props 타입 정의
// ─────────────────────────────────────────────

export interface IconProps
  extends Omit<LucideProps, "size" | "color" | "ref">,
    VariantProps<typeof iconVariants> {
  /** lucide-react 아이콘 컴포넌트 */
  icon: LucideIcon;
  /** 접근성 레이블 — 장식용 아이콘은 생략 가능 (aria-hidden 자동 설정) */
  label?: string;
  ref?: Ref<SVGSVGElement>;
}

// ─────────────────────────────────────────────
// 컴포넌트 구현 (React 19 — forwardRef 불필요)
// ─────────────────────────────────────────────

/**
 * lucide-react 아이콘을 디자인 시스템 토큰과 연동하는 래퍼 컴포넌트.
 *
 * @example
 * // 기본 사용
 * <Icon icon={Search} />
 *
 * @example
 * // 크기·색상 지정
 * <Icon icon={AlertCircle} size="lg" color="error-primary" />
 *
 * @example
 * // 접근성 레이블 (버튼 내 단독 아이콘 등)
 * <button aria-label="검색">
 *   <Icon icon={Search} label="검색" />
 * </button>
 */
export function Icon({
  icon: LucideIconComponent,
  size,
  color,
  label,
  className,
  ref,
  ...props
}: IconProps) {
  const isDecorative = !label;

  return (
    <span className={twMerge(iconVariants({ size, color }), className)}>
      <LucideIconComponent
        ref={ref}
        aria-hidden={isDecorative}
        aria-label={label}
        role={isDecorative ? undefined : "img"}
        {...props}
      />
    </span>
  );
}
