from playwright.sync_api import Page, expect, sync_playwright
import os

def test_header_buttons(page: Page):
    # Test Homepage
    print("Testing Homepage...")
    try:
        page.goto("http://127.0.0.1:3000", timeout=60000)
    except Exception as e:
        print(f"Failed to navigate to Homepage: {e}")
        return

    entrar_btn = page.get_by_role("button", name="Entrar")
    try:
        expect(entrar_btn).to_be_visible(timeout=10000)
        print("Homepage: Entrar button is visible.")
    except Exception as e:
        print(f"Homepage: Entrar button not found or not visible: {e}")

    wallet_btn = page.get_by_role("button", name="Entrar com Wallet")
    try:
        expect(wallet_btn).not_to_be_visible(timeout=5000)
        print("Homepage: Entrar com Wallet button is correctly hidden.")
    except Exception as e:
        print(f"Homepage: Entrar com Wallet button is visible (Unexpected): {e}")

    page.screenshot(path="/home/jules/verification/homepage_verification.png")

    # Test Blog
    print("Testing Blog...")
    try:
        page.goto("http://127.0.0.1:3000/blog", timeout=60000)
    except Exception as e:
        print(f"Failed to navigate to Blog: {e}")
        return

    entrar_btn_blog = page.get_by_role("button", name="Entrar")
    try:
        expect(entrar_btn_blog).to_be_visible(timeout=10000)
        print("Blog: Entrar button is visible.")
    except Exception as e:
        print(f"Blog: Entrar button not found or not visible: {e}")

    wallet_btn_blog = page.get_by_role("button", name="Entrar com Wallet")
    try:
        expect(wallet_btn_blog).not_to_be_visible(timeout=5000)
        print("Blog: Entrar com Wallet button is correctly hidden.")
    except Exception as e:
        print(f"Blog: Entrar com Wallet button is visible (Unexpected): {e}")

    page.screenshot(path="/home/jules/verification/blog_verification.png")


if __name__ == "__main__":
    if not os.path.exists("/home/jules/verification"):
        os.makedirs("/home/jules/verification")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()
        try:
            test_header_buttons(page)
        except Exception as e:
            print(f"Test failed with unexpected error: {e}")
        finally:
            browser.close()
