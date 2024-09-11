import ApiCaller from "../util/apiCaller";

export const ContactPageData = () => {
  return ApiCaller(
    `/list?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE&onlyMyRecords=false&pageNumber=0&pageSize=20&sort=DESC&sortField=createdOn`,
    "GET",
    {},
    "https://api.recruitly.io/api/company"
  );
};
