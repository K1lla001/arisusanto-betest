module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            userName: {
                type: String,
                required: true,
            },
            accountNumber: {
                type: Number,
                required: true,
                unique: true,
            },
            emailAddress: {
                type: String,
                required: true,
            },
            identityNumber: {
                type: String,
                required: true,
                unique: true,
            },
        },
        {
            timestamps: true,
        }
    );

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("User", schema);
    return User;
};
