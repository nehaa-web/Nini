import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service : "gmail" ,
    auth: {
        type: 'OAuth2',
        user: process.GOOGLE_USER ,
        clientSecret : procces.env.GOOGLE_CLIENT_SECRET,
        refreshToken : process.env.GOOGLOE_REFRESH_TOKEN,
        clientId:process.env.GOOGLE_CLIENT_ID
    }
})

transporter.verify()
.then(()=> {
    console.log("Email transporter is ready to send emails")
})
.catch((err) =>{
    console.log("Email transporter verfication failed")
})


export async function sendEmail({ to , subject , html , text}) {

    const mailOptions = {
        from: process.env.GOOGLE_USER,
        to,
        subject,
        html,
        text
    }

    const details = await transporter.sendMail(mailOptions)
    console.log("Email sent:" , details)
}