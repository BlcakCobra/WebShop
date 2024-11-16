import Joi from "joi";

const sequentialNumberRegex = /(0123|1234|2345|3456|4567|5678|6789|7890|9876|8765|7654|6543|5432|4321|3210)/;
const sequentialLetterRegex = /(abcd|bcde|cdef|defg|efgh|fghi|ghij|hijk|ijkl|jklm|klmn|lmno|mnop|nopq|opqr|pqrs|qrst|rstu|stuv|tuvw|uvwx|vwxy|wxyz|zyxw|yxwv|xwvu|wvut|vuts|utsr|tsrq|srqp|rqpo|qpon|ponm|onml|nmlk|mlkj|lkji|kjih|jihg|ihgf|hgfe|gfed|fedc|edcb)/i;

export const userRegisterationSchema = Joi.object({
    username:Joi.string()
    .min(3)
    .max(20)
    .pattern(/^[a-zA-Z0-9_-]+$/)
    .required(),
    password:Joi.string()
    .min(8)
    .max(36)
    .pattern(/^[a-zA-Z0-9_-]+$/)
    .required()
    .custom((value, helpers) => {
        if (sequentialNumberRegex.test(value) || sequentialLetterRegex.test(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }),
    confirmPassword: Joi.ref('password')
})
