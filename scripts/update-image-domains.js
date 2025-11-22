const fs = require('fs');
const path = require('path');

// Import the sheets service to get current items
async function updateImageDomains() {
  try {
    // Dynamically import the ES modules
    const { SheetsService } = await import('../lib/sheets.js');
    
    const sheetsService = new SheetsService();
    const items = await sheetsService.getWishlistItems();
    
    // Extract unique domains from image URLs
    const domains = new Set();
    
    items.forEach(item => {
      if (item.image && item.image !== 'https://via.placeholder.com/300x200?text=Gift+Item') {
        try {
          const url = new URL(item.image);
          domains.add(url.hostname);
        } catch (error) {
          console.warn(`Invalid URL: ${item.image}`);
        }
      }
    });
    
    // Read current next.config.js
    const configPath = path.join(process.cwd(), 'next.config.js');
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Extract existing domains
    const domainsMatch = configContent.match(/domains:\s*\[([\s\S]*?)\]/);
    if (domainsMatch) {
      const existingDomainsString = domainsMatch[1];
      const existingDomains = existingDomainsString
        .split(',')
        .map(d => d.trim().replace(/['"]/g, ''))
        .filter(d => d.length > 0);
      
      // Add existing domains to our set
      existingDomains.forEach(domain => domains.add(domain));
    }
    
    // Create new domains array
    const domainsArray = Array.from(domains).sort();
    const domainsString = domainsArray
      .map(domain => `      '${domain}'`)
      .join(',\n');
    
    // Update the config file
    const newConfigContent = configContent.replace(
      /domains:\s*\[([\s\S]*?)\]/,
      `domains: [\n${domainsString}\n    ]`
    );
    
    fs.writeFileSync(configPath, newConfigContent);
    
    console.log('✅ Updated next.config.js with image domains:');
    domainsArray.forEach(domain => console.log(`   - ${domain}`));
    
  } catch (error) {
    console.error('❌ Error updating image domains:', error);
  }
}

updateImageDomains();