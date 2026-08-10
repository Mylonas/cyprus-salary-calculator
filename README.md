# Cyprus Salary Calculator 2026

A free, static, single-page net-salary calculator for Cyprus using the **post-reform 2026** tax bands. Calculates take-home pay after income tax, Social Insurance and GESY. EN / EL bilingual.

## Rates used (2026)

| Item | Value |
|---|---|
| Income tax bands | €0–22,000 = 0% · 22k–32k = 20% · 32k–42k = 25% · 42k–72k = 30% · 72k+ = 35% |
| Social Insurance (employee) | 8.8%, cap €68,904/yr |
| GESY / GHS (employee) | 2.65%, cap €180,000/yr |
| Tax base | Gross − SI − GESY (both are tax-deductible) |

Supports 12 / 13 / 14 salaries and an optional employer-cost breakdown.

## Notes

- Pure `index.html`, no build step, no backend. Deploy to any static host (Cloudflare Pages).
- **Estimate only — not tax advice.** Rates change yearly; verify constants at the top of the script each January against the Cyprus Tax Department. All rate constants (`BANDS`, `SI_RATE`, `SI_CAP`, `GESY_RATE`, `GESY_CAP`) are grouped for easy annual updates.
