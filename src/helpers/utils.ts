export function conlog(label: string, value?: any) {
  console.log(label + ( value !== undefined ? ' >> ' : '' ));
  if (value !== undefined) {
    console.log(value)
  }
}