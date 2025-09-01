#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'test';

  log('\n🧪 ERP System Test Runner', 'cyan');
  log('================================', 'cyan');

  try {
    switch (command) {
      case 'test':
        log('\n📋 Running all tests...', 'blue');
        await runCommand('npm', ['test', '--', '--passWithNoTests']);
        log('\n✅ All tests completed successfully!', 'green');
        break;

      case 'watch':
        log('\n👀 Running tests in watch mode...', 'blue');
        await runCommand('npm', ['run', 'test:watch']);
        break;

      case 'coverage':
        log('\n📊 Running tests with coverage...', 'blue');
        await runCommand('npm', ['run', 'test:coverage']);
        log('\n✅ Coverage report generated!', 'green');
        break;

      case 'ci':
        log('\n🤖 Running tests in CI mode...', 'blue');
        await runCommand('npm', ['run', 'test:ci']);
        log('\n✅ CI tests completed!', 'green');
        break;

      case 'debug':
        log('\n🐛 Running tests in debug mode...', 'blue');
        await runCommand('npm', ['run', 'test:debug']);
        break;

      case 'update':
        log('\n📸 Updating test snapshots...', 'yellow');
        await runCommand('npm', ['run', 'test:update']);
        log('\n✅ Snapshots updated!', 'green');
        break;

      case 'help':
        log('\n📖 Available commands:', 'magenta');
        log('  test       - Run all tests', 'reset');
        log('  watch      - Run tests in watch mode', 'reset');
        log('  coverage   - Run tests with coverage', 'reset');
        log('  ci         - Run tests in CI mode', 'reset');
        log('  debug      - Run tests in debug mode', 'reset');
        log('  update     - Update test snapshots', 'reset');
        log('  help       - Show this help message', 'reset');
        break;

      default:
        log(`\n❌ Unknown command: ${command}`, 'red');
        log('Run "node scripts/test-runner.js help" for available commands', 'yellow');
        process.exit(1);
    }
  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    process.exit(1);
  }
}

main();
