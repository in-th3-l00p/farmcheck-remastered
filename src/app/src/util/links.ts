const baseURL = "http://172.24.1.178:8080";

// Post login user data
export const PostLoginURL = baseURL + "/api/v1/auth/login";

// Post register user data
export const PostRegisterURL = baseURL + "/api/v1/user/register";

// Gets the current user's details
export const GetUserURL = baseURL + "/api/v1/user";

// Gets the current user's farms
export const GetFarmsURL = baseURL + "/api/v1/farm/all";

// Gets farm's users
export const GetFarmUsersURL = baseURL + "/api/v1/farm/users";

// Gets the details of a farm
export const GetFarmURL = baseURL + "/api/v1/farm";

// Creates a farm
export const PostFarmURL = baseURL + "/api/v1/farm";

// Adds a user to a farm
export const PostFarmUserURL = baseURL + "/api/v1/farm/user";

// Gets the current user's farms' count
export const GetFarmsCountURL = baseURL + "/api/v1/farm/all/count";

// Gets the current user's farm's sensors
export const GetFarmSensorsURL = baseURL + "/api/v1/sensor/farm";

//Puts a user's new role
export const PutUserRoleURL = baseURL + "/api/v1/farm/user";
