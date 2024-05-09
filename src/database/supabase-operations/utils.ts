export function conlog(label: string, value?: any) {
  if (!value) {
    console.log(label);
    return;
  }
  console.log(label + " >>>");
  console.log(value);
  return;
}