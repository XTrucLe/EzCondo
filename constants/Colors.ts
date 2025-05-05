/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
const tintColorLight = "#3674B5";
const tintColorDark = "#A1E3F9";

export const Colors = {
  light: {
    text: "#1A1A1A",
    background: "#F5F7FA", // 🌟 Nền tổng thể dịu nhẹ hơn
    cardBackground: "#FFFFFF",
    header: "#3674B5",
    surface: "#DCE3EA", // Thêm sắc xám trắng
    panelBackground: "#E9EFF5",
    panelBorder: "#C3CBD3",
    divider: "#BFC8D2",
    primary: "#3674B5", // Màu chính cho các nút và tiêu đề
    secondary: "#A1E3F9", // Màu phụ cho các nút và tiêu đề
    tertiary: "#F5F7FA", // Màu nền cho các thành phần

    tint: tintColorLight,
    icon: "#3674B5",

    tabIconDefault: "#9BAEC2", // 🔹 Màu INACTIVE dịu hơn
    tabIconSelected: tintColorLight,

    buttonPrimary: "#3674B5",
    buttonPrimaryText: "#FFFFFF",
    buttonSecondary: "#D1F8EF",
    buttonSecondaryText: "#1A1A1A",
    buttonDisabled: "#A1A1A1",

    inputBackground: "#FFFFFF",
    inputBorder: "#C3CBD3",
    inputPlaceholder: "#6D7C85",
    inputText: "#1A1A1A",

    success: "#2E7D32",
    warning: "#F9A825",
    error: "#D32F2F",
    info: "#0288D1",

    shadow: "rgba(0, 0, 0, 0.1)",
    hover: "#DCE3EA",
    badgeBackground: "#D32F2F",
    badgeText: "#FFFFFF",

    link: "#3674B5",
    linkHover: "#0056b3",

    // 🎨 Bottom Tab & Tab View
    bottomTabBackground: "#F5F7FA",
    bottomTabBorder: "#C3CBD3",
    bottomTabActive: tintColorLight,
    bottomTabInactive: "#9BAEC2",
    bottomTabActiveIcon: "#3674B5",

    tabViewBackground: "#FFFFFF",
    tabViewIndicator: tintColorLight,
    tabViewBorder: "#A1E3F9",
    tabViewInactive: "#9BAEC2",

    textPrimary: "#1A1A1A",
    textSecondary: "#6D7C85", // 🔹 Màu INACTIVE dịu hơn
    textTertiary: "#A1A1A1", // 🔹 Màu INACTIVE dịu hơn
  },

  dark: {
    text: "#ECEDEE",
    background: "#2A2E35", // 🌙 Dịu nhẹ với xám đậm
    header: "#3674B5",
    cardBackground: "#32373F",
    surface: "#3A4048",
    panelBackground: "#343A41",
    panelBorder: "#4A4F58",
    divider: "#4A6572",
    primary: "#A1E3F9", // Màu chính cho các nút và tiêu đề
    secondary: "#3674B5", // Màu phụ cho các nút và tiêu đề
    tertiary: "#2A2E35", // Màu nền cho các thành phần

    tint: tintColorDark,
    icon: "#A1E3F9",

    tabIconDefault: "#5B748C",
    tabIconSelected: tintColorDark,

    buttonPrimary: "#A1E3F9",
    buttonPrimaryText: "#1A1A1A",
    buttonSecondary: "#3674B5",
    buttonSecondaryText: "#ECEDEE",
    buttonDisabled: "#5B748C",

    inputBackground: "#3A4048",
    inputBorder: "#5B748C",
    inputPlaceholder: "#A1A1A1",
    inputText: "#ECEDEE",

    success: "#66BB6A",
    warning: "#FFA726",
    error: "#EF5350",
    info: "#42A5F5",

    shadow: "rgba(0, 0, 0, 0.2)",
    hover: "#3A4048",
    badgeBackground: "#D32F2F",
    badgeText: "#FFFFFF",

    link: "#A1E3F9",
    linkHover: "#3674B5",

    // 🎨 Bottom Tab & Tab View
    bottomTabBackground: "#2A2E35",
    bottomTabBorder: "#4A4F58",
    bottomTabActive: tintColorDark,
    bottomTabInactive: "#5B748C",
    bottomTabActiveIcon: "#A1E3F9",

    tabViewBackground: "#1E232A",
    tabViewIndicator: tintColorDark,
    tabViewBorder: "#A1E3F9",
    tabViewInactive: "#5B748C",

    textPrimary: "#ECEDEE",
    textSecondary: "#A1A1A1", // 🔹 Màu INACTIVE dịu hơn
    textTertiary: "#5B748C", // 🔹 Màu INACTIVE dịu hơn
  },
};
