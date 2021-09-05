export const PUBLIC_IMAGE_PATH = "/assets/images/";

export const fetchApiData = async (url) => {
  console.log("GET API CALLED");
  try {
    const requestUrl = url;
    const response = await fetch(requestUrl);
    const responseJSON = await response.json();
    return responseJSON;
  } catch (e) {
    console.log(e);
  }
};

// export const postApiData = async (url = "", data = {}) => {
//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       mode: "cors",
//       cache: "no-cache",
//       credentials: "same-origin",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       redirect: "follow",
//       referrerPolicy: "no-referrer",
//       body: JSON.stringify(data),
//     });
//     const responseJSON = await response.json();
//     return responseJSON;
//   } catch (e) {
//     console.log(e);
//   }
// };

export const NUMBER_OF_TOP_ITEMS = 3;
