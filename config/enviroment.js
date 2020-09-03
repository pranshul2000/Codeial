
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
            pass: 'pranshul'
        }
    },
    google_client_id: "960338923443-n71fpl294f9c6lp0j0kashh4jb39mr0r.apps.googleusercontent.com",
    google_client_secret: "",
    google_callback_url: "http://localhost:8000/users/auth/google/callback",
    facebook_clint_id: '332539968117863',
    facebook_clint_secret: '',
    facebook_callback_url: 'http://localhost:8000/users/auth/facebook/callback',
    jwt_secret: 'codeial'
}

const production = {
    name: 'production',
    asset_path: process.env.codeial_asset_path,
    session_cookie_key: process.env.codeial_session_cookie_key,
    db: 'codeial_production',
    smtp: {
        service: 'gamil',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user:process.env.codeial_smtp_auth_user,
            pass: process.env.codeial_smtp_auth_pass
        }
    },
    google_client_id: process.env.codeial_google_client_id,
    google_client_secret: process.env.codeial_google_client_secret,
    google_callback_url: process.env.codeial_google_callback_url,
    facebook_clint_id: process.env.codeial_facebook_clint_id,
    facebook_clint_secret: process.env.codeial_facebook_clint_secret,
    facebook_callback_url: process.env.codeial_facebook_callback_url,
    jwt_secret: process.env.codeial_jwt_secret
}

// module.exports = eval(process.env.NODE_ENV) == undefined ? develpoment: eval(process.env.NODE_ENV);

module.exports = eval(process.env.NODE_ENV)==undefined?development:eval(process.env.NODE_ENV);
// module.exports = development;