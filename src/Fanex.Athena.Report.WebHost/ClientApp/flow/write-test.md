Follow steps:
- Step1: use `sonarqube` mcp to get top 20 files with code coverage (N/A or < 80%).
- Step2: write unit test for each file to enhance code coverage
- Step3: run `npm run lint` to verify format and code styles.
- Step4: run `npm run test-coverage` to verify generated tests. If have a failed test, go to Step2 and adjust it to make sure it run success

Notes:
- Don't change any file in `src` folder
- Project key of sonarqube is `LAP.ReportFE`
- Use `sequential-thinking` mcp for any decision making
- Use `context7` mcp for get technical documents