from playwright.sync_api import sync_playwright

def verify_landing():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 1200})
        print("Navigating...")
        try:
            # Navigate to local server
            page.goto("http://localhost:3000", timeout=60000, wait_until="domcontentloaded")
            print("Navigation complete.")

            # Wait for a key element
            page.wait_for_selector("text=Dona Liamba", timeout=10000)
            print("Selector found.")

            # Additional wait for styles to settle
            page.wait_for_timeout(2000)

            # Take screenshot
            page.screenshot(path="verification/landing_page.png", full_page=True)
            print("Screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            # Try to take screenshot anyway if possible
            try:
                page.screenshot(path="verification/landing_error.png")
            except:
                pass
        finally:
            browser.close()

if __name__ == "__main__":
    verify_landing()
