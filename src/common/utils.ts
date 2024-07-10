
export function randomAddress() {
  const list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"];
  return (
    "0x" +
    new Array(40)
      .fill(0)
      .map(() => list[Math.floor(Math.random() * list.length)])
      .join("")
  );
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function randomString() {
  return (Math.random() + 1).toString(36).substring(7);
}

export function cleanObj(obj: Record<string, unknown>) {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined) {
      delete obj[key];
    }
  }
  return obj;
}

export function code(length = 6) {
  return Math.random().toString().slice(2, 2 + length);
}

export function last<T>(arr: T[]) {
  return arr.length ? arr[arr.length - 1] : undefined;
}

export function shuffle<T>(arr: T[]) {
  if (arr.length < 2) {
    return arr;
  }
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

export function unique<T>(arr: T[]) {
  return [...new Set(arr)];
}

export function chunk<T>(arr: T[], size: number) {
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

export function buildContentFromTemplate(
  template: string,
  params: Record<string, string>,
) {
  return Object.entries(params).reduce((content, [key, value]) => {
    const regex = new RegExp(`{{${key}}}`, "g");
    return content.replace(regex, value);
  }, template);
}
