from playwright.sync_api import sync_playwright
import os

def verify(page):
    print("Navigating...")
    page.goto("http://localhost:3000")
    print("Waiting for text...")

    # Check for Hero Title
    page.wait_for_selector("text=Hub que conecta pacientes, médicos e associações", timeout=30000)
    print("Found Hero Title")

    # Check for Mission Section
    page.wait_for_selector("text=Nossa Missão", timeout=5000)
    print("Found Mission Section")

    # Check for Process Section
    page.wait_for_selector("text=Como funciona na prática", timeout=5000)
    print("Found Process Section")

    # Check for Target Audience Section
    page.wait_for_selector("text=Um espaço para todo o ecossistema", timeout=5000)
    print("Found Target Audience Section")

    # Check for Benefits Section (Checking distinct text)
    page.wait_for_selector("text=Segurança e Legalidade", timeout=5000)
    print("Found Benefits Section")

    # Check for CTA Section
    page.wait_for_selector("text=Pronto para organizar seu tratamento?", timeout=5000)
    print("Found CTA Section")

    print("Taking screenshot...")
    page.screenshot(path="verification/home_page_new.png", full_page=True)
    print("Screenshot saved to verification/home_page_new.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            verify(page)
        except Exception as e:
            print(f"Error: {e}")
            if "Timeout" in str(e):
                page.screenshot(path="verification/error_screenshot.png")
                print("Saved error screenshot.")
        finally:
            browser.close()
