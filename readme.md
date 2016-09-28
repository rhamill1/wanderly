# Production Setup
## Node Setup
- npm init -y
- npm install --save express
- touch .gitignore
- npm install --save mongoose
- npm install --save body-parser

## MongoDB Setup
- brew install mongodb
- mongod

#Project Roadmap
    ##Planning
    - idea development
    - user stories
        - user can
    - wireframe
    - model design
        - exeriences
            {
            title: string,
            date: date,
            coordinates: [lat, long],
            image: string,
            author: string,
            note: text,
            bucketList: boolean
            }

#Phase 1 MVP
###basic functionality to support user stories
- only includes experience model

#Phase 2
###style to support responsive mobile and appearance

#Phase 3
###adds user model
    {
        name: string,
        img: string,
        stories: [experience._id]
    }
