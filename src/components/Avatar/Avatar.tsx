/**
 * Avatar 컴포넌트
 *
 * 사용자를 시각적으로 표현하는 원형 아바타입니다.
 * User 플레이스홀더 아이콘을 표시합니다.
 *
 * ## 크기 6종 (Figma 스펙)
 * - xs : 24px (ring 0.5px)
 * - sm : 32px (ring 0.75px)
 * - md : 40px (ring 1px) — 기본값
 * - lg : 48px (ring 1px)
 * - xl : 56px (ring 1px)
 * - 2xl: 64px (ring 1px)
 *
 * ## 색상 토큰
 * - 배경: bg-tertiary (gray-100, #eeeeee)
 * - 테두리: ring-border-secondary (gray-200, #e1e1e1)
 * - 아이콘: fg-quaternary (gray-400, #bfbfbf) — Figma 스펙
 *
 * @example
 * <Avatar size="md" />
 * <Avatar size="xl" />
 */
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { User } from "lucide-react";
import { type Ref } from "react";
import { Icon } from "../Icon";

// ─────────────────────────────────────────────
// 아바타 크기별 아이콘 크기 매핑
// Figma 스펙: 아이콘이 아바타 내부에서 약 66~68% 비율을 차지
// ─────────────────────────────────────────────

type AvatarSize = NonNullable<VariantProps<typeof avatarVariants>["size"]>;

/**
 * 아바타 크기에 따른 내부 User 아이콘 size prop 매핑
 */
const AVATAR_ICON_SIZE = {
  xs:  "sm",   // 24px → 16px
  sm:  "md",   // 32px → 20px
  md:  "lg",   // 40px → 24px
  lg:  "lg",   // 48px → 24px
  xl:  "xl",   // 56px → 32px
  "2xl": "xl", // 64px → 32px
} as const satisfies Record<AvatarSize, "sm" | "md" | "lg" | "xl">;

// ─────────────────────────────────────────────
// CVA variant 정의
// ─────────────────────────────────────────────

/**
 * avatarVariants
 *
 * 크기별 width/height와 테두리를 관리합니다.
 *
 * [ring 방식 테두리]
 * ring은 box-shadow 기반이므로 size(width/height)에 영향을 주지 않습니다.
 * xs는 0.5px, sm은 0.75px의 얇은 테두리로 Figma 스펙을 정확히 반영합니다.
 */
const avatarVariants = cva(
  // ── base ──────────────────────────────────────────────────────────────────
  // rounded-full: 완전한 원형 (9999px)
  // overflow-hidden: 내용이 원형 밖으로 나오지 않도록
  // inline-flex / items-center / justify-center: 아이콘 중앙 정렬
  // shrink-0: flex 컨테이너 안에서 크기 유지
  // bg-bg-tertiary: Figma 스펙 배경색 (gray-100, #eeeeee)
  "relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 bg-bg-tertiary",
  {
    variants: {
      /**
       * size — 아바타 크기 (6종)
       * size-* 클래스: width + height 동시 적용
       * ring: box-shadow inset 방식 — 외부 치수 영향 없음
       * ring-border-secondary: gray-200 (#e1e1e1) 테두리
       */
      size: {
        xs:    "size-6  ring-[0.5px]  ring-border-secondary",
        sm:    "size-8  ring-[0.75px] ring-border-secondary",
        md:    "size-10 ring-1        ring-border-secondary",
        lg:    "size-12 ring-1        ring-border-secondary",
        xl:    "size-14 ring-1        ring-border-secondary",
        "2xl": "size-16 ring-1        ring-border-secondary",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

// ─────────────────────────────────────────────
// Props 타입 정의
// ─────────────────────────────────────────────

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof avatarVariants> {
  /**
   * 아바타 크기
   * xs(24px) | sm(32px) | md(40px) | lg(48px) | xl(56px) | 2xl(64px)
   * 기본값: md
   */
  size?: AvatarSize;

  /** 외부에서 추가로 적용할 CSS 클래스 */
  className?: string;

  /** DOM ref — React 19에서는 forwardRef 없이 일반 prop으로 사용 */
  ref?: Ref<HTMLDivElement>;
}

// ─────────────────────────────────────────────
// 컴포넌트 구현 (React 19 — forwardRef 불필요)
// ─────────────────────────────────────────────

/**
 * 디자인 시스템 Avatar 컴포넌트
 *
 * User 플레이스홀더 아이콘을 표시하는 원형 아바타입니다.
 * 6가지 크기를 지원하며, ring 방식 테두리로 치수 변화가 없습니다.
 */
export function Avatar({
  size = "md",
  className,
  ref,
  ...props
}: AvatarProps) {
  const resolvedSize = size ?? "md";
  const iconSize = AVATAR_ICON_SIZE[resolvedSize];

  return (
    <div
      ref={ref}
      className={twMerge(avatarVariants({ size }), className)}
      role="img"
      aria-label="사용자 아바타"
      {...props}
    >
      {/*
       * User 아이콘 — Figma 스펙 색상: fg-quaternary (gray-400, #bfbfbf)
       * bg-tertiary(#eeeeee) 배경 위에서 적절한 대비를 제공합니다.
       * aria-hidden: 부모 div에 role="img" + aria-label이 있으므로 장식용 처리
       */}
      <Icon
        icon={User}
        size={iconSize}
        color="quaternary"
        aria-hidden
      />
    </div>
  );
}
