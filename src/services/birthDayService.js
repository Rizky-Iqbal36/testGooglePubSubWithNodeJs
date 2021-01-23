const { agetable, birthtable } = require("../../models");

exports.post = async (body) => {
  let create = [];
  try {
    if (body.subscription === "YEAR_SUB") {
      create = await birthtable.create({ birthCol: body.year });
    } else {
      create = await agetable.create({ ageCol: body.age });
    }
    return create;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
