/**
 * Logomark 컴포넌트
 *
 * Figma에서 추출한 Staix 로고마크(아이콘)를 인라인 SVG로 구현합니다.
 * fill="currentColor"를 사용하므로 부모 요소의 텍스트 색상을 상속받습니다.
 * 이를 통해 다크 모드나 색상 변경이 CSS만으로 가능합니다.
 *
 * [왜 인라인 SVG를 쓰는가?]
 * - `<img src="...">` 방식은 CSS로 색상 제어가 불가능합니다.
 * - 인라인 SVG + fill="currentColor"는 텍스트 색상 클래스(`text-*`)로
 *   아이콘 색상을 자유롭게 바꿀 수 있어 디자인 시스템 활용성이 높습니다.
 *
 * @example
 * // 기본 사용법 (24×24, 현재 텍스트 색상 상속)
 * <Logomark width={24} height={24} className="text-text-primary" />
 *
 * @example
 * // 브랜드 색상으로 변경
 * <Logomark width={32} height={32} className="text-fg-brand-primary" />
 */
import { type SVGProps } from "react";

/**
 * LogomarkProps — SVG 요소의 기본 속성을 모두 지원합니다.
 * width, height, className, aria-label 등을 자유롭게 전달할 수 있습니다.
 */
export type LogomarkProps = SVGProps<SVGSVGElement>;

/**
 * Staix Logomark 인라인 SVG 컴포넌트
 *
 * - viewBox="0 0 32 32": 원본 SVG 비율 유지
 * - fill="currentColor": 부모의 CSS color 값을 색상으로 상속
 * - aria-hidden 기본값은 없음 — 사용처에서 aria-label 또는 aria-hidden을 지정해야 합니다.
 */
export function Logomark({ className, ...props }: LogomarkProps) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      // fill="none"을 기본으로 두고, 각 path에 fill="currentColor" 적용
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      {/* 상단 직사각형 블록 */}
      <path d="M13.9 2H18.1V7.6H13.9V2Z" fill="currentColor" />
      {/* 우측 직사각형 블록 */}
      <path d="M30 13.9H24.4V18.1H30V13.9Z" fill="currentColor" />
      {/* 하단 직사각형 블록 */}
      <path d="M18.1 24.4H13.9V30H18.1V24.4Z" fill="currentColor" />
      {/* 좌측 직사각형 블록 */}
      <path d="M7.6 13.9H2V18.1H7.6V13.9Z" fill="currentColor" />
      {/* 우상단 꼭짓점 보조 패스 */}
      <path
        d="M25.2975 9.67021L25.3118 9.68458V9.65591L25.2975 9.67021Z"
        fill="currentColor"
      />
      {/* 중앙 X자 대각선 형태 패스 — 로고마크의 핵심 형태 */}
      <path
        d="M22.3298 6.68817L25.2975 9.67021L20.6523 14.3154C19.7348 15.233 19.7348 16.7383 20.6523 17.6559L25.3118 22.3154L22.3298 25.3118L17.6703 20.6523C16.7527 19.7348 15.2473 19.7348 14.3298 20.6523L9.67026 25.3118L6.68818 22.3154L11.3477 17.6702C12.2652 16.7527 12.2652 15.2473 11.3477 14.3297L6.68818 9.67025L9.68459 6.68817L14.3298 11.3477C15.2473 12.2652 16.7527 12.2652 17.6703 11.3477L22.3298 6.68817Z"
        fill="currentColor"
      />
    </svg>
  );
}
