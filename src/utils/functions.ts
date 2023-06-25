// eslint-disable-next-line import/prefer-default-export
export function removeDuplicates(arr: any): any {
  const uniqueObjects: { [name: string]: boolean } = {};
  const filteredArray = arr.filter((obj: any) => {
    if (!uniqueObjects[obj.name]) {
      uniqueObjects[obj.name] = true;
      return true;
    }
    return false;
  });
  return filteredArray;
}
