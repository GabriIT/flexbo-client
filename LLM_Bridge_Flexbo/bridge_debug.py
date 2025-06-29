# bridge_debug.py
import os
import time
import requests
from dotenv import load_dotenv

# ─── Load .env ────────────────────────────────────────────────────────────────
load_dotenv()  # reads .env in this directory

API_URL   = os.getenv("API_URL", "http://localhost:8080")
API_KEY   = os.getenv("API_KEY")
LLM_URL   = os.getenv("LLM_URL", "http://localhost:5001/ai")
POLL_SECS = int(os.getenv("POLL_SECS", "5"))

if not API_KEY:
    raise RuntimeError("Missing API_KEY in .env")

HEADERS = {
    "X-API-KEY": API_KEY,
    "Content-Type": "application/json",
}

def get_llm_response(prompt: str) -> str:
    print(f"[DEBUG] → Calling LLM at {LLM_URL} with prompt={prompt!r}", flush=True)
    resp = requests.post(LLM_URL, json={"Prompt": prompt})
    print(f"[DEBUG] ← LLM responded {resp.status_code}", flush=True)
    resp.raise_for_status()
    data = resp.json()
    print(f"[DEBUG] ← LLM JSON {data}", flush=True)
    return data.get("Response", "")

def main():
    print(f"[DEBUG] Bridge starting with API_URL={API_URL}, API_KEY={API_KEY!r}, LLM_URL={LLM_URL}, POLL_SECS={POLL_SECS}", flush=True)

    iteration = 0
    while True:
        iteration += 1
        print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] Poll #{iteration}: GET {API_URL}/thread/pending", flush=True)
        try:
            resp = requests.get(f"{API_URL}/thread/pending", headers=HEADERS)
            print(f"[DEBUG] ← pending responded {resp.status_code}", flush=True)
            resp.raise_for_status()
            threads = resp.json() or []
        except Exception as e:
            print(f"[ERROR] fetching pending threads: {e}", flush=True)
            time.sleep(POLL_SECS)
            continue

        if not threads:
            print(f"[{time.strftime('%H:%M:%S')}] No threads pending.", flush=True)
        else:
            print(f"[DEBUG] pending threads list: {threads}", flush=True)
            for t in threads:
                tid = t.get("id") or t.get("tid")
                print(f"[DEBUG] Processing thread id={tid}", flush=True)
                if not tid:
                    print("[WARN] no id or tid field on thread object", flush=True)
                    continue

                # Fetch messages
                url_msgs = f"{API_URL}/thread/{tid}/prompt/messages"
                print(f"[DEBUG] → GET {url_msgs}", flush=True)
                try:
                    mresp = requests.get(url_msgs, headers=HEADERS)
                    print(f"[DEBUG] ← messages responded {mresp.status_code}", flush=True)
                    mresp.raise_for_status()
                    payload = mresp.json()
                    messages = payload.get("messages", payload)
                except Exception as ex:
                    print(f"[ERROR] fetching messages for {tid}: {ex}", flush=True)
                    continue

                if not messages:
                    print(f"[{time.strftime('%H:%M:%S')}] Thread {tid} has no messages.", flush=True)
                    continue

                last = messages[-1]
                question = last.get("content")
                print(f"[DEBUG] Thread {tid} last message: {last}", flush=True)
                if not question:
                    print(f"[WARN] Thread {tid} last message has no content", flush=True)
                    continue

                print(f"[{time.strftime('%H:%M:%S')}] Thread {tid} Q → {question!r}", flush=True)

                # Ask LLM
                try:
                    answer = get_llm_response(question)
                except Exception as ex:
                    print(f"[ERROR] LLM call failed for {tid}: {ex}", flush=True)
                    continue

                # Post answer
                post_url = f"{API_URL}/thread/{tid}/prompt/answer"
                print(f"[DEBUG] → POST {post_url} with {{'content': {answer!r}}}", flush=True)
                try:
                    aresp = requests.post(post_url, headers=HEADERS, json={"content": answer})
                    print(f"[DEBUG] ← answer responded {aresp.status_code}", flush=True)
                    aresp.raise_for_status()
                    print(f"[{time.strftime('%H:%M:%S')}] Thread {tid} A → {answer!r} posted.", flush=True)
                except Exception as ex:
                    print(f"[ERROR] posting answer for {tid}: {ex}", flush=True)

        time.sleep(POLL_SECS)

if __name__ == "__main__":
    main()
