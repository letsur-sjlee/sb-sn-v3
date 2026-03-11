/**
 * 라이브러리 진입점 (index.ts)
 *
 * 이 파일은 라이브러리에서 외부로 공개(export)할 컴포넌트와 유틸리티를 모아두는 곳입니다.
 * 새 컴포넌트를 추가할 때마다 반드시 이 파일에 export 구문을 추가해야 합니다.
 *
 * [컴포넌트 추가 예시]
 * export { Button, type ButtonProps } from "./components/Button";
 * export { Input, type InputProps } from "./components/Input";
 */

// 컴포넌트 추가 시 여기에 export 구문을 추가합니다.
export { Icon, type IconProps } from "./components/Icon";
export { Button, type ButtonProps } from "./components/Button";
export { Input, type InputProps } from "./components/Input";
export { Avatar, type AvatarProps } from "./components/Avatar";
export { Checkbox, type CheckboxProps } from "./components/Checkbox";
export {
  HeaderNavigation,
  type HeaderNavigationProps,
  Logomark,
  type LogomarkProps,
} from "./components/HeaderNavigation";
