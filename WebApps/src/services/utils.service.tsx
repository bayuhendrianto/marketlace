export function findCommonObjects(arr1: any, arr2: any, property: any) {
  const commonArray: any[] = [];

  arr1.forEach((obj1: any) => {
    arr2.forEach((obj2: any) => {
      if (
        obj1[property] === obj2[property] &&
        !commonArray.includes(obj1) &&
        obj2.selected === true
      ) {
        commonArray.push(obj1);
      }
    });
  });

  return commonArray;
}

export const toBase64 = (file: File) => {
  let reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = (event: any) => {
      resolve(event.target.result);
    };
  });
};

export const validate = (file: File, size: number) => {
  let fileSize = size ? Number(size) : 1024;
  if (file === null) return "No file selected !!";

  // Validate Size
  if (file.size > fileSize * 1024) return "Size more than 1 Mb not allowed !!";

  return "";
};

export async function uploadMultipleDocument(formData: any, path: string) {
  const fetchData = await fetch(
    `http://localhost:3000/storage/upload-multiple/${path}`,
    {
      method: "post",
      body: formData,
    }
  );

  return fetchData.json();
}

export async function uploadSingleDocument(formData: any, path: string) {
  const fetchData = await fetch(
    `http://localhost:3000/storage/upload-single/${path}`,
    {
      method: "post",
      body: formData,
    }
  );

  return fetchData.json();
}
