#!/usr/bin/env python3
"""Fetch a TikTok photo post via the tikwm API using Chrome TLS impersonation.

tikwm's API returns HTTP 403 to the server's datacenter IP when called with a
plain Node/fetch TLS fingerprint; Chrome impersonation (curl_cffi) presents a
real browser fingerprint, which is the same technique yt-dlp uses with
--impersonate chrome. Prints the raw API response JSON to stdout.
Usage: tikwm_fetch.py <tiktok-photo-url>
Exit 0 on HTTP 200, 1 otherwise.
"""
import json
import sys
import urllib.parse

from curl_cffi import requests

page_url = sys.argv[1]
api_url = "https://www.tikwm.com/api/?url=" + urllib.parse.quote(page_url, safe="")

try:
    r = requests.get(
        api_url,
        impersonate="chrome",
        timeout=20,
        headers={"Accept": "application/json"},
    )
except Exception as e:  # noqa: BLE001 - any transport failure means "no data"
    print(json.dumps({"error": str(e)}))
    sys.exit(1)

sys.stdout.write(r.text)
sys.exit(0 if r.status_code == 200 else 1)
