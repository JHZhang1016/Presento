export const randomId = () => {
  const timestampPart = Date.now().toString(36).slice(-6);
  const randomPart = Math.random().toString(36).substring(2, 7);
  return `${timestampPart}_${randomPart}`;
}

export const fileToDataUrl = (file, validFileTypes = ['image/jpeg', 'image/png', 'image/jpg']) => {
  return new Promise((resolve, reject) => {
    if (!validFileTypes.includes(file.type)) {
      return reject(new Error(`Invalid file type.`));
    }
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Error reading file.'));
    reader.readAsDataURL(file);
  });
}

export const toPercentage = (input) => {
  if (typeof input === 'number') {
    return `${input}%`;
  }
  return input.slice(-1) === '%' ? input : `${input}%`;
}