const db = require('../models');
const {getFromCache, setToCacheWithExpiry, removeFromCache, resetAllCache} = require("../middleware/redis.middleware");
const {commonResponse} = require("../response/commonResponse");
const User = db.users;


exports.findAll = async (req, res) => {
    try {
        const temporaryData = await getFromCache('users');
        if (temporaryData) {
            return commonResponse(res, 200, "Successfully get all data", JSON.parse(temporaryData));
        } else {
            const dataUser = await User.find();
            if (dataUser.length === 0) return commonResponse(res, 200, "Nothing to show, please add data", []);;

            await setToCacheWithExpiry('users', dataUser, 3600);
           return commonResponse(res, 200, "Successfully get all data", dataUser)
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: `Error while retrieving data ${err.message}`
        });
    }
};

exports.create = async (req, res) =>    {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;

    if (!userName || !accountNumber || !emailAddress || !identityNumber){
        return commonResponse(res, 400, "All Fields Required", null)
    }

    try {
        const existingUser = await User.findOne({
            $or: [
                { accountNumber: accountNumber },
                { identityNumber: identityNumber },
            ],
        });

        if (existingUser) {
            return commonResponse(res, 409, "AccountNumber or Identity Number is already in use.", null)
        }

        const user = new User({
            userName,
            accountNumber,
            emailAddress,
            identityNumber,
        });

        const savedUser = await user.save();

        await removeFromCache("users");

        return commonResponse(res, 201, "Successfully created user", savedUser)
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: `Error while creating a user ${err.message}`,
        });
    }
};

exports.findByAccountNumber = async (req, res) => {
    const userAccountNumber = req.params.accountNumber;

    try {
        const savedData = await getFromCache("user_account");
        if (savedData && JSON.parse(savedData).accountNumber == userAccountNumber) {
            return commonResponse(res, 200, "Successfully get data", JSON.parse(savedData))
        } else {
            const result = await User.findOne({accountNumber: userAccountNumber});
            if (!result) {
                return commonResponse(res, 404, `User with account number ${userAccountNumber} not found!`, null)
            }
            await setToCacheWithExpiry("user_account", result, 3600);
           return commonResponse(res, 200, "Successfully get data", result)
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: `Error while retrieving data ${err.message}`,
        });
    }
};

exports.findByIdentityNumber = async (req, res) => {
    const userIdentityNumber = req.params.identityNumber;

    try {
        const savedData = await getFromCache("user_identity");
        if (savedData && JSON.parse(savedData).identityNumber === userIdentityNumber) {
            return commonResponse(res, 200, "Successfully get data", JSON.parse(savedData))
        } else {
            const result = await User.findOne({identityNumber: userIdentityNumber});
            if (!result) {
                return commonResponse(res, 404, `User with identity number ${userIdentityNumber} not found!`, null)
            }
            await removeFromCache("user_identity")
            await setToCacheWithExpiry("user_identity", result, 3600);
            return commonResponse(res, 200, "Successfully get data", result)
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: `Error while retrieving data ${err.message}`,
        });
    }
};

exports.update = async (req, res) => {
    const idUser = req.body.id;

    if (!idUser) {
        return commonResponse(res, 400, "Id is required", null)
    }

    try {
        const updatedData = await User.findByIdAndUpdate(idUser, req.body, {new: true});
        if (!updatedData) {
            return commonResponse(res, 404, `User with ID ${idUser} not found!`, null)
        }

        await resetAllCache(['users', 'user_account', 'user_identity'])
        return commonResponse(res, 200, "Successfully update data", updatedData)
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: `Error while updating user ${err}`,
        });
    }
};

exports.deleteById = async (req, res) => {
    const idUser = req.params.id;

    if (!idUser) {
        return commonResponse(res, 400, "Id is required", null)
    }

    try {
        const deletedData = await User.findByIdAndDelete(idUser);
        if (!deletedData) {
           return commonResponse(res, 404, `User with ID ${idUser} not found!`, null)
        }

        await resetAllCache(['users', 'user_account', 'user_identity'])

        return commonResponse(res, 200, "Successfully delete data", null)
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error while deleting user",
        });
    }
};