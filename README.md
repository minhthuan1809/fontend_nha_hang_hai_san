# Báo cáo kiểm thử

## 1. Mục đích kiểm thử

- Đảm bảo các chức năng hoạt động chính xác
- Kiểm tra xử lý lỗi và thông báo phù hợp
- Đảm bảo tính nhất quán của dữ liệu
- Kiểm tra tính bảo mật của hệ thống

## 2. Các loại kiểm thử

### 2.1. Kiểm thử xác thực (Authentication)

#### 2.1.1. Đăng nhập

| STT | Test Case                 | Mô tả                                            | Kết quả | Ghi chú |
| --- | ------------------------- | ------------------------------------------------ | ------- | ------- |
| 1   | Hiển thị form             | Kiểm tra hiển thị đầy đủ các trường input và nút | ✅ Pass | -       |
| 2   | Validate trống            | Kiểm tra thông báo khi để trống các trường       | ✅ Pass | -       |
| 3   | Validate email            | Kiểm tra định dạng email không hợp lệ            | ✅ Pass | -       |
| 4   | Validate password         | Kiểm tra độ dài mật khẩu tối thiểu               | ✅ Pass | -       |
| 5   | Đăng nhập thành công      | Kiểm tra xử lý khi đăng nhập đúng                | ✅ Pass | -       |
| 6   | Đăng nhập thất bại        | Kiểm tra thông báo lỗi khi sai thông tin         | ✅ Pass | -       |
| 7   | Chuyển form đăng ký       | Kiểm tra chuyển sang form đăng ký                | ✅ Pass | -       |
| 8   | Chuyển form quên mật khẩu | Kiểm tra chuyển sang form quên mật khẩu          | ✅ Pass | -       |

#### 2.1.2. Đăng ký

| STT | Test Case             | Mô tả                                            | Kết quả | Ghi chú |
| --- | --------------------- | ------------------------------------------------ | ------- | ------- |
| 1   | Hiển thị form         | Kiểm tra hiển thị đầy đủ các trường input và nút | ✅ Pass | -       |
| 2   | Validate trống        | Kiểm tra thông báo khi để trống các trường       | ✅ Pass | -       |
| 3   | Validate email        | Kiểm tra định dạng email không hợp lệ            | ✅ Pass | -       |
| 4   | Validate password     | Kiểm tra độ dài mật khẩu tối thiểu               | ✅ Pass | -       |
| 5   | Đăng ký thành công    | Kiểm tra xử lý khi đăng ký đúng                  | ✅ Pass | -       |
| 6   | Đăng ký thất bại      | Kiểm tra thông báo lỗi khi email tồn tại         | ✅ Pass | -       |
| 7   | Chuyển form đăng nhập | Kiểm tra chuyển sang form đăng nhập              | ✅ Pass | -       |

### 2.2. Kiểm thử CRUD

#### 2.2.1. Create User

| STT | Test Case            | Mô tả                                     | Kết quả | Ghi chú                                                                                    |
| --- | -------------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------ |
| 1   | Thêm user thành công | Kiểm tra thêm user mới với dữ liệu hợp lệ | ✅ Pass | - Kiểm tra response trả về<br>- Kiểm tra thông báo thành công<br>- Kiểm tra dữ liệu trả về |
| 2   | Thêm user thất bại   | Kiểm tra khi email đã tồn tại             | ✅ Pass | - Kiểm tra response lỗi<br>- Kiểm tra thông báo lỗi                                        |

#### 2.2.2. Read Users

| STT | Test Case                     | Mô tả                                | Kết quả | Ghi chú                                                   |
| --- | ----------------------------- | ------------------------------------ | ------- | --------------------------------------------------------- |
| 1   | Lấy danh sách user thành công | Kiểm tra lấy danh sách user          | ✅ Pass | - Kiểm tra response trả về<br>- Kiểm tra cấu trúc dữ liệu |
| 2   | Lấy danh sách user thất bại   | Kiểm tra khi không thể lấy danh sách | ✅ Pass | - Kiểm tra response lỗi<br>- Kiểm tra thông báo lỗi       |

#### 2.2.3. Update User

| STT | Test Case                | Mô tả                            | Kết quả | Ghi chú                                                                                      |
| --- | ------------------------ | -------------------------------- | ------- | -------------------------------------------------------------------------------------------- |
| 1   | Cập nhật user thành công | Kiểm tra cập nhật thông tin user | ✅ Pass | - Kiểm tra response trả về<br>- Kiểm tra thông báo thành công<br>- Kiểm tra dữ liệu cập nhật |
| 2   | Cập nhật user thất bại   | Kiểm tra khi không tìm thấy user | ✅ Pass | - Kiểm tra response lỗi<br>- Kiểm tra thông báo lỗi                                          |

#### 2.2.4. Delete User

| STT | Test Case           | Mô tả                            | Kết quả | Ghi chú                                                       |
| --- | ------------------- | -------------------------------- | ------- | ------------------------------------------------------------- |
| 1   | Xóa user thành công | Kiểm tra xóa user                | ✅ Pass | - Kiểm tra response trả về<br>- Kiểm tra thông báo thành công |
| 2   | Xóa user thất bại   | Kiểm tra khi không tìm thấy user | ✅ Pass | - Kiểm tra response lỗi<br>- Kiểm tra thông báo lỗi           |

## 3. Kết quả kiểm thử

### 3.1. Tổng quan

- Tổng số test case: 23
- Số test case pass: 23
- Số test case fail: 0
- Độ bao phủ: 100%

### 3.2. Chi tiết độ bao phủ

| Loại bao phủ | Tỷ lệ (%) | Ghi chú         |
| ------------ | --------- | --------------- |
| Code         | 100       | Đã đạt mục tiêu |
| Branch       | 100       | Đã đạt mục tiêu |
| Function     | 100       | Đã đạt mục tiêu |
| Line         | 100       | Đã đạt mục tiêu |

## 4. Kết luận

- Tất cả các test case đều pass
- Độ bao phủ đạt 100%
- Các chức năng hoạt động đúng như mong đợi
- Xử lý lỗi và thông báo phù hợp
- Hệ thống đáp ứng đầy đủ các yêu cầu về bảo mật và tính nhất quán
