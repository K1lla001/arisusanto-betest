module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
            },
            password: {
                type: String,
                required: true,
            },
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Admin = mongoose.model("Admin", schema);
    return Admin;
};
