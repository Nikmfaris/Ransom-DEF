# Ransom-DEF

## Overview
Ransom-DEF is an educational cybersecurity project demonstrating ransomware attack vectors and file encryption techniques. This project is designed for **educational purposes only** to help security professionals understand how ransomware works and how to defend against it.

## ⚠️ Important Disclaimer
**This project is for authorized security training and educational use only.** Unauthorized access to computer systems or data encryption without consent is illegal. Always obtain proper authorization before testing security mechanisms.

## Project Structure

```
├── index.html       # Web interface mimicking a legitimate enterprise application
├── scenario.js      # Core encryption logic and file handling
└── README.md        # This documentation file
```

## Components

### index.html
A deceptive web interface styled as "NexGen Tech Enterprise Data Sync" that:
- Presents a fake enterprise compliance audit interface
- Uses social engineering tactics (Q1 2025 Financial Integrity Audit)
- Provides a folder selection interface for users to grant access to directories
- Displays progress bars simulating file synchronization

### scenario.js
The core functionality module containing:
- **getFixedKey()**: Generates a hardcoded AES-256 encryption key
- **scanFolder()**: Recursively traverses directory structures to identify files
- **encryptFile()**: Encrypts individual files using AES-GCM cipher
  - Skips README.txt files (ransomware typically leaves ransom notes)
  - Combines initialization vector (IV) with encrypted content
- **Event Listeners**: Handles user interactions and triggers encryption process

## Technical Details

### Encryption Scheme
- **Algorithm**: AES-GCM (Advanced Encryption Standard - Galois/Counter Mode)
- **Key Size**: 256-bit (32 bytes)
- **IV Size**: 12 bytes (randomly generated per file)
- **File Format**: [IV (12 bytes)][Ciphertext + Tag]

### Security Capabilities
The Web Crypto API is used to implement client-side encryption, utilizing:
- Built-in browser cryptographic functions
- File System Access API for directory traversal
- Authenticated encryption for data integrity

## Educational Value

This project demonstrates:
1. **Social Engineering**: How legitimate-looking interfaces deceive users
2. **Encryption Implementation**: Practical AES-GCM usage in JavaScript
3. **File System Access**: Recursive directory traversal techniques
4. **Ransomware Mechanics**: How malware encrypts files for extortion

## Defensive Recommendations

To protect against ransomware attacks:
- ✅ Maintain regular backups stored offline
- ✅ Use endpoint detection and response (EDR) solutions
- ✅ Implement file integrity monitoring
- ✅ Restrict admin privileges and user access controls
- ✅ Keep software and operating systems patched
- ✅ Provide security awareness training to staff
- ✅ Monitor for suspicious file access patterns
- ✅ Use network segmentation

## Usage

1. Open `index.html` in a web browser
2. Click "Select Folder for Secure Sync"
3. Choose a target directory
4. The encryption process will begin
5. Files will be encrypted (except README.txt)

## License & Attribution

This project is provided for educational and authorized security research purposes only.

---

**Created**: December 24, 2025  
**Type**: Educational Cybersecurity Project  
**Status**: For Training Use Only
