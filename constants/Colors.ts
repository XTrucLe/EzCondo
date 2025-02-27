/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#ffffff";

export const Colors = {
  light: {
    // 🌟 Màu nền chính & văn bản
    text: "#1A1A1A", // Văn bản chính
    background: "#F7FAFC", // Nền tổng thể
    cardBackground: "#FFFFFF", // Nền thẻ
    surface: "#E3EDF7", // Màu nền nhẹ nhàng cho modal, hộp thoại
    divider: "#E0E0E0", // Đường phân cách

    // 🎨 Màu chủ đạo & biểu tượng
    tint: tintColorLight, // Màu nhấn chính
    icon: "#3C637F", // Màu icon
    tabIconDefault: "#9BAEC2", // Màu tab chưa chọn
    tabIconSelected: tintColorLight, // Màu tab được chọn

    // 🟢 Button & trạng thái
    buttonPrimary: "#0a7ea4", // Màu nền nút chính
    buttonPrimaryText: "#FFFFFF", // Chữ trong nút chính
    buttonSecondary: "#E3EDF7", // Nút phụ
    buttonSecondaryText: "#1A1A1A", // Chữ trong nút phụ
    buttonDisabled: "#C3CBD3", // Nút bị vô hiệu hóa

    // 🖊️ Input & Form
    inputBackground: "#FFFFFF", // Nền input
    inputBorder: "#C3CBD3", // Viền input
    inputPlaceholder: "#6D7C85", // Màu placeholder
    inputText: "#1A1A1A", // Màu chữ nhập vào

    // ✅ Trạng thái & thông báo
    success: "#2E7D32", // Màu trạng thái thành công
    warning: "#F9A825", // Màu cảnh báo
    error: "#D32F2F", // Màu lỗi
    info: "#0288D1", // Màu thông báo

    // 🔳 Các hiệu ứng & phần tử khác
    shadow: "rgba(0, 0, 0, 0.1)", // Đổ bóng
    hover: "#DCE8F2", // Hiệu ứng hover
    badgeBackground: "#FF5252", // Nền badge
    badgeText: "#FFFFFF", // Chữ badge

    // 🌐 **MÀU CHO LINK**
    link: "#007BFF", // Màu xanh tươi sáng, dễ nhìn
    linkHover: "#0056b3", // Màu tối hơn khi hover
  },

  dark: {
    // 🌟 Màu nền chính & văn bản
    text: "#ECEDEE", // Văn bản chính
    background: "#E6F3FF", // Nền tổng thể
    cardBackground: "#22272E", // Nền thẻ
    surface: "#2E333A", // Màu nền modal, hộp thoại
    divider: "#37474F", // Đường phân cách

    // 🎨 Màu chủ đạo & biểu tượng
    tint: tintColorDark, // Màu nhấn chính
    icon: "#A1C4E0", // Màu icon
    tabIconDefault: "#5B748C", // Màu tab chưa chọn
    tabIconSelected: tintColorDark, // Màu tab được chọn

    // 🟢 Button & trạng thái
    buttonPrimary: "#5382B1", // Nút chính
    buttonPrimaryText: "#FFFFFF", // Chữ trong nút chính
    buttonSecondary: "#2C333A", // Nút phụ
    buttonSecondaryText: "#ECEDEE", // Chữ trong nút phụ
    buttonDisabled: "#5B748C", // Nút bị vô hiệu hóa

    // 🖊️ Input & Form
    inputBackground: "#2C333A", // Nền input
    inputBorder: "#5B748C", // Viền input
    inputPlaceholder: "#A1A1A1", // Màu placeholder
    inputText: "#ECEDEE", // Màu chữ nhập vào

    // ✅ Trạng thái & thông báo
    success: "#81C784", // Màu trạng thái thành công
    warning: "#FFCA28", // Màu cảnh báo
    error: "#FF6B6B", // Màu lỗi
    info: "#4FC3F7", // Màu thông báo

    // 🔳 Các hiệu ứng & phần tử khác
    shadow: "rgba(0, 0, 0, 0.2)", // Đổ bóng
    hover: "#37474F", // Hiệu ứng hover
    badgeBackground: "#D32F2F", // Nền badge
    badgeText: "#FFFFFF", // Chữ badge

    // 🌐 **MÀU CHO LINK**
    link: "#4DA8DA", // Màu xanh tối, dễ nhìn
    linkHover: "#007BFF", // Màu sáng hơn khi hover
  },
};
