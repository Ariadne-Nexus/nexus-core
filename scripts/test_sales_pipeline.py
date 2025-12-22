#!/usr/bin/env python3
"""
Tests for Sales Pipeline Automation
====================================

Comprehensive test suite for sales_pipeline_pull.py
"""

import os
import sys
import json
import tempfile
import shutil
from pathlib import Path
from typing import List, Dict, Any

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from lib.models import SalesDeal, PipelineSummary


def test_sales_deal_model():
    """Test SalesDeal dataclass and weighted_value calculation"""
    print("Testing SalesDeal model...")
    
    deal = SalesDeal(
        deal_id="TEST-001",
        company="Test Corp",
        contact="John Doe",
        stage="Proposal",
        value=100000.0,
        probability=60,
        expected_close_date="2025-12-31",
        last_activity="2025-12-10"
    )
    
    # Test weighted value calculation
    assert deal.weighted_value == 60000.0, f"Expected 60000.0, got {deal.weighted_value}"
    
    # Test to_dict conversion
    deal_dict = deal.to_dict()
    assert deal_dict['deal_id'] == "TEST-001", "Deal ID mismatch"
    assert deal_dict['weighted_value'] == 60000.0, "Weighted value mismatch in dict"
    
    print("  ✓ SalesDeal model tests passed")


def test_pipeline_summary_model():
    """Test PipelineSummary dataclass"""
    print("Testing PipelineSummary model...")
    
    summary = PipelineSummary(
        total_deals=5,
        total_value=500000.0,
        weighted_value=350000.0,
        avg_deal_size=100000.0,
        deals_by_stage={"Proposal": 2, "Negotiation": 3},
        value_by_stage={"Proposal": 200000.0, "Negotiation": 300000.0}
    )
    
    # Test to_dict conversion
    summary_dict = summary.to_dict()
    assert summary_dict['total_deals'] == 5, "Total deals mismatch"
    assert summary_dict['weighted_value'] == 350000.0, "Weighted value mismatch"
    assert len(summary_dict['deals_by_stage']) == 2, "Deals by stage count mismatch"
    
    print("  ✓ PipelineSummary model tests passed")


def test_csv_parsing():
    """Test CSV file parsing"""
    print("Testing CSV parsing...")
    
    # Create temporary CSV file
    with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.csv') as f:
        f.write("deal_id,company,contact,stage,value,probability,expected_close_date,last_activity\n")
        f.write("TEST-001,Acme,John,Proposal,50000,60,2025-12-31,2025-12-10\n")
        f.write("TEST-002,Tech,Jane,Negotiation,100000,80,2025-12-31,2025-12-10\n")
        csv_path = f.name
    
    try:
        # Import and test
        from sales_pipeline_pull import SalesPipelineAutomation
        
        # Set environment variables
        os.environ['SALES_DATA_SOURCE'] = csv_path
        os.environ['SALES_DATA_TYPE'] = 'csv'
        os.environ['OUTPUT_DIR'] = tempfile.mkdtemp()
        
        automation = SalesPipelineAutomation(demo_mode=False)
        deals = automation._pull_from_csv()
        
        assert len(deals) == 2, f"Expected 2 deals, got {len(deals)}"
        assert deals[0].deal_id == "TEST-001", "First deal ID mismatch"
        assert deals[1].value == 100000.0, "Second deal value mismatch"
        
        print("  ✓ CSV parsing tests passed")
        
        # Clean up
        shutil.rmtree(os.environ['OUTPUT_DIR'])
    finally:
        os.unlink(csv_path)


def test_analytics_calculation():
    """Test pipeline analytics calculations"""
    print("Testing analytics calculations...")
    
    from sales_pipeline_pull import SalesPipelineAutomation
    
    # Create test deals
    deals = [
        SalesDeal("D1", "C1", "P1", "Proposal", 50000, 60, "2025-12-31", "2025-12-10"),
        SalesDeal("D2", "C2", "P2", "Proposal", 30000, 50, "2025-12-31", "2025-12-10"),
        SalesDeal("D3", "C3", "P3", "Negotiation", 100000, 80, "2025-12-31", "2025-12-10"),
    ]
    
    automation = SalesPipelineAutomation(demo_mode=True)
    summary = automation.analyze_pipeline(deals)
    
    # Verify calculations
    assert summary.total_deals == 3, f"Expected 3 deals, got {summary.total_deals}"
    assert summary.total_value == 180000.0, f"Expected 180000.0, got {summary.total_value}"
    
    # Weighted value: (50000*0.6) + (30000*0.5) + (100000*0.8) = 30000 + 15000 + 80000 = 125000
    assert summary.weighted_value == 125000.0, f"Expected 125000.0, got {summary.weighted_value}"
    
    # Average deal size
    assert summary.avg_deal_size == 60000.0, f"Expected 60000.0, got {summary.avg_deal_size}"
    
    # Stage distribution
    assert summary.deals_by_stage['Proposal'] == 2, "Proposal count mismatch"
    assert summary.deals_by_stage['Negotiation'] == 1, "Negotiation count mismatch"
    assert summary.value_by_stage['Proposal'] == 80000.0, "Proposal value mismatch"
    assert summary.value_by_stage['Negotiation'] == 100000.0, "Negotiation value mismatch"
    
    print("  ✓ Analytics calculation tests passed")


def test_demo_mode():
    """Test demo mode execution"""
    print("Testing demo mode...")
    
    from sales_pipeline_pull import SalesPipelineAutomation
    
    with tempfile.TemporaryDirectory() as tmpdir:
        os.environ['OUTPUT_DIR'] = tmpdir
        
        automation = SalesPipelineAutomation(demo_mode=True)
        deals = automation.pull_data()
        
        assert len(deals) == 5, f"Expected 5 demo deals, got {len(deals)}"
        assert all(isinstance(d, SalesDeal) for d in deals), "Not all items are SalesDeal instances"
        
        # Test full workflow
        summary = automation.analyze_pipeline(deals)
        output_file = automation.save_output(deals, summary)
        
        assert output_file.exists(), "Output file was not created"
        
        # Verify JSON structure
        with open(output_file) as f:
            data = json.load(f)
        
        assert 'date' in data, "Missing 'date' field"
        assert 'summary' in data, "Missing 'summary' field"
        assert 'deals' in data, "Missing 'deals' field"
        assert 'metadata' in data, "Missing 'metadata' field"
        assert data['metadata']['demo_mode'] == True, "Demo mode flag not set"
        
        print("  ✓ Demo mode tests passed")


def test_json_output_structure():
    """Test JSON output structure and format"""
    print("Testing JSON output structure...")
    
    from sales_pipeline_pull import SalesPipelineAutomation
    
    with tempfile.TemporaryDirectory() as tmpdir:
        os.environ['OUTPUT_DIR'] = tmpdir
        
        automation = SalesPipelineAutomation(demo_mode=True)
        result = automation.run()
        
        assert result == 0, f"Expected exit code 0, got {result}"
        
        # Load and validate output
        output_file = Path(tmpdir) / "sales_pipeline.json"
        assert output_file.exists(), "Output file not created"
        
        with open(output_file) as f:
            data = json.load(f)
        
        # Validate required fields
        required_fields = ['date', 'created_at', 'summary', 'deals', 'metadata']
        for field in required_fields:
            assert field in data, f"Missing required field: {field}"
        
        # Validate summary structure
        summary = data['summary']
        summary_fields = ['total_deals', 'total_value', 'weighted_value', 
                         'avg_deal_size', 'deals_by_stage', 'value_by_stage']
        for field in summary_fields:
            assert field in summary, f"Missing summary field: {field}"
        
        # Validate deals structure
        assert isinstance(data['deals'], list), "Deals should be a list"
        if data['deals']:
            deal = data['deals'][0]
            deal_fields = ['deal_id', 'company', 'contact', 'stage', 'value', 
                          'probability', 'expected_close_date', 'last_activity', 'weighted_value']
            for field in deal_fields:
                assert field in deal, f"Missing deal field: {field}"
        
        print("  ✓ JSON output structure tests passed")


def test_edge_cases():
    """Test edge cases and error handling"""
    print("Testing edge cases...")
    
    from sales_pipeline_pull import SalesPipelineAutomation
    
    with tempfile.TemporaryDirectory() as tmpdir:
        os.environ['OUTPUT_DIR'] = tmpdir
        
        automation = SalesPipelineAutomation(demo_mode=True)
        
        # Test empty deals list
        summary = automation.analyze_pipeline([])
        assert summary.total_deals == 0, "Empty list should have 0 deals"
        assert summary.total_value == 0.0, "Empty list should have 0 value"
        assert summary.weighted_value == 0.0, "Empty list should have 0 weighted value"
        
        # Test deals with 0% probability
        zero_prob_deal = SalesDeal("D1", "C1", "P1", "Discovery", 50000, 0, "2025-12-31", "2025-12-10")
        summary = automation.analyze_pipeline([zero_prob_deal])
        assert summary.weighted_value == 0.0, "0% probability should yield 0 weighted value"
        
        # Test deals with 100% probability
        certain_deal = SalesDeal("D2", "C2", "P2", "Closed Won", 100000, 100, "2025-12-31", "2025-12-10")
        summary = automation.analyze_pipeline([certain_deal])
        assert summary.weighted_value == 100000.0, "100% probability should equal full value"
        
        print("  ✓ Edge case tests passed")


def run_all_tests():
    """Run all test suites"""
    print("=" * 60)
    print("Running Sales Pipeline Automation Tests")
    print("=" * 60)
    print()
    
    tests = [
        test_sales_deal_model,
        test_pipeline_summary_model,
        test_csv_parsing,
        test_analytics_calculation,
        test_demo_mode,
        test_json_output_structure,
        test_edge_cases,
    ]
    
    passed = 0
    failed = 0
    
    for test in tests:
        try:
            test()
            passed += 1
        except AssertionError as e:
            print(f"  ✗ Test failed: {e}")
            failed += 1
        except Exception as e:
            print(f"  ✗ Test error: {e}")
            failed += 1
    
    print()
    print("=" * 60)
    print(f"Test Results: {passed} passed, {failed} failed")
    print("=" * 60)
    
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    sys.exit(run_all_tests())
