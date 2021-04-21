export const chunks = (items, chunkSize) => {
    const chunks = [];
    let chunk = [];

    for (let i = 0; i < items.length; i++) {
        if (i % chunkSize === 0) {
            if (chunk.length > 0) {
                chunks.push(chunk);
            }
            chunk = [];
        }
        chunk.push(items[i]);
    }

    if (chunk.length > 0) {
        chunks.push(chunk);
    }

    return chunks;
};
