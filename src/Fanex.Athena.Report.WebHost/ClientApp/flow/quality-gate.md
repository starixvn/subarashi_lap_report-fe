Follow steps:
- Step1: use `sonarqube` mcp to get conditions failed (code coverage, code smells, duplicate code, ...) with pagesize 20
- Step2: Use simply solution to fix it
- Step3: run `npm run lint` to verify format and code styles.
- Step4: run `npm run test-coverage` to verify generated tests. If have a failed test, go to Step2 and adjust it to make sure it run success

Notes:
- Project key of sonarqube is `LAP.ReportFE`
- Use `sequential-thinking` mcp for any decision making
- Use `context7` mcp for get technical documents