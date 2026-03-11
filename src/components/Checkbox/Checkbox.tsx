/**
 * Checkbox 컴포넌트
 *
 * 선택(checked), 부분 선택(indeterminate), 비활성화(disabled) 상태를 지원하는
 * 커스텀 체크박스입니다. 네이티브 <input type="checkbox">를 sr-only로 감추고
 * 시각적 박스를 렌더링하며, 접근성은 네이티브 input이 담당합니다.
 *
 * ## 크기 2종 (Figma 스펙)
 * - sm : 16×16px
 * - md : 20×20px — 기본값
 *
 * ## 상태
 * - 기본(unchecked) / 체크됨(checked) / 부분 선택(indeterminate) / 비활성화(disabled)
 *
 * ## 색상 토큰
 * - 기본/호버 테두리: border-border (gray-300, unchecked/checked hover 색상 변화 없음)
 * - 체크됨/indeterminate 배경: bg-bg-primary-solid (#111)
 * - indeterminate hover: bg-bg-secondary-solid (#6e6e6e) — Figma 스펙
 * - 비활성화 배경: bg-bg-disabled-subtle (#f5f5f5)
 * - 포커스 링: ring-ring-gray (#6e6e6e), 2px, gap 없음
 * - 아이콘: fg-white (활성) / fg-disabled (비활성화 active)
 * - 텍스트: text-text-primary (레이블), text-text-tertiary (힌트) — disabled 시 변화 없음
 *
 * ## 주의: border vs ring-inset
 * 시각적 테두리에 ring-inset 대신 border를 사용합니다.
 * ring-inset은 --tw-ring-inset CSS 변수를 설정하여 포커스 링(outset)과
 * 충돌하기 때문입니다.
 *
 * @example
 * <Checkbox size="md" label="Remember me" hint="Save my login details for next time." />
 * <Checkbox checked onChange={(e) => console.log(e.target.checked)} />
 * <Checkbox indeterminate />
 */
import { useId, useEffect, useState, useRef } from "react";
import type { Ref } from "react";
import { Check, Minus } from "lucide-react";
import { twMerge } from "tailwind-merge";

// ─────────────────────────────────────────────
// Props 타입 정의
// ─────────────────────────────────────────────

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /**
   * 체크박스 크기
   * sm(16px) | md(20px) — 기본값: md
   */
  size?: "sm" | "md";

  /**
   * 부분 선택 상태 (트리 선택 등에서 사용)
   * HTML attribute로 설정 불가하므로 JS로 직접 el.indeterminate를 제어합니다.
   */
  indeterminate?: boolean;

  /** 레이블 텍스트 */
  label?: string;

  /** 레이블 아래에 표시할 힌트 텍스트 */
  hint?: string;

  /** 외부에서 추가로 적용할 CSS 클래스 (label 래퍼에 적용) */
  className?: string;

  /** DOM ref — React 19에서는 forwardRef 없이 일반 prop으로 사용 */
  ref?: Ref<HTMLInputElement>;
}

// ─────────────────────────────────────────────
// 내부 상수
// ─────────────────────────────────────────────

/** 크기별 시각 박스 클래스 */
const BOX_SIZE = {
  sm: "size-4",  // 16px
  md: "size-5",  // 20px
} as const;

/**
 * 크기별 border-radius
 * SM: spacing-xs (4px) / MD: spacing-sm (6px) — Figma 스펙
 */
const BOX_RADIUS = {
  sm: "rounded-xs", // 4px
  md: "rounded-sm", // 6px
} as const;

/** 크기별 내부 아이콘 클래스 */
const ICON_SIZE = {
  sm: "size-2.5", // 10px
  md: "size-3",   // 12px
} as const;

// ─────────────────────────────────────────────
// 컴포넌트 구현
// ─────────────────────────────────────────────

/**
 * 디자인 시스템 Checkbox 컴포넌트
 *
 * - 제어(controlled) / 비제어(uncontrolled) 모드 모두 지원
 * - indeterminate는 checked와 독립적으로 동작
 * - label/hint가 없으면 시각 박스만 렌더링
 */
export function Checkbox({
  size = "md",
  checked: controlledChecked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  label,
  hint,
  id: externalId,
  className,
  ref,
  onChange,
  ...props
}: CheckboxProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;

  // ── 제어 / 비제어 상태 관리 ───────────────────
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(!!defaultChecked);
  const isChecked = isControlled ? !!controlledChecked : internalChecked;

  // ── indeterminate DOM 동기화 ──────────────────
  // indeterminate은 HTML attribute 없음 — JS로 직접 el.indeterminate 설정
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e);
  };

  // ── 시각 상태 계산 ────────────────────────────
  const isActive = isChecked || indeterminate; // 박스가 어두운 상태
  const showCheck = isChecked && !indeterminate;
  const showMinus = indeterminate;

  // 아이콘 색상: 비활성화 시 fg-disabled, 활성 시 fg-white
  const iconColorClass = disabled ? "text-fg-disabled" : "text-fg-white";

  // ── 시각 박스 클래스 ──────────────────────────
  const boxClass = twMerge(
    // 레이아웃 기본
    "relative shrink-0 inline-flex items-center justify-center",
    "transition-colors duration-150",
    // 크기 + 크기별 border-radius (sm: 4px / md: 6px)
    BOX_SIZE[size],
    BOX_RADIUS[size],

    // 기본 상태 (unchecked + non-disabled)
    // Figma: unchecked/checked hover 모두 색상 변화 없음
    !disabled && !isActive && "bg-bg-primary border border-border",

    // 활성 상태 (checked or indeterminate + non-disabled)
    // Figma: background/primary-solid = #111
    // border-transparent: box-sizing 치수 유지 (border-0 쓰면 1px 내부 치수 변동)
    !disabled && isActive && "bg-bg-primary-solid border border-transparent",

    // indeterminate hover: bg/secondary-solid (#6e6e6e) — Figma 스펙
    // checked hover는 변화 없음 (group-hover 미적용)
    indeterminate && !disabled && "group-hover:bg-bg-secondary-solid",

    // 비활성화 unchecked
    disabled && !isActive && "bg-bg-disabled-subtle border border-border-disabled cursor-not-allowed",

    // 비활성화 active (checked or indeterminate)
    disabled && isActive && "bg-bg-disabled-subtle border border-border-disabled cursor-not-allowed",

    // 포커스 링 — peer(input)의 :focus-visible 상태 반영
    // ring-2 ring-transparent: 항상 2px ring을 예약해 focus 전환 시 크기 변화 없음
    // peer-focus-visible:ring-ring-gray: 포커스 시 색상만 변경 (Figma: #6e6e6e, gap 없음)
    "ring-2 ring-transparent peer-focus-visible:ring-ring-gray",
  );

  return (
    <label
      htmlFor={id}
      className={twMerge(
        // group: indeterminate hover 시 group-hover:bg-bg-secondary-solid 트리거용
        "inline-flex items-start gap-md group",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {/*
       * 접근성용 네이티브 input
       * sr-only: 시각적으로 숨기되 스크린리더·키보드 접근 유지
       * peer: 형제 요소에서 peer-* 클래스로 상태 감지
       */}
      <input
        ref={(el) => {
          inputRef.current = el;
          if (el) el.indeterminate = indeterminate;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
        }}
        id={id}
        type="checkbox"
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
        className="peer sr-only"
        {...props}
      />

      {/* 시각적 체크박스 박스 */}
      <div aria-hidden className={boxClass}>
        {showCheck && (
          <Check
            aria-hidden
            className={twMerge("stroke-[2.5]", ICON_SIZE[size], iconColorClass)}
          />
        )}
        {showMinus && (
          <Minus
            aria-hidden
            className={twMerge("stroke-[2.5]", ICON_SIZE[size], iconColorClass)}
          />
        )}
      </div>

      {/* 레이블 + 힌트 텍스트 — label 또는 hint가 있을 때만 렌더링 */}
      {(label || hint) && (
        <div className="flex flex-col gap-xxs">
          {label && (
            <span
              className={twMerge(
                // Figma 스펙: font-weight regular(400) — medium(500) 아님
                size === "sm" ? "text-sm leading-sm" : "text-base leading-base",
                // Figma 스펙: disabled 시에도 텍스트 색상 변화 없음
                "text-text-primary",
              )}
            >
              {label}
            </span>
          )}
          {hint && (
            <span
              className={twMerge(
                // Figma 스펙: 힌트도 레이블과 동일한 크기 (sm→text-sm, md→text-base)
                // Figma 스펙: disabled 시에도 텍스트 색상 변화 없음
                size === "sm" ? "text-sm leading-sm" : "text-base leading-base",
                "text-text-tertiary",
              )}
            >
              {hint}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
