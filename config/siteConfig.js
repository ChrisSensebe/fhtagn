/**
 * Created by csensebe on 20/12/2015.
 */
var siteConfig = {
    site : {
        siteTitle : 'Fhtagn',
        menuTitles : ['home', 'tags', 'archives', 'about'],
        linkToAdminTitle : 'Admin',
        footerText : 'Fhtagn',
        homePage : {
            pageTitle : 'home',
            pageContent : {
                createdText : 'created : ',
                authorText  : 'by : ',
                tagsText    : 'tags : '
            }
        },
        postPage : {
            pageContent : {
                createdText : 'created : ',
                authorText  : 'by : '
            }

        },
        tagsPage : {
            pageTitle : 'Tags'
        },
        archivesPage : {
            pageTitle : 'Archives'
        },
        aboutPage : {
            pageTitle : 'About'
        },
        loginPage : {
            pageTitle : 'Login'
        }
    },
    admin : {
        siteTitle : 'Fhtagn | admin',
        menuTitles : [],
        linkToSiteTitle : 'Go to site',
        homePage : {
            pageTitle : 'Posts'
        },
        newPostPage : {
            pageTitle : 'New Post'
        },
        postPage : {
            pageTilte : ''
        },
        usersPage : {},
        newUserPage : {
            pageTitle : 'New user'
        },
        userPage : {},
        filesPage : {
            pageTilte : 'Files'
        },
        themePage : {
            pageTitle : 'Site config'
        }
    }
}

module.exports = siteConfig;