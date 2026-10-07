# AI Failure Audit

## Overview

During the development of HW3, AI-generated code was reviewed and tested before being accepted. Three issues were identified during the review process.

---

## Defect 1: Countdown timer implementation required review

### Description

The AI-generated countdown code needed to be checked to ensure that it did not use cumulative time counting. The required implementation must calculate the remaining time from a fixed target time on every update.

### Detection

The issue was checked during manual code review by inspecting how the remaining time was calculated.

### Fix

The countdown was implemented using a fixed `targetTime` and recalculating the remaining time on every tick:

```javascript
const remaining = Math.max(0, targetTime - Date.now());
```

This avoids accumulating one-second increments and prevents timer drift.

---

## Defect 2: User input was not initially included in the DOM output

### Description

The initial form implementation displayed only a generic success message and did not display user-controlled input. Therefore, the XSS requirement could not be meaningfully tested because the user's input was not being rendered back into the DOM.

### Detection

The issue was detected during security review by checking whether user-controlled data was passed to the DOM.

### Fix

The form was updated to read the user's name and display it using `textContent`:

```javascript
const name = document.querySelector("#name").value.trim();

formMessage.textContent =
    `Hello, ${name}! Your form was submitted successfully.`;
```

Using `textContent` prevents the browser from interpreting the user's input as HTML or JavaScript.

---

## Defect 3: Potential double-submit during asynchronous submission

### Description

The form submission uses an asynchronous operation. Without a state check, a user could trigger another submission while the first submission was still being processed.

### Detection

The issue was detected during code review and browser testing by checking the form behavior while the state was `submitting`.

### Fix

A state guard was added before processing the submission:

```javascript
if (formState === "submitting") {
    return;
}
```

The submit button is also disabled while the form is submitting:

```javascript
submitButton.disabled = true;
```

This prevents additional submissions while the current submission is being processed.

---

