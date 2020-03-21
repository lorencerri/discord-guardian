module.exports = {
    defaultPrefix: 'g!',
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
    _limits: 'The following are defaults.',
    limits: {
        user_removals: {
            per_minute: 8,
            per_hour: 24
        },
        role_creations: {
            per_minute: 4,
            per_hour: 12
        },
        channel_creations: {
            per_minute: 4,
            per_hour: 12
        },
        role_deletions: {
            per_minute: 4,
            per_hour: 12
        },
        channel_deletions: {
            per_minute: 4,
            per_hour: 12
        }
    }
}