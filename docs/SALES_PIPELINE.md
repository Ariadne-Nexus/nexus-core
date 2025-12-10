# Sales Pipeline Automation

Automated data pull and analysis for sales pipeline tracking.

## Overview

The sales pipeline automation (`scripts/sales_pipeline_pull.py`) automatically pulls sales data from various sources, analyzes key metrics, and generates structured reports for dashboard consumption.

## Features

- ✅ **Multiple Data Sources**: CSV files, demo data (extensible to APIs)
- ✅ **Pipeline Analytics**: Total value, weighted value, deals by stage
- ✅ **Demo Mode**: Works out-of-the-box without configuration
- ✅ **Audit Logs**: Timestamped logs for compliance
- ✅ **JSON Output**: Structured data for frontend integration
- ✅ **GitHub Actions**: Daily automated runs

## Quick Start

### Demo Mode (No Configuration Required)

```bash
python3 scripts/sales_pipeline_pull.py --demo
```

This generates sample sales data and analytics without requiring any configuration.

### CSV Mode (Use Your Data)

1. Create a CSV file with your sales data:

```csv
deal_id,company,contact,stage,value,probability,expected_close_date,last_activity
DEAL-001,Acme Corp,John Smith,Proposal,50000,60,2025-01-15,2025-12-05
DEAL-002,TechStart Inc,Jane Doe,Negotiation,125000,80,2025-12-20,2025-12-09
```

2. Configure environment variables:

```bash
export SALES_DATA_SOURCE=./path/to/your/sales_data.csv
export SALES_DATA_TYPE=csv
```

3. Run the automation:

```bash
python3 scripts/sales_pipeline_pull.py
```

## CSV Data Format

### Required Columns

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| `deal_id` | String | Unique identifier for the deal | DEAL-001 |
| `company` | String | Company name | Acme Corp |
| `contact` | String | Primary contact name | John Smith |
| `stage` | String | Current pipeline stage | Proposal |
| `value` | Float | Deal value in dollars | 50000.00 |
| `probability` | Integer | Win probability (0-100) | 60 |
| `expected_close_date` | String | Expected close date (YYYY-MM-DD) | 2025-01-15 |
| `last_activity` | String | Last activity date (YYYY-MM-DD) | 2025-12-05 |

### Common Pipeline Stages

- **Discovery** - Initial contact and qualification
- **Proposal** - Proposal submitted to prospect
- **Negotiation** - In active negotiation
- **Closed Won** - Deal won and closed
- **Closed Lost** - Deal lost

## Output Files

### sales_pipeline.json

Main output file with current pipeline data and analytics:

```json
{
  "date": "2025-12-10",
  "created_at": "2025-12-10T20:28:03Z",
  "summary": {
    "total_deals": 8,
    "total_value": 685000.00,
    "weighted_value": 485500.00,
    "avg_deal_size": 85625.00,
    "deals_by_stage": {
      "Discovery": 2,
      "Proposal": 3,
      "Negotiation": 2,
      "Closed Won": 1
    },
    "value_by_stage": {
      "Discovery": 120000.00,
      "Proposal": 145000.00,
      "Negotiation": 220000.00,
      "Closed Won": 200000.00
    }
  },
  "deals": [...]
}
```

### sales_pipeline_audit_*.json

Timestamped audit logs for compliance and historical tracking.

## Metrics Explained

### Total Value
Sum of all deal values in the pipeline, regardless of probability.

### Weighted Value
Sum of all deals' weighted values. Calculated as:
```
weighted_value = deal_value * (probability / 100)
```

For example, a $100,000 deal with 60% probability contributes $60,000 to weighted value.

### Average Deal Size
Average value across all deals:
```
avg_deal_size = total_value / number_of_deals
```

### Deals by Stage
Count of deals in each pipeline stage.

### Value by Stage
Total value of all deals in each stage (unweighted).

## GitHub Actions Integration

The automation runs daily via GitHub Actions at 6 AM PT (2 PM UTC).

### Workflow: `.github/workflows/sales-pipeline.yml`

- **Schedule**: Daily at 6 AM PT
- **Manual Trigger**: Available with demo mode option
- **Outputs**: Commits generated data and creates artifacts

### Manual Trigger

1. Go to **Actions** → **Sales Pipeline Data Pull**
2. Click **Run workflow**
3. Choose demo mode (optional)
4. Click **Run workflow** button

## Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `SALES_DATA_SOURCE` | Path to CSV file or API endpoint | N/A | For CSV mode |
| `SALES_DATA_TYPE` | Data source type (csv, demo) | demo | No |
| `OUTPUT_DIR` | Output directory | ./output | No |

## Extending with API Integration

To add API support (e.g., Salesforce, HubSpot):

1. Add a new method in `SalesPipelineAutomation` class:

```python
def _pull_from_api(self) -> List[SalesDeal]:
    """Pull sales data from API endpoint."""
    # Your API integration code here
    pass
```

2. Update the `pull_data()` method:

```python
def pull_data(self) -> List[SalesDeal]:
    if self.data_type == "api":
        return self._pull_from_api()
    # ... existing code
```

3. Configure environment variables:

```bash
export SALES_DATA_TYPE=api
export SALES_API_ENDPOINT=https://api.example.com/deals
export SALES_API_KEY=your-api-key
```

## Testing

### Run in Demo Mode

```bash
python3 scripts/sales_pipeline_pull.py --demo
```

### Run with Sample CSV

```bash
export SALES_DATA_SOURCE=./output/sample_sales_data.csv
export SALES_DATA_TYPE=csv
python3 scripts/sales_pipeline_pull.py
```

### Verify Output

```bash
# Check that output file exists
ls -la output/sales_pipeline.json

# View summary
cat output/sales_pipeline.json | jq '.summary'

# View all deals
cat output/sales_pipeline.json | jq '.deals'
```

## Troubleshooting

### "CSV file not found"

**Issue**: The script can't find the CSV file.

**Solution**:
1. Verify the file path: `ls -la $SALES_DATA_SOURCE`
2. Use absolute path: `export SALES_DATA_SOURCE=/full/path/to/file.csv`
3. Check file permissions: `chmod 644 your_sales_data.csv`

### "Failed to read CSV file"

**Issue**: CSV parsing error.

**Solution**:
1. Verify CSV format matches required columns
2. Check for proper UTF-8 encoding
3. Ensure no extra commas or quotes in data
4. Review the sample: `output/sample_sales_data.csv`

### No output generated

**Issue**: Script runs but doesn't create output files.

**Solution**:
1. Check write permissions: `ls -la output/`
2. Create output directory: `mkdir -p output`
3. Run in demo mode to verify: `python3 scripts/sales_pipeline_pull.py --demo`

## Integration with Dashboard

The sales pipeline data is designed to integrate with Next.js dashboards:

1. **API Route**: Create `app/api/sales-pipeline/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'output/sales_pipeline.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

2. **React Component**: Fetch and display the data:

```typescript
'use client';

import { useEffect, useState } from 'react';

export default function SalesPipelinePanel() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/sales-pipeline')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  if (!data) return <div>Loading...</div>;
  
  return (
    <div>
      <h2>Sales Pipeline</h2>
      <p>Total Deals: {data.summary.total_deals}</p>
      <p>Total Value: ${data.summary.total_value.toLocaleString()}</p>
      <p>Weighted Value: ${data.summary.weighted_value.toLocaleString()}</p>
    </div>
  );
}
```

## Best Practices

1. **Regular Updates**: Run daily to keep data fresh
2. **Data Validation**: Verify CSV format before running
3. **Backup Data**: Keep audit logs for historical tracking
4. **Monitor Metrics**: Track weighted value trends over time
5. **Clean Data**: Remove closed deals periodically to maintain accuracy

## Related Documentation

- [Main Automation Guide](../AUTOMATION_GUIDE.md)
- [README](../README.md)
- [GitHub Workflow](.github/workflows/sales-pipeline.yml)
- [Data Models](scripts/lib/models.py)

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the sample CSV: `output/sample_sales_data.csv`
3. Run in demo mode to verify setup
4. Open an issue in the repository

---

**Last Updated**: 2025-12-10
**Version**: 1.0.0
