import Router from 'koa-router'
import noteController from '../controllers/noteController'

const router = new Router({
	prefix: '/note'
})

router.get('/noteList', async (ctx) => {
  try {
    let results = await noteController.getNotes(ctx.query)
    ctx.body = results
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
})

module.exports = router