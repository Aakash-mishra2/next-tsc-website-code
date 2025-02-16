/* eslint-disable no-useless-escape */
/* eslint-disable array-callback-return */
const customValidation = [
  {
    inputKey: "phone",
    min: 10,
    max: 10,
    regex: /^[6-9]\d{9}$/,
    required: true,
  },
  {
    inputKey: "first_name",
    min: 3,
    max: 49,
    regex: /^[A-Za-z\s]{3,49}$/,
    required: true,
  },
  {
    inputKey: "last_name",
    min: 3,
    max: 49,
    regex: /^[A-Za-z\s]{3,49}$/,
    required: true,
  },
  {
    inputKey: "pin_code",
    min: 6,
    max: 6,
    regex: /^[1-9]\d{5}$/,
    required: true,
  },
  {
    inputKey: "city",
    min: 3,
    max: 60,
    regex: /^[A-Za-z\s\-\(\)_&.]{3,60}$/,
    required: true,
  },
  {
    inputKey: "state",
    min: 3,
    max: 100,
    type: "select",
    regex: /^[A-Za-z\s]{3,100}$/,
    required: true,
  },
  {
    inputKey: "address",
    min: 1,
    max: 130,
    regex: /[^\x00-\xFF]/,
    required: true,
  },
  {
    inputKey: "apartment",
    min: 3,
    max: 200,
    regex: /[^\x00-\xFF]/,
    required: true,
  },
  {
    inputKey: "landmark",
    min: 0,
    max: 100,
    regex: /[^\x00-\xFF]/,
    required: false,
  },
  {
    inputKey: "gender",
    min: 3,
    max: 10,
    type: "select",
    regex: /^[A-Za-z\s]{3,10}$/,
    required: true,
  },
  {
    inputKey: "email",
    min: 0,
    max: 200,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    required: false,
  },
  {
    inputKey: "alternate_phone",
    min: 0,
    max: 10,
    regex: /^[6-9]\d{9}$/,
    required: false,
  },
];

const response = (isError, message) => {
  return { error: isError, message: message };
};

const checkLength = (value, min, max, required) => {
  if (value.length === 0 && !required) {
    return response(false, "success");
  } else if (value.length === 0 && required && min > 0) {
    return response(true, `Must contain at least ${min} characters`);
  } else if (value.length >= min && value.length <= max) {
    return response(false, "success");
  } else if (value.length < min) {
    return response(true, `Must contain at least ${min} characters`);
  } else if (value.length > max) {
    return response(true, "Max limit exceeded");
  }
};

const verifyString = (value, field) => {
  const iso8859Regex = /[^\x00-\xFF]/g;
  const nonIso8859Chars = value.match(iso8859Regex) || [];
  const uniqueChar = [...new Set(nonIso8859Chars)];
  const filtered = uniqueChar.filter((char) => char !== " ");
  const joinedNonIso8859Chars = filtered.join(", ");
  if (filtered.length === 0) return "success";
  return `Please remove invalid characters from ${
    field === "landmark" ? field : "address line field"
  }: ${joinedNonIso8859Chars}`;
};

const checkPatternStatus = (regex, required, key, value, min) => {
  if (regex && value.length === 0 && !required) {
    return response(false, "success");
  } else if (regex && value.length === 0 && required && min > 0) {
    return response(true, "Must contain at least one character");
  } else if (key === "address" || key === "apartment" || key === "landmark") {
    return response(
      value.includes("@"),
      value.includes("@") ? "Must not contain @" : verifyString(value, key)
    );
  } else if (regex && regex.test(value)) {
    return response(false, "success");
  } else if (regex && !regex.test(value)) {
    const customErrorMessages = {
      phone: "Must start with 6, 7, 8, or 9",
      alternate_phone: "success",
      gender: "Select gender",
      state: "Select a state",
      city: "Must contain A-Z / a-z characters only",
      first_name: "Must contain A-Z / a-z characters only",
      last_name: "Must contain A-Z / a-z characters only",
      email: "success",
    };

    return response(true, customErrorMessages[key] || "Invalid input");
  }
};

export const valiDateFormByCustomChecks = (formData, clicked) => {
  let error = [];
  customValidation.forEach((valid) => {
    Object.keys(formData).forEach((key) => {
      if (
        (valid.inputKey === key &&
          formData[key] &&
          formData[key].toString().length > 0) ||
        (valid.inputKey === key && clicked)
      ) {
        const value = formData[key] && formData[key].toString();
        if (value !== null) {
          const lengthStatus = checkLength(
            value,
            valid.min,
            valid.max,
            valid.required
          );
          const patternStatus = checkPatternStatus(
            valid.regex,
            valid.required,
            key,
            value,
            valid.min
          );

          error.push({
            Errorfield: key,
            errorExists:
              lengthStatus.message !== "success" ||
              patternStatus.message !== "success",
            required: valid.required,
            errorMessage: [lengthStatus.message, patternStatus.message],
          });
        }
      }
    });
  });

  const isErrorOrdered = error.every(
    (err) =>
      err.errorMessage[0] === "success" && err.errorMessage[1] === "success"
  );

  return { error: error, isErrorOrdered: isErrorOrdered };
};
