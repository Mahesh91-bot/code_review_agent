# Testing SAGE Memory Behavior

This guide demonstrates how to prove SAGE is **stateful** (memory-enhanced), not just a stateless one-shot reviewer.

## Goal

Show measurable improvement in review relevance after SAGE has learned from prior corrections.

---

## Test Design: Before vs After

### Phase A — Baseline (Before Memory)

1. Use a new team name (example: `Hackathon-Team-A`).
2. Submit each test snippet.
3. Record SAGE output:
   - Issues
   - Suggestions
   - Team notes
   - Score

### Phase B — Teach Through Corrections

For each test:
1. Submit a corrective feedback message where needed.
2. Explain the precise expected standard/rule.
3. Confirm correction is saved.

### Phase C — Re-run (After Memory)

1. Re-submit the same or equivalent snippets.
2. Compare outputs against baseline.
3. Verify memory-informed improvements:
   - More specific standards language
   - Fewer repeated weak suggestions
   - Better detection of previously corrected patterns

---

## 10 Python Test Cases

Use these snippets to evaluate recall quality and correction learning.

### 1) Mutable default argument
```python
def add_item(item, bucket=[]):
    bucket.append(item)
    return bucket
```

### 2) `eval()` code execution risk
```python
def run(expr):
    return eval(expr)
```

### 3) `subprocess` shell injection
```python
import subprocess
def ping(host):
    return subprocess.check_output(f"ping -c 1 {host}", shell=True)
```

### 4) Requests without timeout
```python
import requests
def fetch(url):
    return requests.get(url).json()
```

### 5) Broad `except Exception`
```python
def parse_int(s):
    try:
        return int(s)
    except Exception:
        return 0
```

### 6) Hardcoded secret
```python
API_KEY = "sk_live_super_secret_key"
```

### 7) SQL query string formatting
```python
def lookup(cursor, user_id):
    cursor.execute(f"SELECT * FROM users WHERE id = '{user_id}'")
```

### 8) Path traversal risk
```python
def read_file(base, name):
    with open(base + "/" + name, "r") as f:
        return f.read()
```

### 9) Insecure temporary file usage
```python
import tempfile
def write_temp(data):
    f = tempfile.NamedTemporaryFile(delete=False)
    f.write(data.encode())
    return f.name
```

### 10) Missing input validation in Flask endpoint
```python
from flask import Flask, request
app = Flask(__name__)

@app.post("/transfer")
def transfer():
    amount = request.json["amount"]
    account = request.json["account"]
    # no auth/validation checks
    return {"ok": True, "amount": amount, "account": account}
```

---

## Measurement Template

Track quality with a simple table:

| Test Case | Baseline Accuracy (1-5) | After-Memory Accuracy (1-5) | Improvement Notes |
|---|---:|---:|---|
| Mutable defaults |  |  |  |
| eval risk |  |  |  |
| ... |  |  |  |

Suggested scoring dimensions:
- Correctness of issue identification
- Specificity of remediation
- Team-style alignment
- Actionability

---

## What “Success” Looks Like

- SAGE references prior corrections in future feedback.
- The same mistake is caught faster and explained better over repeated submissions.
- Team notes become increasingly aligned with your expected coding standards.
- Score and suggestions are consistent with historical preferences for that team.

---

## Demo Script for Judges

1. “Here’s baseline output with no memory.”
2. “Now we submit correction feedback.”
3. “Now we re-run the same pattern.”
4. “Notice the model now applies our prior rule without re-teaching.”

This clearly demonstrates SAGE’s stateful RAG behavior. 🎯

