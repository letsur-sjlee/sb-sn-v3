/**
 * HeaderNavigation 컴포넌트 export
 *
 * 이 파일을 통해 HeaderNavigation과 관련 타입을 외부로 공개합니다.
 * 사용 측에서는 다음과 같이 import합니다:
 *
 * import { HeaderNavigation } from "@your-lib/components/HeaderNavigation";
 * // 또는 라이브러리 진입점에서
 * import { HeaderNavigation } from "@your-lib";
 */

// HeaderNavigation 컴포넌트와 Props 타입
export { HeaderNavigation, type HeaderNavigationProps } from "./HeaderNavigation";

// Logomark는 로고 커스터마이즈 시 재사용할 수 있도록 함께 export합니다.
export { Logomark, type LogomarkProps } from "./Logomark";
