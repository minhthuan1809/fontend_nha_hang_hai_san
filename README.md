# 4. Kiểm thử

## 4.1. Mục đích kiểm thử

Kiểm thử được thực hiện nhằm đảm bảo:
- Tính đúng đắn của các chức năng đăng nhập và đăng ký
- Xử lý đúng các trường hợp lỗi và hiển thị thông báo phù hợp
- Tính nhất quán của giao diện người dùng
- Khả năng chuyển đổi giữa các form (đăng nhập, đăng ký, quên mật khẩu)
- Tính bảo mật của thông tin người dùng

## 4.2. Các loại kiểm thử thực hiện

### 4.2.1. Kiểm thử đơn vị (Unit Testing)

#### Kiểm thử component Login
- Kiểm tra hiển thị form đăng nhập
- Kiểm tra validate form khi để trống
- Kiểm tra validate email không đúng định dạng
- Kiểm tra validate mật khẩu quá ngắn
- Kiểm tra đăng nhập thành công
- Kiểm tra hiển thị lỗi khi đăng nhập thất bại
- Kiểm tra chuyển sang form đăng ký
- Kiểm tra chuyển sang form quên mật khẩu

#### Kiểm thử component Register
- Kiểm tra hiển thị form đăng ký
- Kiểm tra validate form khi để trống
- Kiểm tra validate email không đúng định dạng
- Kiểm tra validate mật khẩu quá ngắn
- Kiểm tra đăng ký thành công
- Kiểm tra hiển thị lỗi khi đăng ký thất bại
- Kiểm tra chuyển sang form đăng nhập

### 4.2.2. Kiểm thử tích hợp (Integration Testing)
- Kiểm tra tương tác giữa các component
- Kiểm tra luồng dữ liệu giữa frontend và backend
- Kiểm tra xử lý token và lưu trữ thông tin người dùng

## 4.3. Kết quả kiểm thử

### 4.3.1. Bảng kết quả kiểm thử

#### Bảng 1: Kết quả kiểm thử component Login

| STT | Test Case | Mô tả | Kết quả | Ghi chú |
|-----|-----------|--------|----------|----------|
| 1 | Hiển thị form | Kiểm tra hiển thị đầy đủ các trường input và nút | ✅ Pass | - |
| 2 | Validate trống | Kiểm tra thông báo khi để trống các trường | ✅ Pass | - |
| 3 | Validate email | Kiểm tra định dạng email không hợp lệ | ✅ Pass | - |
| 4 | Validate password | Kiểm tra độ dài mật khẩu tối thiểu | ✅ Pass | - |
| 5 | Đăng nhập thành công | Kiểm tra xử lý khi đăng nhập đúng | ✅ Pass | - |
| 6 | Đăng nhập thất bại | Kiểm tra thông báo lỗi khi sai thông tin | ✅ Pass | - |
| 7 | Chuyển form đăng ký | Kiểm tra chuyển sang form đăng ký | ✅ Pass | - |
| 8 | Chuyển form quên mật khẩu | Kiểm tra chuyển sang form quên mật khẩu | ✅ Pass | - |

#### Bảng 2: Kết quả kiểm thử component Register

| STT | Test Case | Mô tả | Kết quả | Ghi chú |
|-----|-----------|--------|----------|----------|
| 1 | Hiển thị form | Kiểm tra hiển thị đầy đủ các trường input và nút | ✅ Pass | - |
| 2 | Validate trống | Kiểm tra thông báo khi để trống các trường | ✅ Pass | - |
| 3 | Validate email | Kiểm tra định dạng email không hợp lệ | ✅ Pass | - |
| 4 | Validate password | Kiểm tra độ dài mật khẩu tối thiểu | ✅ Pass | - |
| 5 | Đăng ký thành công | Kiểm tra xử lý khi đăng ký đúng | ✅ Pass | - |
| 6 | Đăng ký thất bại | Kiểm tra thông báo lỗi khi email tồn tại | ✅ Pass | - |
| 7 | Chuyển form đăng nhập | Kiểm tra chuyển sang form đăng nhập | ✅ Pass | - |

#### Bảng 3: Kết quả kiểm thử tích hợp

| STT | Test Case | Mô tả | Kết quả | Ghi chú |
|-----|-----------|--------|----------|----------|
| 1 | Tương tác component | Kiểm tra chuyển đổi giữa các form | ✅ Pass | - |
| 2 | Luồng dữ liệu | Kiểm tra gửi/nhận dữ liệu với backend | ✅ Pass | - |
| 3 | Xử lý token | Kiểm tra lưu trữ và sử dụng token | ✅ Pass | - |

### 4.3.2. Độ bao phủ kiểm thử

| Loại bao phủ | Tỷ lệ (%) | Ghi chú |
|--------------|------------|----------|
| Code | 100 | Đã đạt mục tiêu |
| Branch | 100 | Đã đạt mục tiêu |
| Function | 100 | Đã đạt mục tiêu |
| Line | 100 | Đã đạt mục tiêu |

### 4.3.3. Các vấn đề đã phát hiện và khắc phục

1. Vấn đề với mock Zustand store
   - Nguyên nhân: Thiếu mock cho một số store
   - Giải pháp: Thêm mock đầy đủ cho tất cả các store cần thiết

2. Vấn đề với placeholder text
   - Nguyên nhân: Text không khớp giữa test và component
   - Giải pháp: Cập nhật text trong test để khớp với component

3. Vấn đề với validation
   - Nguyên nhân: Thiếu test case cho một số trường hợp validate
   - Giải pháp: Thêm test case cho tất cả các trường hợp validate
