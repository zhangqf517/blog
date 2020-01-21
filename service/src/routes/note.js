import Router from 'koa-router'
import noteController from '../controllers/noteController'

const router = new Router({
	prefix: '/note'
})

router.get('/getNoteList', async (ctx) => {
  try {
    let results = await noteController.getNotes(ctx.query)
    ctx.body = results
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
}),
router.get('/getNoteByPath', async (ctx) => {
  try {
    let result = await noteController.getNoteByPath(ctx.query)
    ctx.body = result
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
}),
router.get('/uploadNote', async (ctx) => {
  try {
    let result = await noteController.uploadNoteByPath(ctx.query)
    ctx.body = result
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
}),
router.get('/loadNoteType', async (ctx) => {
  try {
    let result = await noteController.loadNoteType(ctx.query)
    ctx.body = result
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
}),
router.get('/getNoteListByType', async (ctx) => {
  try {
    let result = await noteController.getNoteListByType(ctx.query)
    ctx.body = result
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
}),
router.get('/updataNote', async (ctx) => {
  try {
    let result = await noteController.updataNote(ctx.query)
    ctx.body = result
  } catch (error) {
    ctx.status = 406
		ctx.body = e.toString()
  }
})

module.exports = router