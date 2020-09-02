
const develpoment = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_devlopment',
    smtp: {
        service: 'gamil',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'testmailer.pg',
            pass: 'pranshul.mailer'
        }
    },
    google_client_id: "960338923443-n71fpl294f9c6lp0j0kashh4jb39mr0r.apps.googleusercontent.com",
    google_client_secret: "rDCEYEAKkSEAMvy_XhjUy6kQ",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    facebook_clint_id: '332539968117863',
    facebook_clint_secret: '614de681bbeeb681f30c8d8591cb069d',
    facebook_callback_url: 'http://localhost:8000/users/auth/facebook/callback',
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}

module.exports = develpoment;