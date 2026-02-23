#!/bin/bash

# Script to apply design fixes to all HTML pages
# Run this to update all pages with accessibility improvements

echo "🔧 Applying design fixes to all HTML pages..."

# Array of HTML files to update
files=(
  "services.html"
  "process.html"
  "about.html"
  "testimonials.html"
  "contact.html"
  "privacy.html"
  "terms.html"
)

for file in "${files[@]}"; do
  echo "Processing $file..."

  # Create backup
  cp "$file" "$file.backup"

  # 1. Add theme-color meta tag after favicon (if not already present)
  if ! grep -q "theme-color" "$file"; then
    sed -i '' '/<link rel="icon"/a\
\
  <!-- Theme Color for Mobile Browsers -->\
  <meta name="theme-color" content="#102848">
' "$file"
    echo "  ✓ Added theme-color meta tag"
  fi

  # 2. Add skip-to-content link after <body> tag (if not already present)
  if ! grep -q "skip-to-content" "$file"; then
    sed -i '' '/<body>/a\
\
  <!-- Skip to Content Link for Accessibility -->\
  <a href="#main-content" class="skip-to-content">Skip to main content</a>
' "$file"
    echo "  ✓ Added skip-to-content link"
  fi

  # 3. Add id="main-content" to <main> tag (if not already present)
  sed -i '' 's/<main>/<main id="main-content">/g' "$file"
  echo "  ✓ Added main-content ID"

  # 4. Replace inline background styles with utility classes
  sed -i '' 's/style="background-color: var(--color-white);"/class="bg-white"/g' "$file"
  sed -i '' 's/style="background-color: var(--color-bg);"/class="bg-light"/g' "$file"

  # Fix cases where both class and style exist
  sed -i '' 's/class="\([^"]*\)" style="background-color: var(--color-white);"/class="\1 bg-white"/g' "$file"
  sed -i '' 's/class="\([^"]*\)" style="background-color: var(--color-bg);"/class="\1 bg-light"/g' "$file"

  echo "  ✓ Replaced inline styles"
  echo "  ✅ $file updated successfully"
  echo ""
done

echo "🎉 All pages updated!"
echo ""
echo "Backups created with .backup extension"
echo "To remove backups: rm *.backup"
echo ""
echo "Test the changes by opening each page in your browser."
