import ApiCaller from "../util/apiCaller";

export const contactPageData = () => {
  return ApiCaller(
    `/list?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE&onlyMyRecords=false&pageNumber=0&pageSize=20&sort=DESC&sortField=createdOn`,
    "GET",
    {},
    "https://api.recruitly.io/api/company"
  );
};

export const addCompany = ({
  address,
  city,
  name,
  countryName,
  email,
  ownerName,
  phone,
}) => {
  return ApiCaller(
    "/v2?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE",
    "POST",
    {
      address,
      city,
      name,
      countryName,
      email,
      ownerName,
      phone,
    },
    "https://api.recruitly.io/api/company"
  );
};

export const updateCompany = (payload) => {
  return ApiCaller(
    "?apiKey=HIRE840770DDB2F381CA41BA84AA6A9ABE68B0EE",
    "POST",
    payload,
    "https://api.recruitly.io/api/company"
  );
};
