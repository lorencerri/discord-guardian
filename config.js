module.exports = {
    prefix: 'g!',
    ownerID: '144645791145918464',
    database: {
        name: 'guardian',
        username: 'postgres',
        options: {
            host: 'localhost',
            dialect: 'postgres',
            logging: false,
            port: 5433
        }
    },
    defaults: {
        limits: {
            user_removals: {
                minute: 8,
                hour: 24
            },
            role_creations: {
                minute: 4,
                hour: 12
            },
            channel_creations: {
                minute: 4,
                hour: 12
            },
            role_deletions: {
                minute: 4,
                hour: 12
            },
            channel_deletions: {
                minute: 4,
                hour: 12
            }
        }
    }
}