# TASK_DECOMPOSITION.md — Prompt AI cho Homework (HW1, HW2, HW3)

> Áp dụng cùng nguyên tắc: 1 prompt = 1 milestone/sub-task = 1 commit atomic.

---

## HW1: Production Portfolio (tối thiểu 4 commit)

### M1: WCAG 2.2 AA audit — contrast & landmarks
```
Tôi có file index.html và style.css của một trang portfolio (sẽ dán
nội dung bên dưới). Hãy rà soát và CHỈ chỉnh sửa những điểm vi phạm
WCAG 2.2 AA, cụ thể:
- Tỷ lệ tương phản màu chữ/nền phải >= 4.5:1 (đặc biệt với các biến
  CSS --text-primary, --bg-primary, --accent).
- Mọi landmark (header, nav, main, footer) phải có vai trò rõ ràng,
  không trùng lặp, không thiếu.
- Không được đổi cấu trúc HTML/JS không liên quan đến accessibility.
- Liệt kê ngắn gọn từng lỗi đã sửa và lý do.
[dán code hiện tại ở đây]
```
Commit: `git commit -m "fix(a11y): contrast & landmarks"`

### M2: Focus trap audit — keyboard navigation
```
Hãy kiểm tra đoạn JS/HTML sau (dán bên dưới) xem có "keyboard trap"
hay không — tức là người dùng dùng Tab có bị kẹt trong 1 phần tử,
không thể Tab tiếp hoặc Shift+Tab lùi lại được không. Yêu cầu:
- Đảm bảo toàn bộ phần tử tương tác (link, button, input) đều
  nhận được focus theo đúng thứ tự DOM.
- Nếu có <dialog> hoặc modal, đảm bảo focus được trả lại đúng chỗ
  khi đóng dialog.
- Chỉ sửa phần liên quan đến focus/keyboard, không đổi logic khác.
[dán code hiện tại ở đây]
```
Commit: `git commit -m "fix(nav): keyboard trap prevention"`

### M3: Strict CSP & loại bỏ inline handler
```
Hãy rà soát toàn bộ file HTML sau và loại bỏ mọi inline event handler
dạng onclick="...", onchange="...", v.v. Yêu cầu:
- Chuyển toàn bộ logic sự kiện sang addEventListener trong file JS
  riêng, dùng querySelector để lấy phần tử.
- Không dùng inline <script> hoặc inline style.
- Giữ nguyên hành vi chức năng, chỉ thay đổi cách gắn sự kiện.
[dán code hiện tại ở đây]
```
Commit: `git commit -m "fix(security): remove inline handlers for CSP"`

### M4: Lighthouse performance — tối ưu asset
```
Hãy rà soát các thẻ <img> và <link> trong file HTML sau, đề xuất và
áp dụng tối ưu để đạt điểm Lighthouse Performance cao hơn:
- Thêm width/height tường minh cho mọi <img> để tránh CLS.
- Thêm loading="lazy" và decoding="async" cho ảnh dưới fold.
- Dùng <picture> với source avif/webp cho ảnh hero nếu có.
- Không đổi nội dung hay cấu trúc landmark, chỉ tối ưu performance.
[dán code hiện tại ở đây]
```
Commit: `git commit -m "perf: optimize assets"`

---

## HW2: Drum Kit Engine (contract-first, 4 bước)

### Step 1: HTML contract (data-sound attribute)
```
Viết HTML cho một drum-kit gồm 6 pad (phím Q W E A S D), mỗi pad là
một <button class="drum-pad" data-key="q" data-sound="sounds/clap.wav">
hiển thị tên phím bên trong. KHÔNG viết CSS, KHÔNG viết JavaScript.
Chỉ định nghĩa contract dữ liệu qua thuộc tính data-key và data-sound,
đây sẽ là hợp đồng dữ liệu cho JS sau này.
```
Commit: `git commit -m "docs(spec): define data-sound contract"`

### Step 2: Audio playback engine (độc lập)
```
Viết hàm JavaScript playSound(key) nhận vào 1 ký tự, tìm phần tử
.drum-pad[data-key="..."] tương ứng bằng querySelector, nếu tìm thấy
thì phát âm thanh bằng `new Audio(pad.dataset.sound).play()` và thêm
class 'active' trong 100ms rồi tự xoá (dùng setTimeout). Hàm này CHƯA
cần gắn event listener bàn phím, chỉ viết phần phát âm thanh độc lập,
có thể test bằng cách gọi playSound('q') thủ công trong console.
```
Commit: `git commit -m "feat(js): implement decoupled audio engine logic"`

### Step 3: Keydown listener với throttling
```
Viết đoạn JS gắn window.addEventListener('keydown', ...) để gọi hàm
playSound(e.key) đã có sẵn (giả định đã tồn tại). Yêu cầu bắt buộc:
- Dùng event.repeat để chặn việc phát âm thanh lặp lại liên tục khi
  giữ phím (nếu e.repeat là true thì return ngay, không gọi playSound).
- Không viết lại hàm playSound, chỉ viết phần lắng nghe sự kiện.
```
Commit: `git commit -m "feat(js): bind keydown events with repeat throttling"`

### Step 4: FIFO Beat Recorder
```
Viết một object/class BeatRecorder bằng JS thuần, có các method:
- start(): bắt đầu ghi, lưu thời điểm bắt đầu bằng Date.now() hoặc
  performance.now().
- record(key): thêm vào một hàng đợi FIFO (mảng) một bản ghi gồm
  { key, timestamp } với timestamp là khoảng thời gian tính từ lúc
  start().
- stop(): dừng ghi, trả về toàn bộ mảng bản ghi.
- playback(): phát lại tuần tự các phím đã ghi đúng theo timestamp,
  dùng setTimeout cho mỗi bản ghi, gọi lại playSound(key) đã có sẵn.
Không cần UI, chỉ cần logic JS thuần, có thể export object này.
```
Commit: `git commit -m "feat(js): implement FIFO beat recorder"`

---

## HW3: Resilient Event Hub & AI Failure Audit

### Slice 1: Drift-Free Countdown Engine
```
Viết JS cho bộ đếm ngược (countdown) đến một thời điểm cho trước, yêu
cầu BẮT BUỘC để tránh "timer drift":
- Không dùng setInterval cộng dồn biến đếm thủ công (vì sẽ bị lệch
  dần theo thời gian).
- Tính thời gian còn lại bằng cách lấy targetTime - Date.now() (hoặc
  dùng chuẩn UTC ISO 8601) ở MỖI lần tick, không cộng dồn.
- Cập nhật DOM mỗi giây bằng requestAnimationFrame hoặc setInterval
  nhưng luôn tính lại từ mốc targetTime cố định.
Chỉ trả về đoạn JS cho phần đếm ngược này.
```
Commit: `git commit -m "feat(js): drift-free countdown engine"`

### Slice 2: State-Machine Form (Idle → Submitting → Success/Error)
```
Viết JS quản lý trạng thái cho 1 form liên hệ, dùng state machine đơn
giản với 4 trạng thái: 'idle', 'submitting', 'success', 'error'.
Yêu cầu:
- Khi submit form, chuyển trạng thái sang 'submitting', disable nút
  submit để tránh double-submit.
- Giả lập gọi API bằng fetch (hoặc Promise setTimeout nếu chưa có
  backend), khi thành công chuyển 'success', khi lỗi chuyển 'error'.
- Hiển thị UI tương ứng với từng trạng thái (ẩn/hiện message).
- Không viết lại phần countdown ở Slice 1.
```
Commit: `git commit -m "feat(js): state-machine form handling"`

### Slice 3: Double-submit prevention & input sanitization
```
Rà soát đoạn JS xử lý form sau (dán bên dưới), bổ sung:
- Chặn double-submit: nếu trạng thái đang là 'submitting' thì bỏ qua
  mọi lần submit tiếp theo cho đến khi về lại 'idle' hoặc kết thúc.
- Sanitize input trước khi hiển thị lại ra DOM: KHÔNG dùng innerHTML
  với dữ liệu người dùng nhập trực tiếp, dùng textContent hoặc escape
  ký tự đặc biệt để tránh XSS.
- Liệt kê ngắn gọn các lỗ hổng XSS tiềm ẩn bạn tìm thấy và cách đã sửa.
[dán code hiện tại ở đây]
```
Commit: `git commit -m "fix(security): prevent double-submit & sanitize input"`

### Báo cáo AI_FAILURE_AUDIT.md (bắt buộc, 15%)
Sau khi hoàn thành 3 slice trên, điền file `AI_FAILURE_AUDIT.md` theo
mẫu, mô tả **3 lỗi AI sinh ra** mà bạn phát hiện khi review (ví dụ:
timer dùng setInterval cộng dồn gây drift, dùng innerHTML gây XSS,
quên check e.repeat gây audio flood...). Mỗi lỗi gồm:
1. Mô tả lỗi
2. Cách phát hiện (git diff / DevTools breakpoint)
3. Cách bạn đã sửa (refactor)

Gợi ý prompt để nhờ AI tự rà soát lại code của chính nó, phục vụ việc
viết báo cáo:
```
Đây là đoạn code tôi đã nhờ AI sinh ra trước đó (dán bên dưới). Hãy
đóng vai một senior engineer review code, chỉ ra tối đa 3 vấn đề
nghiêm trọng nhất liên quan đến: timer drift, XSS/innerHTML, memory
leak (chưa clearInterval/removeEventListener), hoặc race condition.
Với mỗi vấn đề, giải thích ngắn gọn nguyên nhân và đề xuất cách sửa,
không cần viết lại toàn bộ code.
[dán code hiện tại ở đây]
```

---

## Lưu ý khi nộp bài
- Copy nguyên văn từng prompt ở trên (hoặc bản bạn đã chỉnh sửa) vào
  `TASK_DECOMPOSITION.md` của repo, kèm sub-task tương ứng.
- Mỗi prompt → 1 commit riêng, message theo đúng format `feat(...)`.
- Trước khi merge/nộp, tự đọc diff (`git diff`) để chắc AI không tự
  thêm thư viện ngoài (jQuery, Bootstrap...) — vi phạm project-rules.md.
- Chuẩn bị sẵn tinh thần cho phần "3-Minute Live Defense": thầy có thể
  đổi 1 chi tiết nhỏ (VD đổi `data-sound` thành `data-audio-src`) và
  yêu cầu bạn tự sửa code trong 60 giây — nên hiểu rõ code AI sinh ra,
  đừng chỉ copy-paste.
