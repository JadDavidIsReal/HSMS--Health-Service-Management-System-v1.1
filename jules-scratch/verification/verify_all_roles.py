import re
from playwright.sync_api import sync_playwright, Page, expect

def test_app_flows(page: Page):
    base_url = "http://localhost:5173"

    # --- Test 1: Sign-up and Profile Completion ---
    page.goto(f"{base_url}/login")
    page.get_by_role("button", name="Sign Up").click()

    page.get_by_label("Full Name").fill("Test Patient")
    page.get_by_label("Email").fill("test.patient@clinic.edu")
    page.get_by_label("Password").fill("password123")
    page.get_by_role("button", name="Sign Up").click()

    expect(page).to_have_url(f"{base_url}/complete-profile")
    page.screenshot(path="jules-scratch/verification/01_complete_profile_page.png")

    page.get_by_label("Height (cm)").fill("170")
    page.get_by_label("Blood Type").fill("A+")
    page.get_by_role("combobox").click()
    page.get_by_label("Male").click()
    page.get_by_label("Address").fill("123 Test St")
    page.get_by_label("Campus").fill("Test Campus")
    page.get_by_label("Department").fill("Testing")
    page.get_by_role("button", name="Save and Continue").click()

    expect(page).to_have_url(f"{base_url}/patient-landing")
    page.screenshot(path="jules-scratch/verification/02_patient_landing_page.png")
    page.get_by_role("button", name="Logout").click()

    # --- Test 2: Doctor's View ---
    page.goto(f"{base_url}/login")
    page.get_by_label("Email").fill("doctor@clinic.edu")
    page.get_by_label("Password").fill("doctor123")
    page.get_by_role("button", name="Sign In").click()

    expect(page).to_have_url(re.compile(r".*/dashboard"))

    # Check sidebar links
    expect(page.get_by_role("link", name="Nurses by Campus")).to_be_visible()
    expect(page.get_by_role("link", name="Search")).not_to_be_visible()
    expect(page.get_by_role("link", name="Prescriptions")).not_to_be_visible()

    page.get_by_role("link", name="Appointments").click()
    expect(page).to_have_url(re.compile(r".*/appointments"))

    # Check appointment filters
    expect(page.get_by_role("button", name="Pending")).to_be_visible()
    expect(page.get_by_role("button", name="Completed")).to_be_visible()
    expect(page.get_by_role("button", name="Confirmed")).not_to_be_visible()
    page.screenshot(path="jules-scratch/verification/03_doctor_view.png")
    page.get_by_role("button", name="Logout").click()

    # --- Test 3: Nurse's View ---
    page.goto(f"{base_url}/login")
    page.get_by_label("Email").fill("nurse@clinic.edu")
    page.get_by_label("Password").fill("nurse123")
    page.get_by_role("button", name="Sign In").click()

    expect(page).to_have_url(re.compile(r".*/dashboard"))
    page.get_by_role("link", name="Search").click()
    expect(page).to_have_url(re.compile(r".*/patients"))

    expect(page.get_by_role("button", name="Add Patient")).to_be_visible()
    page.screenshot(path="jules-scratch/verification/04_nurse_view.png")


with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    test_app_flows(page)
    browser.close()

print("Verification script finished.")
