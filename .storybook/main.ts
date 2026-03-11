import type { StorybookConfig } from "@storybook/react-vite";

/**
 * Storybook 10 설정 파일
 *
 * Storybook 10부터 addon-essentials(controls, actions, docs 등)가
 * 코어에 통합되어 별도 추가 없이 자동으로 활성화됩니다.
 * 접근성 검사를 위한 addon-a11y만 별도로 추가합니다.
 */
const config: StorybookConfig = {
  // 스토리 파일 탐색 경로 — src 하위의 모든 .stories.ts(x) 파일
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    // WCAG 2.1 AA 접근성 자동 검사 (Storybook 10에서도 별도 설치 필요)
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};

export default config;
