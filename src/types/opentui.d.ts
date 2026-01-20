// OpenTUI JSX type declarations
// These extend the JSX namespace to include OpenTUI's custom elements

import type { ReactNode } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Layout & Display
      text: TextProps;
      box: BoxProps;
      scrollbox: ScrollBoxProps;
      "ascii-font": ASCIIFontProps;

      // Input elements
      input: InputProps;
      textarea: TextareaProps;
      select: SelectProps;
      "tab-select": TabSelectProps;

      // Code elements
      code: CodeProps;
      "line-number": LineNumberProps;
      diff: DiffProps;

      // Text modifiers (used inside <text>)
      span: SpanProps;
      strong: { children?: ReactNode };
      b: { children?: ReactNode };
      em: { children?: ReactNode };
      i: { children?: ReactNode };
      u: { children?: ReactNode };
      br: Record<string, never>;
      a: { href: string; children?: ReactNode };
    }
  }
}

interface BaseStyleProps {
  // Colors
  fg?: string;
  bg?: string;
  backgroundColor?: string;
  borderColor?: string;

  // Dimensions
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;

  // Flexbox
  flexDirection?: "row" | "column" | "row-reverse" | "column-reverse";
  justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  alignSelf?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number;

  // Spacing
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;

  // Position
  position?: "relative" | "absolute";
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  zIndex?: number;

  // Display
  display?: "flex" | "none";
  overflow?: "visible" | "hidden" | "scroll";
}

interface TextProps extends BaseStyleProps {
  content?: string;
  children?: ReactNode;
  selectable?: boolean;
}

interface SpanProps {
  fg?: string;
  bg?: string;
  children?: ReactNode;
}

interface BoxProps extends BaseStyleProps {
  children?: ReactNode;

  // Border - can be boolean or array of sides: ["top", "bottom", "left", "right"]
  border?: boolean | ("top" | "bottom" | "left" | "right")[];
  borderStyle?: "single" | "double" | "rounded" | "bold" | "ascii" | "none";
  title?: string;
  titleAlignment?: "left" | "center" | "right";
  focusedBorderColor?: string;

  // Events
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;

  // Key for React lists
  key?: string | number;
}

interface ScrollBoxProps extends BaseStyleProps {
  children?: ReactNode;
  focused?: boolean;
  style?: {
    rootOptions?: { backgroundColor?: string };
    wrapperOptions?: { backgroundColor?: string };
    viewportOptions?: { backgroundColor?: string };
    contentOptions?: { backgroundColor?: string };
    scrollbarOptions?: {
      showArrows?: boolean;
      trackOptions?: {
        foregroundColor?: string;
        backgroundColor?: string;
      };
    };
  };
}

interface ASCIIFontProps {
  text: string;
  font?: "tiny" | "block" | "slick" | "shade";
  color?: string;
}

interface InputProps extends BaseStyleProps {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  focused?: boolean;
  textColor?: string;
  cursorColor?: string;
  focusedBackgroundColor?: string;
  placeholderColor?: string;
}

interface TextareaProps extends BaseStyleProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  focused?: boolean;
  showLineNumbers?: boolean;
  wrapText?: boolean;
  readOnly?: boolean;
  tabSize?: number;
  language?: string;
}

interface SelectOption {
  name: string;
  description?: string;
  value?: unknown;
}

interface SelectProps extends BaseStyleProps {
  options: SelectOption[];
  onSelect?: (index: number, option: SelectOption) => void;
  onChange?: (index: number, option: SelectOption) => void;
  selectedIndex?: number;
  focused?: boolean;
  showScrollIndicator?: boolean;
  selectedBackgroundColor?: string;
  selectedTextColor?: string;
  highlightBackgroundColor?: string;
}

interface TabSelectProps extends BaseStyleProps {
  options: SelectOption[];
  onSelect?: (index: number, option: SelectOption) => void;
  onChange?: (index: number, option: SelectOption) => void;
  selectedIndex?: number;
  tabWidth?: number;
  focused?: boolean;
}

interface CodeProps extends BaseStyleProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
}

interface LineNumberProps extends BaseStyleProps {
  code: string;
  language?: string;
  startLine?: number;
  highlightedLines?: number[];
  diagnostics?: Array<{ line: number; severity: string; message: string }>;
}

interface DiffProps extends BaseStyleProps {
  oldCode: string;
  newCode: string;
  language?: string;
  mode?: "unified" | "split";
  showLineNumbers?: boolean;
}

interface MouseEvent {
  x: number;
  y: number;
}

export {};
