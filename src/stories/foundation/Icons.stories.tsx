/**
 * Foundation / Icons
 *
 * lucide-react 아이콘 카탈로그 + Icon 컴포넌트 Playground.
 *
 * ## 스토리 구성
 * - Catalog   — 전체 아이콘 목록 (카테고리별 분류, 검색 가능)
 * - SizeScale — 6단계 사이즈 토큰 시각적 비교
 * - ColorScale — fg-* 컬러 토큰 시각적 비교
 * - Playground — Controls로 모든 prop 조작
 */
import type { Meta, StoryObj } from "@storybook/react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";
import { Icon } from "../../components/Icon";
import type { IconProps } from "../../components/Icon";

// ─────────────────────────────────────────────
// 아이콘 카탈로그 데이터 (카테고리별)
// ─────────────────────────────────────────────

const iconCatalog: Record<string, string[]> = {
  Navigation: [
    "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown",
    "ChevronLeft", "ChevronRight", "ChevronUp", "ChevronDown",
    "ChevronsLeft", "ChevronsRight", "ChevronsUpDown",
    "Home", "Menu", "MoreHorizontal", "MoreVertical",
    "MoveLeft", "MoveRight", "CornerDownLeft", "CornerUpRight",
  ],
  Actions: [
    "Plus", "Minus", "X", "Check", "Search",
    "Edit", "Edit2", "Edit3", "Pencil",
    "Trash", "Trash2", "Copy", "Clipboard",
    "Download", "Upload", "Share", "Share2",
    "Save", "RefreshCw", "RefreshCcw", "RotateCw",
    "Filter", "SortAsc", "SortDesc", "Sliders",
  ],
  Communication: [
    "Mail", "MailOpen", "Send", "MessageSquare", "MessageCircle",
    "Bell", "BellOff", "BellRing", "Phone", "PhoneCall",
    "Video", "VideoOff", "Mic", "MicOff",
    "AtSign", "Link", "Link2", "ExternalLink",
  ],
  Status: [
    "Info", "AlertCircle", "AlertTriangle", "AlertOctagon",
    "CheckCircle", "CheckCircle2", "XCircle", "HelpCircle",
    "Loader", "Loader2", "Clock", "Timer",
    "Eye", "EyeOff", "Lock", "LockOpen", "Unlock",
    "Shield", "ShieldCheck", "ShieldAlert", "ShieldX",
  ],
  Media: [
    "Image", "Images", "FileImage",
    "Play", "Pause", "Square", "SkipBack", "SkipForward",
    "Volume", "Volume1", "Volume2", "VolumeX",
    "Maximize", "Minimize", "Maximize2", "Minimize2",
    "ZoomIn", "ZoomOut",
  ],
  Files: [
    "File", "FileText", "FilePlus", "FileMinus", "FileX",
    "Folder", "FolderOpen", "FolderPlus", "FolderMinus",
    "Archive", "Package", "Paperclip", "Layers",
  ],
  User: [
    "User", "UserPlus", "UserMinus", "UserX", "UserCheck",
    "Users", "Contact", "Smile", "Frown", "Meh",
    "Crown", "Star", "Heart", "ThumbsUp", "ThumbsDown",
  ],
  Data: [
    "BarChart", "BarChart2", "BarChart3", "BarChart4",
    "LineChart", "PieChart", "TrendingUp", "TrendingDown",
    "Activity", "Database", "Server", "Cloud",
    "CloudUpload", "CloudDownload", "Wifi", "WifiOff",
  ],
  Settings: [
    "Settings", "Settings2", "SlidersHorizontal", "Wrench",
    "Tool", "Key", "KeyRound", "Terminal", "Code", "Code2",
    "Globe", "Map", "Compass", "Cpu",
  ],
  Commerce: [
    "ShoppingCart", "ShoppingBag", "Store", "Tag", "Tags",
    "CreditCard", "Wallet", "DollarSign", "Receipt",
    "Gift", "Package", "Truck", "Boxes",
  ],
};

// ─────────────────────────────────────────────
// 사이즈 토큰 데이터
// ─────────────────────────────────────────────

const sizeTokens: Array<{ name: IconProps["size"]; var: string; px: string }> = [
  { name: "xs",  var: "--icon-size-xs",  px: "12px" },
  { name: "sm",  var: "--icon-size-sm",  px: "16px" },
  { name: "md",  var: "--icon-size-md",  px: "20px" },
  { name: "lg",  var: "--icon-size-lg",  px: "24px" },
  { name: "xl",  var: "--icon-size-xl",  px: "32px" },
  { name: "2xl", var: "--icon-size-2xl", px: "40px" },
];

// ─────────────────────────────────────────────
// 컬러 토큰 데이터
// ─────────────────────────────────────────────

const colorTokens: Array<{ name: IconProps["color"]; var: string; description: string }> = [
  { name: "primary",          var: "--color-fg-primary",          description: "기본 아이콘" },
  { name: "secondary",        var: "--color-fg-secondary",        description: "보조 아이콘" },
  { name: "tertiary",         var: "--color-fg-tertiary",         description: "3차 아이콘" },
  { name: "quaternary",       var: "--color-fg-quaternary",       description: "4차 아이콘" },
  { name: "white",            var: "--color-fg-white",            description: "흰색 (어두운 배경)" },
  { name: "disabled",         var: "--color-fg-disabled",         description: "비활성" },
  { name: "brand-primary",    var: "--color-fg-brand-primary",    description: "브랜드 주색" },
  { name: "brand-secondary",  var: "--color-fg-brand-secondary",  description: "브랜드 보조" },
  { name: "error-primary",    var: "--color-fg-error-primary",    description: "오류 주색" },
  { name: "error-secondary",  var: "--color-fg-error-secondary",  description: "오류 보조" },
  { name: "warning-primary",  var: "--color-fg-warning-primary",  description: "경고 주색" },
  { name: "warning-secondary",var: "--color-fg-warning-secondary",description: "경고 보조" },
  { name: "success-primary",  var: "--color-fg-success-primary",  description: "성공 주색" },
  { name: "success-secondary",var: "--color-fg-success-secondary",description: "성공 보조" },
  { name: "link",             var: "--color-fg-link",             description: "링크" },
];

// ─────────────────────────────────────────────
// 공통 스타일 상수
// ─────────────────────────────────────────────

const badge: React.CSSProperties = {
  display: "inline-block",
  fontSize: "10px",
  fontWeight: 600,
  padding: "2px 6px",
  borderRadius: "4px",
  letterSpacing: "0.02em",
};

const sectionTitle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#999",
  marginBottom: 0,
  paddingBottom: 0,
};

// ─────────────────────────────────────────────
// Catalog Page
// ─────────────────────────────────────────────

function CatalogPage() {
  const [query, setQuery] = useState("");

  const filtered = Object.entries(iconCatalog).reduce<Record<string, string[]>>(
    (acc, [category, names]) => {
      const matched = names.filter((n) =>
        n.toLowerCase().includes(query.toLowerCase())
      );
      if (matched.length > 0) acc[category] = matched;
      return acc;
    },
    {}
  );

  const total = Object.values(filtered).reduce((sum, arr) => sum + arr.length, 0);

  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif", maxWidth: "1040px" }}>
      {/* 헤더 */}
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Icons</h1>
          <span style={{ ...badge, background: "#e8f5e9", color: "#2e7d32" }}>
            lucide-react
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: "0 0 16px" }}>
          디자인 시스템 아이콘 카탈로그. <code>Icon</code> 컴포넌트로 사용하며,{" "}
          <code>--icon-size-*</code> · <code>--color-fg-*</code> 토큰에 연동됩니다.
        </p>
        {/* 검색 */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="search"
            placeholder="아이콘 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              fontSize: "14px",
              width: "240px",
              outline: "none",
            }}
          />
          <span style={{ fontSize: "13px", color: "#999" }}>{total}개</span>
        </div>
      </div>

      {/* 카테고리별 아이콘 */}
      {Object.entries(filtered).map(([category, names]) => (
        <section key={category} style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <h3 style={sectionTitle}>{category}</h3>
            <span style={{ ...badge, background: "#f0f0f0", color: "#888" }}>
              {names.length}
            </span>
          </div>
          <div style={{ borderBottom: "1px solid #eee", marginBottom: "16px" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {names.map((name) => {
              const LucideIcon = (LucideIcons as Record<string, unknown>)[name] as
                | React.ComponentType<{ size: number; strokeWidth: number }>
                | undefined;
              if (!LucideIcon) return null;
              return (
                <div
                  key={name}
                  title={name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6px",
                    padding: "12px 8px",
                    borderRadius: "8px",
                    border: "1px solid #f0f0f0",
                    background: "#fafafa",
                    width: "80px",
                    cursor: "default",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "#f0f0f0";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "#fafafa";
                  }}
                >
                  <LucideIcon size={20} strokeWidth={1.5} />
                  <span
                    style={{
                      fontSize: "9px",
                      color: "#888",
                      textAlign: "center",
                      wordBreak: "break-all",
                      lineHeight: 1.3,
                    }}
                  >
                    {name}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// SizeScale Page
// ─────────────────────────────────────────────

function SizeScalePage() {
  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif", maxWidth: "640px" }}>
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Icon Size</h1>
          <span style={{ ...badge, background: "#e3f2fd", color: "#1565c0" }}>6 tokens</span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          <code>--icon-size-*</code> 토큰. xs(12px) → 2xl(40px) 6단계.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {sizeTokens.map(({ name, var: cssVar, px }) => (
          <div
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "12px 16px",
              borderRadius: "8px",
              border: "1px solid #f0f0f0",
              background: "#fafafa",
            }}
          >
            <Icon icon={LucideIcons.Star} size={name} color="primary" />
            <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1 }}>
              <code style={{ fontSize: "12px", fontWeight: 600, color: "#333" }}>
                size="{name}"
              </code>
              <code style={{ fontSize: "10px", color: "#999" }}>
                {cssVar} · {px}
              </code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// ColorScale Page
// ─────────────────────────────────────────────

function ColorScalePage() {
  return (
    <div style={{ padding: "32px", fontFamily: "system-ui, sans-serif", maxWidth: "720px" }}>
      <div style={{ marginBottom: "28px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 700, margin: 0 }}>Icon Color</h1>
          <span style={{ ...badge, background: "#e3f2fd", color: "#1565c0" }}>
            fg-* tokens
          </span>
        </div>
        <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
          아이콘은 <code>--color-fg-*</code> Semantic 토큰을 사용합니다. text-* 와 별도 체계.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "8px",
        }}
      >
        {colorTokens.map(({ name, var: cssVar, description }) => {
          const isDark = name === "white";
          return (
            <div
              key={name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid #f0f0f0",
                background: isDark ? "#1a1a1a" : "#fafafa",
              }}
            >
              <Icon icon={LucideIcons.Bell} size="lg" color={name} />
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <code style={{ fontSize: "12px", fontWeight: 600, color: isDark ? "#fff" : "#333" }}>
                  color="{name}"
                </code>
                <code style={{ fontSize: "10px", color: isDark ? "#aaa" : "#999" }}>
                  {cssVar}
                </code>
                <span style={{ fontSize: "10px", color: isDark ? "#888" : "#aaa" }}>
                  {description}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Playground — Controls 연동용 래퍼
// ─────────────────────────────────────────────

function PlaygroundIcon(props: Omit<IconProps, "icon"> & { iconName: string }) {
  const { iconName, ...rest } = props;
  const LucideIcon = (LucideIcons as Record<string, unknown>)[iconName] as
    | React.ComponentType<Record<string, unknown>>
    | undefined;
  if (!LucideIcon) return <span style={{ color: "red", fontSize: 12 }}>아이콘을 찾을 수 없음: {iconName}</span>;
  return <Icon icon={LucideIcon as Parameters<typeof Icon>[0]["icon"]} {...rest} />;
}

// ─────────────────────────────────────────────
// Meta & Stories
// ─────────────────────────────────────────────

const meta = {
  title: "Foundation/Icons",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj;

/** 전체 아이콘 카탈로그 (카테고리별 분류, 검색 지원) */
export const Catalog: Story = {
  render: () => <CatalogPage />,
};

/** --icon-size-* 토큰 6단계 시각적 비교 */
export const SizeScale: Story = {
  render: () => <SizeScalePage />,
};

/** --color-fg-* 토큰 컬러 시각적 비교 */
export const ColorScale: Story = {
  render: () => <ColorScalePage />,
};

/** Controls로 모든 prop을 자유롭게 조작 */
export const Playground: StoryObj<typeof PlaygroundIcon> = {
  render: (args) => <PlaygroundIcon {...args} />,
  args: {
    iconName: "Search",
    size: "md",
    color: "primary",
    strokeWidth: 1.5,
  },
  argTypes: {
    iconName: {
      control: "select",
      options: Object.values(iconCatalog).flat(),
      description: "lucide-react 아이콘 이름",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "--icon-size-* 토큰 기반 크기",
    },
    color: {
      control: "select",
      options: colorTokens.map((c) => c.name),
      description: "--color-fg-* 토큰 기반 색상",
    },
    strokeWidth: {
      control: { type: "range", min: 0.5, max: 3, step: 0.25 },
      description: "SVG 선 굵기 (lucide-react 기본값: 2)",
    },
  },
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "light",
    },
  },
};
