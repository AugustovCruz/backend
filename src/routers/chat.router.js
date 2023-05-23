import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    res.render('chat', {})
    // console.log(messages)
})


export default router