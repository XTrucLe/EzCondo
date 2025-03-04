const loginBackgroundImage = require("../assets/images/background.png");

const userInformation = {
  name: "Nguyễn Thị Bích Phương",
  apartment_number: "A1-12",
  image: require("../assets/images/Avata_user.png"),
  gender: "female",
  phone_number: "0123456789",
  email: "nguenthiphuong@gmail.com",
  role_name: "Cư dân",
  citizen_identity: "045213521656",
  date_of_birth: "12-05-1986",
};

function updateUserInformation(updates: Partial<typeof userInformation>) {
  for (const key in updates) {
    if (userInformation.hasOwnProperty(key)) {
      userInformation[key as keyof typeof userInformation] =
        updates[key as keyof typeof userInformation];
    } else {
      throw new Error(`Property ${key} does not exist on userInformation`);
    }
  }
}

export { loginBackgroundImage, userInformation, updateUserInformation };
