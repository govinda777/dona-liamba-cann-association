from playwright.sync_api import sync_playwright
import os

def verify(page):
    print("Navigating...")
    page.goto("http://localhost:3000")
    print("Waiting for text...")
    page.wait_for_selector("text=Dona Liamba Cann Association", timeout=30000)
    print("Taking screenshot...")
    page.screenshot(path="verification/home.png")
    print("Screenshot saved.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()
