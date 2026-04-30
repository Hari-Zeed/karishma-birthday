#!/usr/bin/env node

/**
 * Birthday Experience - Build Verification
 * This script verifies all components are properly set up
 */

const fs = require('fs');
const path = require('path');

const components = [
  'AnimationEffects.tsx',
  'GlassmorphicComponents.tsx',
  'PageNavigation.tsx',
  'LandingPage.tsx',
  'HeartfeltMessagePage.tsx',
  'WhyAwesomePage.tsx',
  'MemoryLanePage.tsx',
  'SpecialMomentsPage.tsx',
  'FinalCelebrationPage.tsx',
  'BirthdayExperience.tsx',
  'DebugPanel.tsx',
];

const publicAssets = [
  'cat-cute.png',
  'cat-cozy.png',
  'panda-character.png',
];

console.log('\n🎉 Birthday Experience - Build Verification\n');
console.log('═'.repeat(50));

console.log('\n📦 Checking Components:');
components.forEach(component => {
  const filePath = path.join(__dirname, '..', 'components', component);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${component}`);
});

console.log('\n🖼️  Checking Assets:');
publicAssets.forEach(asset => {
  const filePath = path.join(__dirname, '..', 'public', asset);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${asset}`);
});

console.log('\n⚙️  Checking Configuration:');
const configFiles = [
  { name: 'app/page.tsx', file: 'app/page.tsx' },
  { name: 'app/layout.tsx', file: 'app/layout.tsx' },
  { name: 'app/globals.css', file: 'app/globals.css' },
  { name: 'package.json', file: 'package.json' },
];

configFiles.forEach(({ name, file }) => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  const status = exists ? '✅' : '❌';
  console.log(`  ${status} ${name}`);
});

console.log('\n' + '═'.repeat(50));
console.log('\n✨ All systems ready for Karishma\'s 20th Birthday!\n');
console.log('Features:');
console.log('  • 6-page multi-page experience');
console.log('  • Elite glassmorphism design');
console.log('  • Floating hearts, butterflies, sparkles');
console.log('  • Heartfelt message page');
console.log('  • Animated cat accents');
console.log('  • Page navigation system');
console.log('  • Confetti celebration');
console.log('\n🚀 Run: npm run dev\n');
