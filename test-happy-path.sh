#!/usr/bin/env bash
# Guaranteed Happy Path Test
# Tests the entire stack with zero configuration required

set -e  # Exit on any error

echo "============================================================"
echo "🧪 GUARANTEED HAPPY PATH TEST"
echo "============================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function for test results
pass() {
    echo -e "${GREEN}✅ PASS${NC}: $1"
    ((TESTS_PASSED++))
}

fail() {
    echo -e "${RED}❌ FAIL${NC}: $1"
    ((TESTS_FAILED++))
}

warn() {
    echo -e "${YELLOW}⚠️  WARN${NC}: $1"
}

# ============================================================
# TEST 1: Python Environment
# ============================================================
echo "📋 Test 1: Python Environment"
if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version 2>&1 | awk '{print $2}')
    pass "Python 3 found: $PYTHON_VERSION"
else
    fail "Python 3 not found"
    exit 1
fi
echo ""

# ============================================================
# TEST 2: Python Script Exists
# ============================================================
echo "📋 Test 2: Python Automation Script"
if [ -f "scripts/daily_v2.py" ]; then
    pass "daily_v2.py exists"
else
    fail "daily_v2.py not found"
    exit 1
fi
echo ""

# ============================================================
# TEST 3: Run Python Automation (Demo Mode - No Deps Needed)
# ============================================================
echo "📋 Test 3: Python Automation (Demo Mode)"
echo "   Running: python3 scripts/daily_v2.py --demo"
echo ""

if timeout 30 python3 scripts/daily_v2.py --demo > /tmp/automation_output.log 2>&1; then
    pass "Automation completed successfully"

    # Check for expected output
    if [ -f "output/daily_summary.json" ]; then
        pass "Output file created: output/daily_summary.json"
    else
        fail "Output file not created"
    fi

    # Verify JSON is valid
    if command -v jq &> /dev/null; then
        if jq empty output/daily_summary.json 2>/dev/null; then
            pass "Output is valid JSON"
        else
            fail "Output is invalid JSON"
        fi
    else
        warn "jq not installed, skipping JSON validation"
    fi

    # Check for audit log
    AUDIT_COUNT=$(ls -1 output/audit_*.json 2>/dev/null | wc -l)
    if [ "$AUDIT_COUNT" -gt 0 ]; then
        pass "Audit logs created ($AUDIT_COUNT files)"
    else
        fail "No audit logs found"
    fi
else
    fail "Automation failed"
    echo ""
    echo "Error output:"
    cat /tmp/automation_output.log
    exit 1
fi
echo ""

# ============================================================
# TEST 4: Node.js Environment
# ============================================================
echo "📋 Test 4: Node.js Environment"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    pass "Node.js found: $NODE_VERSION"
else
    fail "Node.js not found"
    exit 1
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    pass "npm found: $NPM_VERSION"
else
    fail "npm not found"
    exit 1
fi
echo ""

# ============================================================
# TEST 5: Node Modules Installed
# ============================================================
echo "📋 Test 5: Node Dependencies"
if [ -d "node_modules" ]; then
    pass "node_modules directory exists"
else
    warn "node_modules not found, installing..."
    npm install
    if [ $? -eq 0 ]; then
        pass "Dependencies installed successfully"
    else
        fail "Failed to install dependencies"
        exit 1
    fi
fi
echo ""

# ============================================================
# TEST 6: Next.js Build
# ============================================================
echo "📋 Test 6: Next.js Build"
echo "   Running: npm run build"
echo ""

if timeout 120 npm run build > /tmp/nextjs_build.log 2>&1; then
    pass "Next.js build succeeded"

    # Check for build artifacts
    if [ -d ".next" ]; then
        pass "Build directory created: .next/"
    else
        fail "Build directory not found"
    fi
else
    fail "Next.js build failed"
    echo ""
    echo "Build errors:"
    tail -50 /tmp/nextjs_build.log
    exit 1
fi
echo ""

# ============================================================
# TEST 7: API Routes Exist
# ============================================================
echo "📋 Test 7: API Routes"
EXPECTED_ROUTES=(
    "app/api/daily-summary/route.ts"
    "app/api/health/route.ts"
    "app/api/status/route.ts"
    "app/api/demo/route.ts"
)

for route in "${EXPECTED_ROUTES[@]}"; do
    if [ -f "$route" ]; then
        pass "Route exists: $route"
    else
        fail "Route missing: $route"
    fi
done
echo ""

# ============================================================
# TEST 8: Configuration Files
# ============================================================
echo "📋 Test 8: Configuration Files"
CONFIG_FILES=(
    "package.json"
    "tsconfig.json"
    "next.config.ts"
    ".env.example"
    "scripts/requirements.txt"
    "project.config"
)

for config in "${CONFIG_FILES[@]}"; do
    if [ -f "$config" ]; then
        pass "Config exists: $config"
    else
        fail "Config missing: $config"
    fi
done
echo ""

# ============================================================
# TEST 9: Documentation Files
# ============================================================
echo "📋 Test 9: Documentation"
DOC_FILES=(
    "README.new.md"
    "AUTOMATION_GUIDE.md"
    "QUICKSTART.md"
    ".copilot-instructions.md"
)

for doc in "${DOC_FILES[@]}"; do
    if [ -f "$doc" ]; then
        pass "Documentation exists: $doc"
    else
        warn "Documentation missing: $doc"
    fi
done
echo ""

# ============================================================
# TEST 10: Git Configuration
# ============================================================
echo "📋 Test 10: Git Configuration"
if [ -f ".gitignore" ]; then
    pass ".gitignore exists"

    # Check critical entries
    if grep -q "\.env\.local" .gitignore; then
        pass ".env.local is gitignored"
    else
        fail ".env.local not in .gitignore"
    fi

    if grep -q "venv/" .gitignore; then
        pass "venv/ is gitignored"
    else
        fail "venv/ not in .gitignore"
    fi
else
    fail ".gitignore not found"
fi
echo ""

# ============================================================
# SUMMARY
# ============================================================
echo "============================================================"
echo "📊 TEST SUMMARY"
echo "============================================================"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
if [ $TESTS_FAILED -gt 0 ]; then
    echo -e "${RED}Failed: $TESTS_FAILED${NC}"
else
    echo -e "${GREEN}Failed: 0${NC}"
fi
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ ALL TESTS PASSED - HAPPY PATH GUARANTEED${NC}"
    echo ""
    echo "🎉 Your project is ready to:"
    echo "   • Run Python automation: python3 scripts/daily_v2.py --demo"
    echo "   • Start Next.js dev: npm run dev"
    echo "   • Deploy to Vercel: git push origin main"
    echo "   • View live demo: https://avidelta.vercel.app"
    echo ""
    exit 0
else
    echo -e "${RED}❌ SOME TESTS FAILED${NC}"
    echo ""
    echo "Please review the failures above and fix them."
    echo ""
    exit 1
fi
