/**
 * HeaderNavigation 컴포넌트
 *
 * 서비스 최상단에 위치하는 전체 너비 헤더 바(header bar)입니다.
 * 좌측에 로고, 중앙/우측에 네비게이션 및 액션 영역을 배치합니다.
 *
 * ## 레이아웃 구조
 * - 전체 너비(`w-full`): 뷰포트를 꽉 채우는 컨테이너
 * - 내부 콘텐츠: 최대 너비 1440px, 좌우 패딩 `px-4xl`(32px)
 * - 높이: 50px 고정 (`h-[50px]`)
 * - 하단 테두리: `border-b border-border-secondary`
 * - 배경: `bg-bg-primary` (흰색)
 *
 * ## Slot 구조
 * - `logo`    : 좌측 로고 영역 (기본값: Logomark 24×24)
 * - `children`: 중앙·우측 네비게이션 영역 (선택)
 * - `rightSlot`: 우측 끝 액션 영역 (선택, 버튼·아바타 등)
 *
 * @example
 * // 기본 — 로고만 있는 상태
 * <HeaderNavigation />
 *
 * @example
 * // 네비게이션 링크 포함
 * <HeaderNavigation>
 *   <nav className="flex gap-lg">
 *     <a href="/">홈</a>
 *     <a href="/about">소개</a>
 *   </nav>
 * </HeaderNavigation>
 *
 * @example
 * // 우측 액션 영역 포함
 * <HeaderNavigation rightSlot={<Button hierarchy="primary" size="sm">로그인</Button>} />
 *
 * @example
 * // 로고 커스터마이즈
 * <HeaderNavigation logo={<img src="/my-logo.svg" alt="로고" className="h-6" />} />
 */
import { twMerge } from "tailwind-merge";
import { type Ref } from "react";
import { Logomark } from "./Logomark";

// ─────────────────────────────────────────────
// Props 타입 정의
// ─────────────────────────────────────────────

export interface HeaderNavigationProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * 헤더 좌측에 표시할 로고 영역
   * React 노드(컴포넌트, 이미지 등)를 자유롭게 전달할 수 있습니다.
   * 기본값: Logomark (24×24 인라인 SVG 컴포넌트)
   */
  logo?: React.ReactNode;
  /**
   * 헤더 우측 끝에 표시할 액션 영역
   * 로그인 버튼, 아바타, 아이콘 버튼 등을 배치할 때 사용합니다.
   * 전달하지 않으면 우측 영역이 렌더링되지 않습니다. (선택)
   */
  rightSlot?: React.ReactNode;
  /**
   * 로고와 rightSlot 사이의 중앙 영역
   * 네비게이션 링크, 탭, 검색창 등을 배치할 때 사용합니다.
   * 전달하지 않으면 중앙 영역이 빈 공간으로 남습니다. (선택)
   */
  children?: React.ReactNode;
  /**
   * 외부에서 추가 스타일을 적용할 때 사용합니다.
   * twMerge로 병합되므로 내부 클래스와 충돌을 걱정하지 않아도 됩니다.
   */
  className?: string;
  /**
   * DOM 요소에 직접 접근할 때 사용합니다.
   * React 19에서는 forwardRef 없이 일반 prop으로 전달합니다.
   */
  ref?: Ref<HTMLElement>;
}

// ─────────────────────────────────────────────
// 컴포넌트 구현 (React 19 — forwardRef 불필요)
// ─────────────────────────────────────────────

/**
 * 디자인 시스템 HeaderNavigation 컴포넌트
 *
 * Figma 스펙 기반으로 구현된 전체 너비 헤더 바입니다.
 * 로고, 네비게이션(children), 우측 액션(rightSlot) 세 슬롯으로 구성되어
 * 다양한 화면 레이아웃에 유연하게 확장할 수 있습니다.
 */
export function HeaderNavigation({
  logo,
  rightSlot,
  children,
  className,
  ref,
  ...props
}: HeaderNavigationProps) {
  return (
    // 외부 컨테이너: 전체 너비, 배경색, 하단 테두리
    // - w-full: 부모 너비를 100% 채워 뷰포트 전체에 걸침
    // - bg-bg-primary: 디자인 토큰 기반 흰색 배경
    // - border-b border-border-secondary: 하단 구분선 (연한 회색)
    <header
      ref={ref}
      className={twMerge(
        "w-full",
        "bg-bg-primary",
        "border-b border-border-secondary",
        className
      )}
      {...props}
    >
      {/* 내부 콘텐츠 컨테이너 */}
      {/* - max-w-[1440px]: 콘텐츠가 지나치게 넓어지지 않도록 최대 너비 제한 */}
      {/* - mx-auto: 좌우 마진 자동으로 가운데 정렬 */}
      {/* - h-[50px]: Figma 스펙 기반 고정 높이 50px */}
      {/* - px-4xl: 디자인 토큰 기반 좌우 패딩 32px */}
      {/* - flex items-center: 세로 방향 가운데 정렬 */}
      <div
        className={[
          "max-w-[1440px]",
          "mx-auto",
          "h-[50px]",
          "px-4xl",
          "flex items-center",
        ].join(" ")}
      >
        {/* 좌측: 로고 영역 */}
        {/* shrink-0: flex 컨테이너에서 로고가 줄어들지 않도록 고정 */}
        <div className="shrink-0">
          {/* logo prop이 없으면 기본 Logomark를 24×24 크기로 렌더링 */}
          {logo ?? (
            <Logomark
              // size: Figma 스펙 기준 24×24px
              width={24}
              height={24}
              // text-text-primary: 브랜드 컬러 또는 다크 모드 전환에 대응하기 위해
              // fill="currentColor"를 사용하며 부모의 텍스트 색상을 상속받습니다.
              className="text-text-primary"
              aria-label="Staix 로고"
            />
          )}
        </div>

        {/* 중앙: 네비게이션 영역 */}
        {/* flex-1: 남은 공간을 모두 차지하여 rightSlot을 끝으로 밀어냄 */}
        {/* children이 없을 때는 빈 공간으로 남아 레이아웃을 유지합니다 */}
        <div className="flex-1 flex items-center">
          {children}
        </div>

        {/* 우측: 액션 영역 (선택적) */}
        {/* shrink-0: 콘텐츠가 많아져도 우측 영역이 줄어들지 않도록 고정 */}
        {/* rightSlot이 없으면 아무것도 렌더링하지 않습니다 */}
        {rightSlot && (
          <div className="shrink-0 flex items-center">
            {rightSlot}
          </div>
        )}
      </div>
    </header>
  );
}
